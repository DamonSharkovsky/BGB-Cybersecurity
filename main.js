function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Filter posts based on tab (this would connect to backend in real implementation)
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const postType = post.querySelector('.post-type');
        if (tabName === 'all') {
            post.style.display = 'block';
        } else if (tabName === 'scams' && postType.classList.contains('scam-alert')) {
            post.style.display = 'block';
        } else if (tabName === 'scams' && postType.classList.contains('warning')) {
            post.style.display = 'block';
        } else if (tabName === 'questions' && postType.classList.contains('question')) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function showCreateForm() {
    alert('Create Post Modal would open here!\n\nFeatures:\n- Select post type (Scam Report, Question, Warning)\n- Add title and description\n- Include location (optional)\n- Add evidence/screenshots\n- Tag threat type');
}

// Simulate real-time updates
function addNotification() {
    const notifications = [
        "🚨 New scam reported in your area",
        "💬 Your question received a new answer",
        "⚠️ Trending threat alert: AI voice scams increasing",
        "✅ Community verified your scam report"
    ];
    
    // This would be implemented with WebSocket or polling in real app
    console.log("Notification system would show:", notifications[Math.floor(Math.random() * notifications.length)]);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('SafeGuard Community Platform Loaded');
    console.log('Backend would handle: User authentication, post CRUD operations, AI threat analysis, community moderation');
    
    // Simulate periodic updates
    setInterval(addNotification, 30000);
});