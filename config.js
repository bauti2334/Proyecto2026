/* ============================================
   ARCHIVO DE CONFIGURACIÓN - ESP32 SMART HOME
   ============================================
   
   INSTRUCCIONES:
   Personaliza todos los valores de tu proyecto
   ESP32 aquí. NO necesitas tocar HTML, CSS o JS.
   
   ============================================ */

const CONFIG = {
    
    /* ========================================
       INFORMACIÓN DEL PROYECTO
       ======================================== */
    projectName: "ESP32 Smart Home",
    tagline: "Sistema Domótico Inteligente",
    description: "Control total de tu hogar desde Telegram con tecnología ESP32",
    version: "1.0.0",
    author: "Tu Nombre",
    
    
    /* ========================================
       FUNCIONES DEL SISTEMA ESP32
       ======================================== 
       
       Cada función representa un módulo del
       sistema domótico. Puedes agregar más
       o modificar las existentes.
       
       Iconos disponibles de Font Awesome:
       https://fontawesome.com/icons
    */
    features: [
        {
            id: 1,
            name: "Alimentador de Gatos",
            icon: "fas fa-cat",
            description: "Sistema automático de alimentación programable para tus mascotas. Control de horarios y porciones desde Telegram.",
            tech: "Servo + Sensor",
            color: "#ff6b6b"
        },
        {
            id: 2,
            name: "Regador Automático",
            icon: "fas fa-seedling",
            description: "Riego inteligente de plantas con sensores de humedad. Programa horarios y monitorea el estado del suelo en tiempo real.",
            tech: "Bomba + Sensor Humedad",
            color: "#51cf66"
        },
        {
            id: 3,
            name: "Monitor de Temperatura",
            icon: "fas fa-temperature-high",
            description: "Medición continua de temperatura y humedad ambiental. Alertas automáticas cuando se supera el umbral configurado.",
            tech: "DHT22 / DS18B20",
            color: "#ff922b"
        },
        {
            id: 4,
            name: "Control de Luces",
            icon: "fas fa-lightbulb",
            description: "Encendido y apagado remoto de luces. Programa horarios automáticos o control manual desde cualquier lugar.",
            tech: "Relé + Control IR",
            color: "#ffd43b"
        },
        {
            id: 5,
            name: "Alarma de Seguridad",
            icon: "fas fa-shield-alt",
            description: "Sistema de detección de movimiento con alertas instantáneas. Activa/desactiva remotamente y recibe notificaciones en tiempo real.",
            tech: "PIR Sensor",
            color: "#fa5252"
        },
        {
            id: 6,
            name: "Contador de Personas",
            icon: "fas fa-users",
            description: "Contador inteligente de entrada y salida de personas. Ideal para estadísticas y control de aforo en tiempo real.",
            tech: "Sensor Ultrasónico",
            color: "#339af0"
        },
        {
            id: 7,
            name: "Detector de Gas",
            icon: "fas fa-smog",
            description: "Detección temprana de gases peligrosos (GLP, CO, humo). Alertas sonoras y notificaciones inmediatas vía Telegram.",
            tech: "MQ-2 / MQ-135",
            color: "#7950f2"
        },
        {
            id: 8,
            name: "Tacho Inteligente",
            icon: "fas fa-trash",
            description: "Apertura automática de tapa con sensor de proximidad. Manos libres e higiénico para tu cocina.",
            tech: "Servo + Ultrasónico",
            color: "#20c997"
        }
    ],
    
    
    /* ========================================
       ESPECIFICACIONES TÉCNICAS
       ======================================== 
       
       Hardware y componentes utilizados
    */
    specifications: {
        microcontroller: [
            "ESP32-WROOM-32 (Dual Core 240MHz)",
            "520KB SRAM + 4MB Flash",
            "WiFi 802.11 b/g/n integrado",
            "Bluetooth 4.2 BLE",
            "34 pines GPIO configurables",
            "12-bit ADC y 8-bit DAC"
        ],
        sensors: [
            "DHT22 - Temperatura y Humedad",
            "HC-SR04 - Sensor Ultrasónico",
            "PIR HC-SR501 - Detector de Movimiento",
            "MQ-2 / MQ-135 - Detectores de Gas",
            "Sensor de Humedad de Suelo",
            "Fotoresistencia LDR"
        ],
        communication: [
            "Telegram Bot API v6.0",
            "WiFi 2.4GHz (802.11n)",
            "Protocolo MQTT (opcional)",
            "WebSocket para streaming",
            "HTTP/HTTPS REST API",
            "Bluetooth Low Energy"
        ],
        userInterface: [
            "Pantalla OLED 128x64 (SSD1306)",
            "Buzzer piezoelétrico para alertas",
            "LEDs RGB de estado",
            "Botones físicos de emergencia",
            "Interfaz Telegram completa",
            "Comandos de voz (en desarrollo)"
        ]
    },
    
    
    /* ========================================
       MENSAJES DE TELEGRAM (DEMO)
       ======================================== 
       
       Simulación de conversación con el bot
    */
    telegramDemo: [
        {
            type: "bot",
            text: "¡Bienvenido! 👋 Soy tu asistente ESP32. ¿Qué deseas controlar?"
        },
        {
            type: "user",
            text: "/temperatura"
        },
        {
            type: "bot",
            text: "🌡️ Temperatura actual: 24.5°C\n💧 Humedad: 65%\n✅ Ambiente normal"
        },
        {
            type: "user",
            text: "/luces on"
        },
        {
            type: "bot",
            text: "💡 Luces encendidas correctamente\n⏰ Hora: 19:45"
        }
    ],
    
    
    /* ========================================
       CHATBOT / ASISTENTE
       ======================================== 
       
       Respuestas automáticas del asistente
    */
    chatbot: {
        welcomeMessage: "¡Hola! 🤖 Soy el asistente del proyecto ESP32 Smart Home. ¿En qué puedo ayudarte?",
        
        options: [
            {
                text: "⚙️ ¿Cómo funciona?",
                response: "El sistema ESP32 Smart Home controla 8 módulos domóticos mediante comandos de Telegram. Usa sensores y actuadores conectados al ESP32, que procesa la información y ejecuta acciones automáticas o manuales. Todo se comunica vía WiFi con tu smartphone."
            },
            {
                text: "🔧 Componentes necesarios",
                response: "Necesitas:<br>• ESP32-WROOM-32<br>• Pantalla OLED SSD1306<br>• Sensores (DHT22, PIR, Ultrasónico, MQ-2)<br>• Relés 5V<br>• Servomotores SG90<br>• Buzzer y LEDs<br>• Fuente 5V/2A<br><br>Total aprox: $50-80 USD"
            },
            {
                text: "📱 Configurar Telegram Bot",
                response: "Pasos:<br>1. Busca @BotFather en Telegram<br>2. Envía /newbot y sigue instrucciones<br>3. Copia el TOKEN que te da<br>4. En el código ESP32, pega el token<br>5. Agrega tu CHAT_ID<br>6. ¡Listo para usar!"
            },
            {
                text: "💻 Descargar código",
                response: "El código completo está disponible en GitHub:<br><br>🔗 github.com/tu-usuario/esp32-smarthome<br><br>Incluye:<br>• Código Arduino (.ino)<br>• Librerías necesarias<br>• Diagramas de conexión<br>• Manual de instalación"
            },
            {
                text: "❓ Problemas comunes",
                response: "Soluciones rápidas:<br><br>🔴 No conecta WiFi: Verifica SSID y password<br>🔴 Bot no responde: Revisa TOKEN y CHAT_ID<br>🔴 Sensores sin datos: Chequea conexiones<br>🔴 OLED en blanco: Verifica dirección I2C (0x3C)<br><br>¿Necesitas más ayuda específica?"
            },
            {
                text: "📚 Documentación completa",
                response: "Encuentra toda la documentación en:<br><br>📖 Wiki del proyecto<br>🎥 Tutoriales en video<br>📊 Diagramas de circuito<br>💬 Foro de comunidad<br><br>Link: docs.esp32smarthome.com"
            }
        ],
        
        defaultResponse: "Gracias por tu interés en ESP32 Smart Home. Para consultas técnicas específicas, visita nuestra documentación o únete al canal de Telegram del proyecto. 📡"
    },
    
    
    /* ========================================
       ENLACES Y REDES SOCIALES
       ======================================== */
    social: {
        github: "https://github.com/tu-usuario/esp32-smarthome",
        telegram: "https://t.me/esp32smarthome",
        youtube: "https://youtube.com/@esp32projects",
        instagram: "https://instagram.com/esp32projects"
    },
    
    
    /* ========================================
       INFORMACIÓN DE CONTACTO
       ======================================== */
    contact: {
        email: "contacto@esp32smarthome.com",
        telegram_bot: "@ESP32SmartHomeBot",
        support: "https://t.me/esp32support"
    },
    
    
    /* ========================================
       COMANDOS DE TELEGRAM
       ======================================== 
       
       Comandos disponibles para el bot
    */
    telegramCommands: [
        { command: "/start", description: "Iniciar el bot" },
        { command: "/status", description: "Estado de todos los módulos" },
        { command: "/alimentar", description: "Activar alimentador de gatos" },
        { command: "/regar", description: "Activar riego de plantas" },
        { command: "/temperatura", description: "Leer temperatura y humedad" },
        { command: "/luces", description: "Controlar luces (on/off)" },
        { command: "/alarma", description: "Activar/desactivar alarma" },
        { command: "/contador", description: "Ver contador de personas" },
        { command: "/gas", description: "Estado detector de gas" },
        { command: "/tacho", description: "Abrir tapa del tacho" },
        { command: "/help", description: "Ayuda y comandos disponibles" }
    ],
    
    
    /* ========================================
       CONFIGURACIÓN AVANZADA
       ======================================== */
    settings: {
        // Habilitar/deshabilitar funciones
        enableDarkMode: true,
        enableChatbot: true,
        enableAnimations: true,
        
        // Velocidad de animaciones (ms)
        animationSpeed: 300,
        
        // Tiempo del loader (ms)
        loaderDuration: 2500,
        
        // Idioma
        language: "es",
        
        // Modo demo
        demoMode: true
    },
    
    
    /* ========================================
       COLORES PERSONALIZADOS (OPCIONAL)
       ======================================== 
       
       Si quieres cambiar los colores del sitio
    */
    colors: {
        primary: "#00d4ff",      // Cian tecnológico
        secondary: "#7c3aed",    // Violeta
        accent: "#ff006e",       // Rosa/Magenta
        success: "#10b981",      // Verde
        warning: "#f59e0b",      // Amarillo
        danger: "#ef4444"        // Rojo
    }
};

/* ============================================
   NO MODIFIQUES NADA DEBAJO DE ESTA LÍNEA
   ============================================ */

// Hacer CONFIG disponible globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// Aplicar configuración al cargar
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Aplicar colores CSS dinámicamente
        const root = document.documentElement;
        if (CONFIG.colors) {
            root.style.setProperty('--color-primary', CONFIG.colors.primary);
            root.style.setProperty('--color-secondary', CONFIG.colors.secondary);
            root.style.setProperty('--color-accent', CONFIG.colors.accent);
        }
        
        console.log('%c🤖 ESP32 Smart Home System', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
        console.log('%c⚡ Version ' + CONFIG.version, 'color: #7c3aed; font-size: 14px;');
        console.log('%c✨ Developed by ' + CONFIG.author, 'color: #ff006e; font-size: 12px;');
    });
}
