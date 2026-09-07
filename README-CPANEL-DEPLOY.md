# 🚀 Guía de Despliegue Continuo (CI/CD): GitHub ➔ cPanel

Esta guía te explica cómo tener tu sitio web de **Ventas Reitz** conectado a GitHub y desplegado en tu cPanel de forma 100% automática cada vez que hagas `git push`.

---

## 🌟 Opción 1: Despliegue con Webhook de GitHub (Recomendado para cambios instantáneos)

### Paso 1: Subir tu proyecto a GitHub
1. Crea un repositorio en GitHub (ej: `ventas-reitz`).
2. En tu terminal local:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ventas Reitz"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Subir `deploy.php` a tu cPanel
1. Entra a tu cPanel > **Administrador de Archivos** > `public_html/`.
2. Sube el archivo `deploy.php` incluido en este proyecto.
3. Edita la constante `SECRET_KEY` dentro de `deploy.php` con una clave secreta segura (ej: `mi_secreto_super_seguro_2026`).

### Paso 3: Configurar el Webhook en GitHub
1. En tu repositorio de GitHub, ve a **Settings** > **Webhooks** > **Add webhook**.
2. **Payload URL**: `https://tudominio.com/deploy.php`
3. **Content type**: `application/json`
4. **Secret**: La misma clave que pusiste en `deploy.php`.
5. **Which events**: "Just the push event".
6. Guarda el webhook. ¡GitHub enviará un ping de prueba de inmediato!

---

## ⚡ Opción 2: GitHub Actions (Compilación automática con Vite)

Ideal si tu hosting no tiene Node.js o prefieres que GitHub compile todo y suba solo los archivos listos:

1. Ve a tu repositorio en GitHub > **Settings** > **Secrets and variables** > **Actions**.
2. Crea 3 secretos:
   - `CPANEL_FTP_SERVER`: Tu host FTP de cPanel (ej. `ftp.tudominio.com` o la IP de tu hosting).
   - `CPANEL_FTP_USERNAME`: Tu usuario FTP de cPanel (ej. `usuario@tudominio.com`).
   - `CPANEL_FTP_PASSWORD`: Tu contraseña de la cuenta FTP.
3. El archivo `.github/workflows/cpanel-deploy.yml` ya está configurado. Cada vez que hagas `git push origin main`, GitHub compilará el proyecto y subirá los archivos automáticamente a `public_html/`.

---

## 🛠️ Opción 3: cPanel Git™ Version Control

1. Entra a cPanel > **Git™ Version Control**.
2. Haz clic en **Create**.
3. Pega la URL de tu repositorio de GitHub (o genera una clave SSH en cPanel y agrégala a tus Deploy Keys en GitHub).
4. El archivo `.cpanel.yml` en la raíz del proyecto copiará automáticamente los archivos a tu carpeta web pública al desplegar.
