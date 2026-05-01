import aiProvider from '../shared/providers/AIProvider.js';

const chatContainer = document.getElementById('chat-container');
const questionInput = document.getElementById('question-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

    messageDiv.innerHTML = `
        <div class="message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}">
            ${isUser ? '👤' : '🤖'}
        </div>
        <div class="message-content">
            <div class="message-text">${content}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendQuestion() {
    const question = questionInput.value.trim();
    if (!question) return;

    // Disable input while processing
    questionInput.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    // Add user message
    addMessage(question, true);
    questionInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        const data = await aiProvider.analyzeThreat(question);

        // Hide typing indicator
        hideTypingIndicator();

        if (data.success) {
            // Add AI response
            addMessage(data.answer);
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }

    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();

        // Show fallback response
        const fallbackResponse = getFallbackResponse(question);
        addMessage(fallbackResponse);

        showError('Note: AI service is currently unavailable. Showing cached response.');
    }

    // Re-enable input
    questionInput.disabled = false;
    sendButton.disabled = false;
    sendButton.textContent = 'Send';
    questionInput.focus();
}

function getFallbackResponse(question) {
    const fallbackResponses = {
        'voice': `🎙️ **AI Voice Cloning Detection Tips:**

• **Listen for inconsistencies** - AI voices often have subtle robotic qualities or unnatural pauses
• **Ask personal questions** - Request information only the real person would know
• **Check for background noise** - AI voices often lack natural ambient sounds
• **Call back directly** - If someone claims to be family/friend, hang up and call their known number
• **Trust your instincts** - If something feels "off" about the voice, investigate further

**Red flags:** Urgency, requests for money, avoiding video calls, poor audio quality`,

        'deepfake': `📹 **Deepfake Video Warning Signs:**

• **Unnatural eye movements** - Eyes that don't blink naturally or look in wrong directions  
• **Facial inconsistencies** - Blurry areas around face edges, mismatched lighting
• **Audio sync issues** - Voice not matching lip movements perfectly
• **Background anomalies** - Inconsistent lighting or backgrounds that don't match
• **Quality changes** - Face quality different from rest of video

**Protection:** Always verify through alternate communication channels before taking action.`,

        'phishing': `📧 **AI-Generated Phishing Email Signs:**

• **Perfect grammar** - Suspiciously well-written for typical scam emails
• **Personalized content** - Using your name/details in sophisticated ways
• **Urgent requests** - Creating false time pressure for immediate action
• **Credential requests** - Asking for passwords, 2FA codes, or personal info
• **Generic greetings** despite personalization elsewhere

**Always verify** suspicious emails by contacting organizations directly through official channels.`,

        'scam': `🚨 **If You Suspect an AI Scam:**

**Immediate Actions:**
1. **Don't engage** - Hang up, don't click links, don't provide information
2. **Document everything** - Screenshot, record details, save evidence
3. **Verify independently** - Contact person/organization through known channels
4. **Report it** - Local police, FTC, relevant authorities

**Prevention:**
• Set up family code words for emergency calls
• Enable 2FA on all accounts
• Keep software updated
• Educate family members about AI threats`
    };

    // Simple keyword matching for fallback responses
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('voice') || lowerQuestion.includes('call')) {
        return fallbackResponses.voice;
    } else if (lowerQuestion.includes('deepfake') || lowerQuestion.includes('video')) {
        return fallbackResponses.deepfake;
    } else if (lowerQuestion.includes('email') || lowerQuestion.includes('phishing')) {
        return fallbackResponses.phishing;
    } else if (lowerQuestion.includes('scam') || lowerQuestion.includes('what to do')) {
        return fallbackResponses.scam;
    } else {
        return `🤖 I specialize in AI threat detection and digital safety. I can help you with:

• **Voice cloning scams** - How to detect fake voice calls
• **Deepfake videos** - Identifying manipulated videos  
• **AI phishing** - Recognizing sophisticated email scams
• **Protection strategies** - Steps to stay safe online
• **Incident response** - What to do if you're targeted

Please ask me about any specific AI threat or safety concern!`;
    }
}

// Global functions for HTML onclicks
window.askQuickQuestion = (question) => {
    questionInput.value = question;
    sendQuestion();
};

window.handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendQuestion();
    }
};

window.sendQuestion = sendQuestion;

// Auto-resize textarea
questionInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Focus input on load
window.addEventListener('load', () => {
    questionInput.focus();
});
