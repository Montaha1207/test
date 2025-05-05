// Toggle sidebar function
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    sidebar.classList.toggle('hidden');
    
    if (sidebar.classList.contains('hidden')) {
        sidebar.style.transform = 'translateX(-100%)';
        container.style.marginLeft = '0';
        container.style.maxWidth = '100%';
    } else {
        sidebar.style.transform = 'translateX(0)';
        container.style.marginLeft = window.innerWidth <= 768 ? '70px' : (window.innerWidth <= 992 ? '250px' : '280px');
        container.style.maxWidth = window.innerWidth <= 768 ? 'calc(100% - 70px)' : (window.innerWidth <= 992 ? 'calc(100% - 250px)' : 'calc(100% - 280px)');
    }
}

// Module selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const moduleItems = document.querySelectorAll('.module-item');
    
    moduleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove current class from all modules
            moduleItems.forEach(module => {
                module.classList.remove('current');
            });
            
            // Add current class to clicked module
            this.classList.add('current');
            
            // Update progress bar and next module info
            updateProgress(this);
            
            // Simulate loading new content
            simulateContentChange(this);
        });
    });
    
    // Like button functionality
    const likeButtons = document.querySelectorAll('.comment-action:first-child');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeText = this.textContent.trim();
            const likeCount = parseInt(likeText.match(/\d+/)[0]);
            this.textContent = `Like (${likeCount + 1})`;
            
            // Add visual feedback
            this.style.color = '#2193b0';
            setTimeout(() => {
                this.style.color = '#6c757d';
            }, 1500);
        });
    });
    
    // Comment form submission
    const commentForm = document.querySelector('.comment-form');
    const commentTextarea = document.querySelector('.comment-form-input textarea');
    const commentSubmit = document.querySelector('.comment-form-submit');
    
    commentSubmit.addEventListener('click', function() {
        const commentText = commentTextarea.value.trim();
        if (commentText) {
            addNewComment(commentText);
            commentTextarea.value = '';
        }
    });
    
    // Next module button functionality
    const nextModuleButton = document.querySelector('.next-module-button');
    nextModuleButton.addEventListener('click', function() {
        const currentModule = document.querySelector('.module-item.current');
        const nextModule = currentModule.nextElementSibling;
        
        if (nextModule) {
            currentModule.classList.remove('current');
            nextModule.classList.add('current');
            updateProgress(nextModule);
            simulateContentChange(nextModule);
        }
    });
});

// Update progress bar based on selected module
function updateProgress(selectedModule) {
    const modulesList = document.querySelectorAll('.module-item');
    const moduleIndex = Array.from(modulesList).indexOf(selectedModule);
    const totalModules = modulesList.length;
    const progressPercentage = Math.round(((moduleIndex + 1) / totalModules) * 100);
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update progress text
    const progressStats = document.querySelector('.progress-stats div:first-child');
    progressStats.textContent = `${progressPercentage}% Complete`;
    
    const modulesCompleted = document.querySelector('.progress-stats div:last-child');
    modulesCompleted.textContent = `${moduleIndex + 1}/${totalModules} Modules`;
    
    // Update next module info
    const nextModuleTitle = document.querySelector('.next-module-title');
    if (moduleIndex < totalModules - 1) {
        const nextModuleName = modulesList[moduleIndex + 1].querySelector('.module-title').textContent;
        nextModuleTitle.textContent = nextModuleName;
    } else {
        nextModuleTitle.textContent = 'Course Completed!';
    }
}

// Simulate content change when selecting a new module
function simulateContentChange(selectedModule) {
    const moduleTitle = selectedModule.querySelector('.module-title').textContent;
    const videoPlayer = document.querySelector('.video-player');
    
    // Add loading effect
    videoPlayer.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#f8f9fa; color:#2193b0;">
        <div>
            <div style="text-align:center; margin-bottom:15px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-spinner" style="animation: spin 2s linear infinite;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
            </div>
            <div>Loading ${moduleTitle}...</div>
        </div>
    </div>`;
    
    // After a delay, replace with "new" video
    setTimeout(() => {
        videoPlayer.innerHTML = `<iframe width="100%" height="500" src="https://www.youtube.com/embed/PkZNo7MFNFg" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>`;
    }, 1500);
    
    // Update page title
    document.title = `${moduleTitle} - Learnify`;
}

// Add a new comment to the discussion section
function addNewComment(commentText) {
    const discussionSection = document.querySelector('.discussion-section');
    const commentForm = document.querySelector('.comment-form');
    
    // Create new comment element
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="/api/placeholder/50/50" alt="Your Avatar">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <div class="comment-author">You</div>
                <div class="comment-time">Just now</div>
            </div>
            <p class="comment-text">${commentText}</p>
            <div class="comment-actions">
                <div class="comment-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like (0)
                </div>
                <div class="comment-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Reply
                </div>
            </div>
        </div>
    `;
    
    // Add animation to new comment
    newComment.style.animation = 'fadeIn 0.5s ease forwards';
    
    // Insert new comment before the comment form
    discussionSection.insertBefore(newComment, commentForm);
    
    // Add click event to new like button
    const likeButton = newComment.querySelector('.comment-action:first-child');
    likeButton.addEventListener('click', function() {
        const likeText = this.textContent.trim();
        const likeCount = parseInt(likeText.match(/\d+/)[0]);
        this.textContent = `Like (${likeCount + 1})`;
        
        // Add visual feedback
        this.style.color = '#2193b0';
        setTimeout(() => {
            this.style.color = '#6c757d';
        }, 1500);
    });
}

// Add keyframe animation for loading spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// Handle responsive sidebar
window.addEventListener('resize', function() {
    if (!document.querySelector('.sidebar').classList.contains('hidden')) {
        const container = document.querySelector('.container');
        container.style.marginLeft = window.innerWidth <= 768 ? '70px' : (window.innerWidth <= 992 ? '250px' : '280px');
        container.style.maxWidth = window.innerWidth <= 768 ? 'calc(100% - 70px)' : (window.innerWidth <= 992 ? 'calc(100% - 250px)' : 'calc(100% - 280px)');
    }
});