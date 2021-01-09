<?php
// Kinda slow at reading files.

// Retrieve complete url
$url = full_url($_SERVER);

// Pick apart url
$parts =  [
    'scheme' => $scheme,
    'host' => $host,
    'path' => $path
] = parse_url($url);

// Split query
parse_str(parse_url($url, PHP_URL_QUERY), $output);
$parts['query'] = $output;
$parts['fragment'] = parse_url($url, PHP_URL_FRAGMENT);

if (preg_match("/^(\/)?home|^\/$/i", $path)) {
    (@include_once('home.html')) or die("oops, nothing found");
} else if (preg_match("/^(\/)?contact/i", $path)) {
    (@include_once('contact.html')) or die("oops, nothing found");
} else if (file_exists(Path::combine(__DIR__, $path))) {
    $file_path = Path::combine(__DIR__, $path);
    // Different files
    $content_type = "text/html";
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    if($ext === "css"){
        $content_type = 'text/css';
    }
    if($ext === "js"){
        $content_type = 'application/javascript';
    }
    if($ext === "png"){
        $content_type = 'image/png';
    }
    header("Accept-Ranges: bytes");
    header('Content-Length: ' . filesize($file_path));
    header("Content-type: $content_type");
    readfile($file_path);
} 
else {
    // 404 response
    header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found", true, 404);
    echo "404 - Not found";
}

function full_url($s, $use_forwarded_host = false)
{
    return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
}

function url_origin($s, $use_forwarded_host = false)
{
    $ssl      = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on');
    $sp       = strtolower($s['SERVER_PROTOCOL']);
    $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
    $port     = $s['SERVER_PORT'];
    $port     = ((!$ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
    $host     = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST'])) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
    $host     = isset($host) ? $host : $s['SERVER_NAME'] . $port;
    return $protocol . '://' . $host;
}

class Path
{
    public static function combine (): string
    {
        $paths = func_get_args();
        $paths = array_map(function($path){
            return str_replace(["\\", "/"], DIRECTORY_SEPARATOR, $path);
        }, $paths);
        $paths = array_map(function($path){
            return self::trimPath($path);
        }, $paths);
        return implode(DIRECTORY_SEPARATOR, $paths);
    }

    private static function trimPath(string $path): string
    {
        $path = trim($path);
        $start = $path[0] === DIRECTORY_SEPARATOR ? 1 : 0;
        $end = $path[strlen($path) - 1] === DIRECTORY_SEPARATOR ? -1 : strlen($path);
        return substr($path, $start, $end);
    }
}

