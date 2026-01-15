/* ============================================
   SCRIPT PRINCIPAL - ESP32 SMART HOME
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Ocultar loader rápidamente
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        }
    }, 800);
    
    // Cargar contenido
    loadFeatures();
    loadSpecifications();
    loadTelegramDemo();
    
    // Inicializar componentes
    initNavbar();
    initChatbot();
    initSmoothScroll();
    
});

/* ========================================
   CARGAR FUNCIONES DEL SISTEMA
   ======================================== */
function loadFeatures() {
    const featuresGrid = document.getElementById('features-grid');
    if (!featuresGrid || !window.CONFIG) return;
    
    featuresGrid.innerHTML = '';
    
    CONFIG.features.forEach((feature, index) => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.style.animationDelay = `${index * 0.1}s`;
        
        featureCard.innerHTML = `
            <div class="feature-icon" style="background: linear-gradient(135deg, ${feature.color}, ${feature.color}cc);">
                <i class="${feature.icon}"></i>
            </div>
            <h3 class="feature-name">${feature.name}</h3>
            <p class="feature-description">${feature.description}</p>
            <span class="feature-tech">
                <i class="fas fa-microchip"></i>
                ${feature.tech}
            </span>
        `;
        
        featuresGrid.appendChild(featureCard);
    });
}

/* ========================================
   CARGAR ESPECIFICACIONES TÉCNICAS
   ======================================== */
function loadSpecifications() {
    if (!window.CONFIG) return;
    
    const specs = CONFIG.specifications;
    
    const mcuList = document.getElementById('specs-mcu');
    if (mcuList && specs.microcontroller) {
        mcuList.innerHTML = specs.microcontroller.map(item => `<li>${item}</li>`).join('');
    }
    
    const sensorsList = document.getElementById('specs-sensors');
    if (sensorsList && specs.sensors) {
        sensorsList.innerHTML = specs.sensors.map(item => `<li>${item}</li>`).join('');
    }
    
    const commList = document.getElementById('specs-comm');
    if (commList && specs.communication) {
        commList.innerHTML = specs.communication.map(item => `<li>${item}</li>`).join('');
    }
    
    const uiList = document.getElementById('specs-ui');
    if (uiList && specs.userInterface) {
        uiList.innerHTML = specs.userInterface.map(item => `<li>${item}</li>`).join('');
    }
}

/* ========================================
   CARGAR DEMO DE TELEGRAM
   ======================================== */
function loadTelegramDemo() {
    const messagesContainer = document.getElementById('telegram-messages');
    if (!messagesContainer || !window.CONFIG) return;
    
    messagesContainer.innerHTML = '';
    
    CONFIG.telegramDemo.forEach((msg, index) => {
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `telegram-message ${msg.type}`;
            messageDiv.textContent = msg.text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, index * 1500);
    });
    
    // Reiniciar demo cada 10 segundos
    setInterval(loadTelegramDemo, 12000);
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Efecto scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menu toggle móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const icon = this.querySelector('i');
            icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
    
    // Cerrar menú al hacer clic en link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
    
    // Marcar sección activa
    const sections = document.querySelectorAll('section[id]');
    const navLinksElements = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   CHATBOT
   ======================================== */
function initChatbot() {
    if (!window.CONFIG) return;
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotOptions = document.getElementById('chatbot-options');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    
    // Mensaje de bienvenida
    addBotMessage(CONFIG.chatbot.welcomeMessage);
    
    // Cargar opciones
    loadChatbotOptions();
    
    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('hidden');
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.add('hidden');
        });
    }
    
    // Enviar mensaje
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function loadChatbotOptions() {
        if (!chatbotOptions) return;
        chatbotOptions.innerHTML = '';
        
        CONFIG.chatbot.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.addEventListener('click', function() {
                addUserMessage(option.text);
                setTimeout(() => {
                    addBotMessage(option.response);
                }, 500);
            });
            chatbotOptions.appendChild(button);
        });
    }
    
    function sendChatMessage() {
        if (!chatbotInput) return;
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        addUserMessage(message);
        chatbotInput.value = '';
        
        setTimeout(() => {
            const foundOption = CONFIG.chatbot.options.find(opt => {
                return message.toLowerCase().includes(opt.text.toLowerCase().slice(0, 5));
            });
            
            const response = foundOption ? foundOption.response : CONFIG.chatbot.defaultResponse;
            addBotMessage(response);
        }, 800);
    }
    
    function addBotMessage(text) {
        if (!chatbotMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addUserMessage(text) {
        if (!chatbotMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

console.log('%c🤖 ESP32 Smart Home', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Sistema cargado correctamente', 'color: #7c3aed; font-size: 14px;');
