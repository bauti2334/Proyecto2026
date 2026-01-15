/* ============================================
   SCRIPT PRINCIPAL - ESP32 SMART HOME
   ============================================
   
   Este archivo gestiona toda la interactividad
   del sitio web. Lee datos desde config.js
   
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       INICIALIZACIÓN
       ======================================== */
    initializeWebsite();
    
    
    /* ========================================
       FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
       ======================================== */
    function initializeWebsite() {
        // Ocultar loader
        setTimeout(hideLoader, CONFIG.settings.loaderDuration);
        
        // Cargar contenido dinámico
        loadDynamicContent();
        
        // Configurar eventos
        setupEventListeners();
        
        // Inicializar componentes
        initNavbar();
        initChatbot();
        initThemeToggle();
        initSmoothScroll();
        initScrollAnimations();
        initTelegramDemo();
    }
    
    
    /* ========================================
       LOADER
       ======================================== */
    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
    
    
    /* ========================================
       CARGAR CONTENIDO DINÁMICO
       ======================================== */
    function loadDynamicContent() {
        // Cargar nombre del proyecto
        const projectNameElements = [
            'project-name',
            'footer-project-name',
            'footer-copyright'
        ];
        
        projectNameElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = CONFIG.projectName;
            }
        });
        
        // Cargar funciones/features
        loadFeatures();
        
        // Cargar especificaciones técnicas
        loadSpecifications();
        
        // Cargar mensajes demo de Telegram
        loadTelegramMessages();
    }
    
    
    /* ========================================
       CARGAR FUNCIONES DEL SISTEMA
       ======================================== */
    function loadFeatures() {
        const featuresGrid = document.getElementById('features-grid');
        if (!featuresGrid) return;
        
        featuresGrid.innerHTML = '';
        
        CONFIG.features.forEach((feature, index) => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.style.animationDelay = `${index * 0.1}s`;
            
            featureCard.innerHTML = `
                <div class="feature-icon" style="background: linear-gradient(135deg, ${feature.color}, ${adjustColor(feature.color, -20)});">
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
        const specs = CONFIG.specifications;
        
        // Microcontrolador
        const mcuList = document.getElementById('specs-mcu');
        if (mcuList && specs.microcontroller) {
            mcuList.innerHTML = specs.microcontroller
                .map(item => `<li>${item}</li>`)
                .join('');
        }
        
        // Sensores
        const sensorsList = document.getElementById('specs-sensors');
        if (sensorsList && specs.sensors) {
            sensorsList.innerHTML = specs.sensors
                .map(item => `<li>${item}</li>`)
                .join('');
        }
        
        // Comunicación
        const commList = document.getElementById('specs-comm');
        if (commList && specs.communication) {
            commList.innerHTML = specs.communication
                .map(item => `<li>${item}</li>`)
                .join('');
        }
        
        // Interfaz de Usuario
        const uiList = document.getElementById('specs-ui');
        if (uiList && specs.userInterface) {
            uiList.innerHTML = specs.userInterface
                .map(item => `<li>${item}</li>`)
                .join('');
        }
    }
    
    
    /* ========================================
       CARGAR MENSAJES DE TELEGRAM (DEMO)
       ======================================== */
    function loadTelegramMessages() {
        const messagesContainer = document.getElementById('telegram-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        CONFIG.telegramDemo.forEach((msg, index) => {
            setTimeout(() => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `telegram-message ${msg.type}`;
                messageDiv.textContent = msg.text;
                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, index * 1000);
        });
    }
    
    
    /* ========================================
       INICIALIZAR DEMO DE TELEGRAM
       ======================================== */
    function initTelegramDemo() {
        // Reiniciar demo cada 10 segundos
        setInterval(() => {
            loadTelegramMessages();
        }, 10000);
    }
    
    
    /* ========================================
       CONFIGURAR EVENT LISTENERS
       ======================================== */
    function setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('open');
                const icon = this.querySelector('i');
                icon.className = navLinks.classList.contains('open') 
                    ? 'fas fa-times' 
                    : 'fas fa-bars';
            });
        }
        
        // Cerrar menú al hacer clic en un link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }
    
    
    /* ========================================
       NAVBAR - Efecto al hacer scroll
       ======================================== */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Marcar sección activa
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
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
        if (!CONFIG.settings.enableChatbot) return;
        
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('chatbot-container');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotMessages = document.getElementById('chatbot-messages');
        const chatbotOptions = document.getElementById('chatbot-options');
        const chatbotInput = document.getElementById('chatbot-input-field');
        const chatbotSend = document.getElementById('chatbot-send');
        
        // Cargar mensaje de bienvenida
        addBotMessage(CONFIG.chatbot.welcomeMessage);
        
        // Cargar opciones predefinidas
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
                    handleOptionClick(option);
                });
                chatbotOptions.appendChild(button);
            });
        }
        
        function handleOptionClick(option) {
            addUserMessage(option.text);
            setTimeout(() => {
                addBotMessage(option.response);
            }, 500);
        }
        
        function sendChatMessage() {
            if (!chatbotInput) return;
            const message = chatbotInput.value.trim();
            if (message === '') return;
            
            addUserMessage(message);
            chatbotInput.value = '';
            
            // Buscar respuesta automática
            setTimeout(() => {
                const foundOption = CONFIG.chatbot.options.find(opt => {
                    const cleanText = opt.text.toLowerCase().replace(/[^\w\s]/gi, '');
                    const cleanMessage = message.toLowerCase().replace(/[^\w\s]/gi, '');
                    return cleanMessage.includes(cleanText) || cleanText.includes(cleanMessage);
                });
                
                const response = foundOption 
                    ? foundOption.response 
                    : CONFIG.chatbot.defaultResponse;
                
                addBotMessage(response);
            }, 1000);
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
       THEME TOGGLE - Modo oscuro
       ======================================== */
    function initThemeToggle() {
        if (!CONFIG.settings.enableDarkMode) return;
        
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        // El sitio ya está en modo oscuro por defecto
        // Este toggle permite cambiar a modo claro
        
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            icon.className = 'fas fa-moon';
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
    
    
    /* ========================================
       SCROLL ANIMATIONS
       ======================================== */
    function initScrollAnimations() {
        if (!CONFIG.settings.enableAnimations) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos
        document.querySelectorAll('.feature-card, .spec-category, .demo-step, .tech-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
});


/* ========================================
   FUNCIONES GLOBALES
   ======================================== */

// Scroll a sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Ajustar color (para gradientes)
function adjustColor(color, amount) {
    const clamp = (val) => Math.min(Math.max(val, 0), 255);
    const num = parseInt(color.replace('#', ''), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00FF) + amount);
    const b = clamp((num & 0x0000FF) + amount);
    return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Abrir enlace externo
function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff, #7c3aed);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Prevenir errores de consola
window.addEventListener('error', function(e) {
    console.log('Error capturado:', e.message);
});

console.log('%c🚀 ESP32 Smart Home', 'color: #00d4ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%c⚡ Sistema cargado correctamente', 'color: #7c3aed; font-size: 14px;');
console.log('%c💡 Versión: ' + CONFIG.version, 'color: #ff006e; font-size: 12px;');
