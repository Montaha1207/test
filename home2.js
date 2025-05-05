// Enhanced JavaScript for Learnify website

// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
}

// Add active class to current menu item
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Animate greeting on page load
    const greeting = document.querySelector('.greeting');
    greeting.style.opacity = '0';
    greeting.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        greeting.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateY(0)';
    }, 300);

    // Animate featured course on page load
    const featuredCourse = document.querySelector('.featured-course');
    featuredCourse.style.opacity = '0';
    featuredCourse.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        featuredCourse.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        featuredCourse.style.opacity = '1';
        featuredCourse.style.transform = 'translateY(0)';
    }, 600);
    
    // Create pagination dots dynamically if needed
    const createPagination = () => {
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            // Clear existing dots
            pagination.innerHTML = '';
            
            // Create dots
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', function() {
                    // Remove active class from all dots
                    document.querySelectorAll('.pagination .dot').forEach(d => {
                        d.classList.remove('active');
                    });
                    
                    // Add active class to clicked dot
                    this.classList.add('active');
                    
                    // Additional functionality for course switching can be added here
                });
                
                pagination.appendChild(dot);
            }
        }
    };
    
    createPagination();
    
    // Add hover effects for menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('svg');
            if (icon && !this.classList.contains('active')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Add responsive behavior for small screens
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.menu-item').forEach(item => {
                const text = item.querySelector('a');
                if (text) text.style.display = 'none';
            });
        } else {
            document.querySelectorAll('.menu-item').forEach(item => {
                const text = item.querySelector('a');
                if (text) text.style.display = 'block';
            });
        }
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
});