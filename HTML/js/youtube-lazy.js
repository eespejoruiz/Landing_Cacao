// Función para obtener el ID del video de YouTube desde la URL
function getYouTubeVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Función para crear la vista previa del video
function createVideoPreview(iframe) {
  const videoUrl = iframe.src;
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return;

  // Crear el contenedor de vista previa
  const previewContainer = document.createElement('div');
  previewContainer.className = 'youtube-preview';
  previewContainer.style.cssText = iframe.style.cssText;

  // Agregar la imagen en miniatura
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  previewContainer.style.backgroundImage = `url(${thumbnailUrl})`;
  previewContainer.style.backgroundSize = 'cover';
  previewContainer.style.backgroundPosition = 'center';
  previewContainer.style.cursor = 'pointer';

  // Agregar el botón de reproducción
  const playButton = document.createElement('div');
  playButton.className = 'youtube-play-button';
  playButton.innerHTML = `
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path class="youtube-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
  `;
  previewContainer.appendChild(playButton);

  // Agregar evento de clic para cargar el video
  previewContainer.addEventListener('click', function() {
    iframe.src = videoUrl;
    previewContainer.parentNode.replaceChild(iframe, previewContainer);
  });

  // Reemplazar el iframe con la vista previa
  iframe.parentNode.replaceChild(previewContainer, iframe);
}

// Inicializar la carga diferida para todos los videos de YouTube
function initYoutubeLazyLoad() {
  const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
  youtubeIframes.forEach(createVideoPreview);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initYoutubeLazyLoad);