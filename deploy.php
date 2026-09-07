<?php
/**
 * Script de Despliegue Automático para cPanel vía GitHub Webhook
 * Proyecto: Ventas Reitz - Inmobiliaria
 *
 * Instrucciones:
 * 1. Sube este archivo a tu directorio web en cPanel (ej. public_html/deploy.php)
 * 2. Cambia 'TU_SECRETO_SEGURO_AQUI' por una clave secreta fuerte.
 * 3. En tu repositorio GitHub ve a Settings > Webhooks > Add webhook:
 *    - Payload URL: https://tudominio.com/deploy.php
 *    - Content type: application/json
 *    - Secret: La misma clave que colocaste aquí
 *    - Events: Just the push event
 *    - Active: Checked
 */

// 1. Configuración
define('SECRET_KEY', 'reitz_deploy_secret_2026_x89q'); // <-- Cambia esto por tu secreto
define('REPO_DIR', dirname(__DIR__)); // O el directorio donde clonaste tu repo
define('BRANCH', 'refs/heads/main');
define('LOG_FILE', __DIR__ . '/deploy.log');

// 2. Encabezados de respuesta
header('Content-Type: application/json; charset=utf-8');

function log_message($msg) {
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents(LOG_FILE, "[$timestamp] $msg\n", FILE_APPEND);
}

// 3. Obtener payload y firma
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if (empty($payload)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No payload received']);
    exit;
}

// 4. Validar firma HMAC SHA256 si hay clave configurada
if (SECRET_KEY !== 'TU_SECRETO_SEGURO_AQUI') {
    if (empty($signature)) {
        http_response_code(403);
        log_message('Error: Falta el encabezado X-Hub-Signature-256');
        echo json_encode(['status' => 'error', 'message' => 'Missing signature']);
        exit;
    }

    $hash = 'sha256=' . hash_hmac('sha256', $payload, SECRET_KEY);
    if (!hash_equals($hash, $signature)) {
        http_response_code(403);
        log_message('Error: Firma HMAC inválida');
        echo json_encode(['status' => 'error', 'message' => 'Invalid signature']);
        exit;
    }
}

// 5. Decodificar evento
$data = json_decode($payload, true);

// Manejar ping de GitHub
if (isset($_SERVER['HTTP_X_GITHUB_EVENT']) && $_SERVER['HTTP_X_GITHUB_EVENT'] === 'ping') {
    log_message('GitHub Ping recibido con éxito');
    echo json_encode(['status' => 'success', 'message' => 'Pong! Webhook configurado correctamente']);
    exit;
}

// Verificar que sea el branch correcto
if (isset($data['ref']) && $data['ref'] !== BRANCH) {
    log_message("Push ignorado para la rama: " . $data['ref']);
    echo json_encode(['status' => 'ignored', 'message' => 'Rama no monitoreada']);
    exit;
}

// 6. Ejecutar despliegue
log_message("Iniciando despliegue de commit: " . ($data['after'] ?? 'unknown'));

$commands = [
    'echo "=== Despliegue Iniciado ==="',
    'cd ' . escapeshellarg(__DIR__),
    'git status 2>&1',
    'git reset --hard HEAD 2>&1',
    'git pull origin main 2>&1',
    // Si tienes node en cPanel y necesitas compilar:
    // 'npm install --production=false 2>&1',
    // 'npm run build 2>&1',
    // 'cp -r dist/* . 2>&1',
    'echo "=== Despliegue Completado ==="'
];

$output = [];
foreach ($commands as $cmd) {
    $out = shell_exec($cmd);
    $output[] = $out;
    log_message("CMD: $cmd -> " . trim($out ?? ''));
}

echo json_encode([
    'status' => 'success',
    'message' => 'Despliegue ejecutado exitosamente',
    'commit' => $data['after'] ?? null,
    'sender' => $data['sender']['login'] ?? 'desconocido',
    'output' => $output
]);
