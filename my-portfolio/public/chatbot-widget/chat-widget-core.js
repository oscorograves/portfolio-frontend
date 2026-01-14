(function () {
    console.log("Chat Widget v3 Loaded");
    // Configuration - Use environment-specific URL
    const API_URL = '/api/chat'; // Relative path handled by Vite proxy (dev) and server (prod)

    // Create and inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chatbot-widget/chat-widget.css'; // Absolute path for public folder
    document.head.appendChild(link);

    // Create Widget Container
    const container = document.createElement('div');
    container.className = 'chat-widget-container';

    // Check for dark mode preference
    if (document.documentElement.classList.contains('dark')) {
        container.classList.add('dark');
    }

    // Observe changes to html class for dark mode toggle
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.documentElement.classList.contains('dark')) {
                    container.classList.add('dark');
                } else {
                    container.classList.remove('dark');
                }
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    container.innerHTML = `
        <div class="chat-window">
            <div class="chat-header">
                <span class="chat-header-title">Chat with AI</span>
                <button class="chat-close-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="chat-messages">
                <div class="chat-message bot">
                    Hello! I'm Kanishk's AI assistant. Ask me anything about his projects, skills, or experience.
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" class="chat-input" placeholder="Type your message..." />
                <button class="chat-send-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
        <button class="chat-widget-toggle">
            <svg class="chat-widget-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    `;

    document.body.appendChild(container);

    // Elements
    const toggleBtn = container.querySelector('.chat-widget-toggle');
    const closeBtn = container.querySelector('.chat-close-btn');
    const chatWindow = container.querySelector('.chat-window');
    const input = container.querySelector('.chat-input');
    const sendBtn = container.querySelector('.chat-send-btn');
    const messagesContainer = container.querySelector('.chat-messages');

    // State
    let isOpen = false;

    // Functions
    const toggleChat = () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatWindow.classList.add('open');
            input.focus();
        } else {
            chatWindow.classList.remove('open');
        }
    };

    // Expose toggle globally for React App
    window.toggleChatWidget = toggleChat;

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const addTypingIndicator = () => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot typing-indicator';
        msgDiv.innerHTML = '<span></span><span></span><span></span>';
        msgDiv.id = 'typing-indicator';
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const indicator = container.querySelector('#typing-indicator');
        if (indicator) indicator.remove();
    };

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // UI Updates
        addMessage(text, 'user');
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
        addTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('[ChatWidget] Non-JSON response:', responseText);
                throw new Error(`Server returned invalid response: ${responseText.substring(0, 50)}...`);
            }

            removeTypingIndicator();

            if (response.ok) {
                addMessage(data.reply, 'bot');
            } else {
                addMessage(`Error: ${data.error || 'Something went wrong.'}`, 'bot');
            }
        } catch (err) {
            removeTypingIndicator();
            console.error('[ChatWidget] Fetch Error:', err);
            addMessage(`Error: Could not connect to the server. (${err.message})`, 'bot');
            console.error(err);
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    };

    // Event Listeners
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.remove('open');
    });

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

})();
