#!/bin/bash

# Configuración
REMOTE_USER="u20-ig2edcvryfs6"
REMOTE_HOST="c1113380.sgvps.net"
REMOTE_PATH="/public_html"
LOCAL_PATH="./HTML"

# Sincronizar archivos
rsync -avz --delete \
  -e "ssh -p 22" \
  "$LOCAL_PATH/" \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Establecer permisos
ssh -p 22 "$REMOTE_USER@$REMOTE_HOST" \
  "find $REMOTE_PATH -type f -exec chmod 644 {} \; && \
   find $REMOTE_PATH -type d -exec chmod 755 {} \;"