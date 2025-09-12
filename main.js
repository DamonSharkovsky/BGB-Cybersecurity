function showTab(tabName, event) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Hide all tab sections
    document.querySelectorAll('.tab-section').forEach(section => section.style.display = 'none');

    // Show main posts for 'all' and 'scams'
    if (tabName === 'all' || tabName === 'scams' || tabName === 'questions') {
        document.getElementById('main-posts').style.display = 'block';
        document.getElementById('community-tab').style.display = 'none';
        // Filter posts as before
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const postType = post.querySelector('.post-type');
            if (tabName === 'all') {
                post.style.display = 'block';
            } else if (tabName === 'scams' && (postType.classList.contains('scam-alert') || postType.classList.contains('warning'))) {
                post.style.display = 'block';
            } else if (tabName === 'questions' && postType.classList.contains('question')) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Show community tab
    if (tabName === 'community') {
        document.getElementById('main-posts').style.display = 'none';
        document.getElementById('community-tab').style.display = 'block';
    }
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

function joinCommunity(event) {
    event.preventDefault();
    const area = document.getElementById("area").value;
    const feed = document.getElementById("community-feed");

    if (area === "Other") {
        areaNotListed();
    } else {
        feed.innerHTML = `
            <h3>🌍 Western Cape - ${area} Community</h3>
            <article class="post">
                <div class="post-header">
                    <span class="post-type community">🤝 COMMUNITY</span>
                    <div class="post-meta">Posted by @LocalHero • just now • ${area}, Western Cape</div>
                </div>
                <div class="post-body">
                    <h3 class="post-title">Welcome to the ${area} community!</h3>
                    <p class="post-preview">Share scams you’ve seen, ask questions, or give advice to people near you.</p>
                </div>
            </article>
        `;
    }
}

function areaNotListed() {
    const feed = document.getElementById("community-feed");
    feed.innerHTML = `
        <h3>🌍 Western Cape Community</h3>
        <div class="post">
            <div class="post-body">
                <h3 class="post-title">Area Not Listed</h3>
                <p class="post-preview">
                    Sorry, your area is not listed yet.<br>
                    Please <a href="mailto:support@safeguardcommunity.co.za?subject=Add%20My%20Area%20to%20Western%20Cape%20Community">email us</a> to request your area to be added.
                </p>
            </div>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('SafeGuard Community Platform Loaded');
    console.log('Backend would handle: User authentication, post CRUD operations, AI threat analysis, community moderation');
    
    // Simulate periodic updates
    setInterval(addNotification, 30000);
});


const articles = document.querySelectorAll("article");


articles.forEach(article => {
    article.addEventListener("click", () => {
        console.log("catch")
        const targetPage = article.getAttribute("data-target");

        window.location.href = targetPage;
    })
    
})
