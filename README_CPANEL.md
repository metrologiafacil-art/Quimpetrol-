# Instrucciones de Despliegue en cPanel

Este proyecto es una aplicación React construida con Vite. Para ejecutarla en una página web subida desde cPanel, sigue estos pasos:

## 1. Requisitos Previos

Necesitarás:
- Acceso a cPanel.
- Una clave de API de Google Gemini (para las funcionalidades de IA).

## 2. Preparar el Proyecto (Build)

Si tienes acceso al código fuente en tu máquina local:

1.  Abre una terminal en la carpeta del proyecto.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de API:
    ```
    GEMINI_API_KEY=tu_clave_api_aqui
    ```
    *(Nota: Sin esta clave, las funciones de IA no funcionarán).*
4.  Construye el proyecto:
    ```bash
    npm run build
    ```
5.  Esto generará una carpeta llamada `dist`. El contenido de esta carpeta es lo que subirás a cPanel.

## 3. Subir a cPanel

1.  Inicia sesión en tu cuenta de cPanel.
2.  Ve al **Administrador de Archivos**.
3.  Navega a la carpeta `public_html` (o la subcarpeta donde quieras alojar la web).
4.  Sube **todo el contenido** de la carpeta `dist` que generaste en el paso anterior.
    - Asegúrate de subir `index.html` y la carpeta `assets`.
5.  ¡Listo! Tu aplicación debería estar visible en tu dominio.

## Notas Adicionales

- **Rutas:** Esta aplicación está configurada para funcionar como una "Single Page Application" (SPA). Si en el futuro agregas navegación con `react-router`, necesitarás configurar un archivo `.htaccess` para redirigir todas las solicitudes a `index.html`. Por ahora, tal como está, no es necesario.
- **Variables de Entorno:** Las claves de API en aplicaciones React estáticas se empaquetan en el código JavaScript. Asegúrate de restringir tu clave de API en la consola de Google Cloud para que solo funcione desde tu dominio web, por seguridad.
