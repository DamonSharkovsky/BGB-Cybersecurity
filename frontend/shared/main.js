import postService from './services/PostService.js';
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

    // Article clicks (for static articles)
    document.querySelectorAll('article.post').forEach(article => {
        article.addEventListener('click', () => {
            const target = article.getAttribute('data-target');
            if (target) window.location.href = target;
        });
    });
}

async function loadInitialData() {
    try {
        await postService.loadPosts(renderPosts);
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// --- Tab Logic ---
function showTab(tabName, targetElement) {
    state.currentTab = tabName;

    // Update active tab UI
    elements.tabs.forEach(tab => tab.classList.remove('active'));
    if (targetElement) targetElement.classList.add('active');

    // Hide all sections
    elements.tabSections.forEach(section => section.style.display = 'none');

    if (tabName === 'community') {
        elements.mainPosts.style.display = 'none';
        elements.communityTab.style.display = 'block';
    } else {
        elements.mainPosts.style.display = 'block';
        elements.communityTab.style.display = 'none';
        filterPosts(tabName);
    }

    // Show/hide create post containers
    if (elements.experienceContainer) {
        elements.experienceContainer.style.display = (tabName === 'all') ? 'block' : 'none';
    }
}

function filterPosts(tabName) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const typeEl = post.querySelector('.post-type');
        if (!typeEl) return;

        const type = typeEl.textContent.toLowerCase();
        if (tabName === 'all') {
            post.style.display = 'block';
        } else if (tabName === 'scams' && (type.includes('scam') || type.includes('warning'))) {
            post.style.display = 'block';
        } else if (tabName === 'questions' && type.includes('question')) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// --- Modal Logic ---
function showModal(title) {
    elements.modalTitle.innerText = title;
    elements.createPostModal.style.display = 'flex';
}

function closeModal() {
    elements.createPostModal.style.display = 'none';
    elements.createPostForm.reset();
}

// --- Post Logic ---
async function handlePostSubmit(event) {
    event.preventDefault();

    const postData = {
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postBody').value,
        type: 'SCAM_ALERT', // Defaulting for now
        location: 'South Africa',
        author_id: 1, // Mock author_id until auth is fully integrated
    };

    try {
        await postService.submitPost(postData, (newPost) => {
            alert('Post submitted successfully!');
            renderNewPost(newPost);
            closeModal();
        });
    } catch (error) {
        alert('Failed to submit post: ' + error);
    }
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
    
    postEl.innerHTML = `
        <div class="post-header">
            <span class="post-type ${getPostTypeClass(post.type)}">${post.type.replace('_', ' ')}</span>
            <div class="post-meta">Posted by @User • ${dateStr} • ${post.location}</div>
        </div>
        <div class="post-body">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-preview">${post.content}</p>
        </div>
        <div class="post-footer">
            <div class="post-stats">
                <span class="stat">👍 ${post.upvotes || 0} upvotes</span>
                <span class="stat">💬 0 comments</span>
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
