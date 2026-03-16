# Despliegue a SiteGround vía SSH

## Requisitos Previos

1. Acceso SSH a tu cuenta de SiteGround
2. Clave SSH generada en tu máquina local

## Configuración

1. Genera una clave SSH si no tienes una:
   ```bash
   ssh-keygen -t rsa -b 4096
   ```

2. Agrega tu clave pública a SiteGround:
   - Copia el contenido de `~/.ssh/id_rsa.pub`
   - Pégalo en el panel de control de SiteGround > SSH Keys Manager

3. Configura el archivo `.ssh/config`:
   - Actualiza el hostname y usuario con tus credenciales de SiteGround

4. Actualiza el script `deploy.sh`:
   - Modifica REMOTE_USER con tu usuario de SiteGround
   - Modifica REMOTE_HOST con tu dominio
   - Ajusta REMOTE_PATH según tu estructura de directorios

## Despliegue

1. Da permisos de ejecución al script:
   ```bash
   chmod +x deploy.sh
   ```

2. Ejecuta el script de despliegue:
   ```bash
   ./deploy.sh
   ```

## Notas

- El script sincronizará todos los archivos de la carpeta HTML/
- Establecerá automáticamente los permisos correctos
- Usa rsync para transferencia eficiente