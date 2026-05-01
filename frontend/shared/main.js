import postService from './services/PostService.js';
import homeService from './services/HomeService.js';
import authProvider from './providers/AuthProvider.js';

// --- UI Logic & State ---
const state = {
    currentTab: 'all',
};

// --- DOM Elements ---
const elements = {
    tabs: document.querySelectorAll('.tab'),
    tabSections: document.querySelectorAll('.tab-section'),
    postsContainer: document.getElementById('posts-container'),
    createPostModal: document.getElementById('createPostModal'),
    createPostForm: document.getElementById('createPostForm'),
    modalTitle: document.getElementById('modalTitle'),
    experienceContainer: document.getElementById('create-experience-container'),
    scamContainer: document.getElementById('create-scam-container'),
    communityTab: document.getElementById('community-tab'),
    mainPosts: document.getElementById('main-posts'),
    communityFeed: document.getElementById('community-feed'),
    areaSelect: document.getElementById('area'),
    trendingThreatsContainer: document.getElementById('trending-threats-container'),
    safetyTipContainer: document.getElementById('safety-tip-container'),
    communityStatsContainer: document.getElementById('community-stats-container'),
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('SafeGuard Community Platform Loaded');
    initEventListeners();
    loadInitialData();
});

function initEventListeners() {
    // Tab switching
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.textContent.toLowerCase().includes('news') ? 'scams' : 
                            e.target.textContent.toLowerCase().includes('community') ? 'community' : 'all';
            showTab(tabName, e.target);
        });
    });

    // Modal management
    if (elements.experienceContainer) {
        elements.experienceContainer.addEventListener('click', () => showModal('Create New Post'));
    }
    
    // Using event delegation for dynamic elements or just direct binding if they exist
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (elements.createPostForm) {
        elements.createPostForm.addEventListener('submit', handlePostSubmit);
    }
}

async function loadInitialData() {
    try {
        // Load all data in parallel
        const [posts, dashboard, areas] = await Promise.all([
            postService.loadPosts(),
            homeService.loadDashboardData(),
            homeService.loadAreas()
        ]);

        renderPosts(posts);
        renderDashboard(dashboard);
        renderAreas(areas);
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// --- Rendering Logic ---

function renderDashboard(data) {
    if (!data) return;

    // Render Trending Threats
    if (elements.trendingThreatsContainer) {
        elements.trendingThreatsContainer.innerHTML = data.trending_threats.length > 0 
            ? data.trending_threats.map(threat => `
                <div class="trending-item">
                    <span class="trending-text">${threat.name}</span>
                    <span class="trending-count">${threat.report_count} reports</span>
                </div>
            `).join('')
            : '<p class="placeholder">No trending threats found.</p>';
    }

    // Render Safety Tip
    if (elements.safetyTipContainer) {
        if (data.safety_tips && data.safety_tips.length > 0) {
            const tip = data.safety_tips[0]; // Just show the first one for now
            elements.safetyTipContainer.innerHTML = `
                <div class="safety-tip">
                    <div class="tip-title">${tip.title}</div>
                    <div class="tip-text">${tip.content}</div>
                </div>
            `;
        } else {
            elements.safetyTipContainer.innerHTML = '<p class="placeholder">Check back later for safety tips.</p>';
        }
    }

    // Render Community Stats
    if (elements.communityStatsContainer) {
        elements.communityStatsContainer.innerHTML = data.community_stats.length > 0
            ? data.community_stats.map(stat => `
                <div class="trending-item">
                    <span class="trending-text">${stat.label}</span>
                    <span class="trending-count">${stat.value}</span>
                </div>
            `).join('')
            : '<p class="placeholder">No stats available.</p>';
    }
}

function renderAreas(areas) {
    if (!elements.areaSelect || !areas) return;

    // Keep the first default option
    const defaultOption = elements.areaSelect.options[0];
    elements.areaSelect.innerHTML = '';
    elements.areaSelect.appendChild(defaultOption);

    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area.name;
        option.textContent = area.name;
        elements.areaSelect.appendChild(option);
    });
}

function renderPosts(posts) {
    // Clear existing static posts
    elements.postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        elements.postsContainer.innerHTML = '<p class="placeholder">No posts yet. Be the first to share!</p>';
        return;
    }

    posts.forEach(post => renderNewPost(post, false));
}

function renderNewPost(post, prepend = true) {
    const postEl = document.createElement('article');
    postEl.className = 'post';
    
    // Format the date if it's a string
    const dateStr = post.created_at ? new Date(post.created_at).toLocaleString() : 'just now';
    const authorName = post.author_name || 'User';
    const commentCount = post.comment_count || 0;
    
    postEl.innerHTML = `
        <div class="post-header">
            <span class="post-type ${getPostTypeClass(post.type)}">${post.type.replace('_', ' ')}</span>
            <div class="post-meta">Posted by @${authorName} • ${dateStr} • ${post.location}</div>
        </div>
        <div class="post-body">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-preview">${post.content}</p>
        </div>
        <div class="post-footer">
            <div class="post-stats">
                <span class="stat">👍 ${post.upvotes || 0} upvotes</span>
                <span class="stat">💬 ${commentCount} comments</span>
                <span class="stat">⚠️ Community Report</span>
            </div>
        </div>
    `;

    if (prepend) {
        elements.postsContainer.prepend(postEl);
    } else {
        elements.postsContainer.appendChild(postEl);
    }
}

function getPostTypeClass(type) {
    switch (type) {
        case 'SCAM_ALERT': return 'scam-alert';
        case 'QUESTION': return 'question';
        case 'WARNING': return 'warning';
        default: return 'community';
    }
}

// --- Global helper functions for legacy HTML onclicks (if not fully refactored yet) ---
window.showTab = showTab;
window.showCreateForm = () => showModal('Create New Post');
window.showScamReportForm = () => showModal('Report a Scam');
window.closeModal = closeModal;
window.submitPost = handlePostSubmit;
window.joinCommunity = (e) => {
    e.preventDefault();
    const area = document.getElementById("area").value;
    if (area === "Other") {
        areaNotListed();
    } else {
        elements.communityFeed.innerHTML = `
            <h3>Western Cape - ${area} Community</h3>
            <article class="post">
                <div class="post-header">
                    <span class="post-type community">COMMUNITY</span>
                    <div class="post-meta">Posted by @LocalHero • just now • ${area}, Western Cape</div>
                </div>
                <div class="post-body">
                    <h3 class="post-title">Welcome to the ${area} community!</h3>
                    <p class="post-preview">Share scams you’ve seen, ask questions, or give advice to people near you.</p>
                </div>
            </article>
        `;
    }
};

function areaNotListed() {
    elements.communityFeed.innerHTML = `
        <h3>Western Cape Community</h3>
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
window.areaNotListed = areaNotListed;
