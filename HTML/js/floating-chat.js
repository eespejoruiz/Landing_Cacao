// Floating Chat Functionality
class FloatingChat {
  constructor() {
    this.isOpen = false;
    this.showQRModal = false;
    this.init();
  }

  init() {
    this.createChatWidget();
    this.bindEvents();
  }

  createChatWidget() {
    const chatOptions = [
      {
        name: 'WeChat',
        icon: 'fab fa-weixin',
        qrCode: '/img/wechat-qr.webp',
        color: '#07C160'
      },
      {
        name: 'Line',
        icon: 'fab fa-line',
        qrCode: '/img/line-qr.webp',
        color: '#00B900'
      },
      {
        name: 'Kakao Talk',
        icon: 'fas fa-comment',
        link: '#',
        color: '#FFE812'
      },
      {
        name: 'Telegram',
        icon: 'fab fa-telegram-plane',
        link: 'https://t.me/+51957204148',
        color: '#0088cc'
      },
      {
        name: 'WhatsApp',
        icon: 'fab fa-whatsapp',
        link: 'https://api.whatsapp.com/send/?phone=51988955158',
        color: '#25D366'
      }
    ];

    // Create main container
    const container = document.createElement('div');
    container.className = 'floating-chat-container';
    container.innerHTML = `
      <!-- QR Modal -->
      <div class="qr-modal" id="qrModal">
        <div class="qr-modal-content">
          <button class="close-button" id="closeQRModal">
            <i class="fas fa-times"></i>
          </button>
          <h3 id="qrTitle">扫描微信二维码</h3>
          <div class="qr-image-container">
            <img src="/img/wechat-qr.webp" alt="WeChat QR Code" class="qr-image" id="qrImage" />
          </div>
          <p id="qrDescription">打开微信，扫描此码即可连接</p>
        </div>
      </div>
      
      <!-- Chat Button -->
      <button class="chat-button" id="chatButton">
        <i class="fas fa-comments chat-icon"></i>
      </button>
      
      <!-- Chat Options -->
      <div class="chat-options" id="chatOptions">
        ${chatOptions.map((option, index) => `
          <button 
            class="chat-option" 
            data-index="${index}"
            style="background-color: ${option.color}"
            ${option.qrCode ? 'data-qr="true"' : `data-link="${option.link}"`}
          >
            <i class="${option.icon} option-icon"></i>
            <span class="option-name">${option.name}</span>
          </button>
        `).join('')}
      </div>
    `;

    document.body.appendChild(container);
    
    // Store references
    this.container = container;
    this.chatButton = container.querySelector('#chatButton');
    this.chatOptions = container.querySelector('#chatOptions');
    this.qrModal = container.querySelector('#qrModal');
    this.closeQRButton = container.querySelector('#closeQRModal');
    this.qrImage = container.querySelector('#qrImage');
    this.qrTitle = container.querySelector('#qrTitle');
    this.qrDescription = container.querySelector('#qrDescription');
    this.optionButtons = container.querySelectorAll('.chat-option');
    this.chatOptionsData = chatOptions;
  }

  bindEvents() {
    // Chat button click
    this.chatButton.addEventListener('click', () => {
      this.toggleChat();
    });

    // Option buttons click
    this.optionButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        if (button.dataset.qr === 'true') {
          this.showQRCode(this.chatOptionsData[index]);
        } else {
          const link = button.dataset.link;
          if (link && link !== '#') {
            window.open(link, '_blank');
          }
        }
      });
    });

    // Close QR modal
    this.closeQRButton.addEventListener('click', () => {
      this.hideQRCode();
    });

    // Close QR modal by clicking outside
    this.qrModal.addEventListener('click', (e) => {
      if (e.target === this.qrModal) {
        this.hideQRCode();
      }
    });

    // Prevent modal content click from closing modal
    this.qrModal.querySelector('.qr-modal-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.chatButton.classList.add('active');
      this.chatOptions.classList.add('show');
    } else {
      this.chatButton.classList.remove('active');
      this.chatOptions.classList.remove('show');
    }
  }

  showQRCode(option) {
    this.showQRModal = true;
    
    // Update modal content based on the option
    if (option.name === 'WeChat') {
      this.qrImage.src = '/img/wechat-qr.webp';
      this.qrImage.alt = 'WeChat QR Code';
      this.qrTitle.textContent = '扫描微信二维码';
      this.qrDescription.textContent = '打开微信，扫描此码即可连接';
    } else if (option.name === 'Line') {
      this.qrImage.src = '/img/line-qr.webp';
      this.qrImage.alt = 'Line QR Code';
      this.qrTitle.textContent = 'Scan Line QR Code';
      this.qrDescription.textContent = 'Open Line app and scan this code to connect';
    }
    
    this.qrModal.classList.add('show');
  }

  hideQRCode() {
    this.showQRModal = false;
    this.qrModal.classList.remove('show');
  }
}

// Initialize floating chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FloatingChat();
});