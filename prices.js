document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
    
        if (sidebar && mainContent) {
            // Toggle the 'hidden' class on the sidebar
            sidebar.classList.toggle('hidden');
    
            // Toggle the 'expanded' class on the main content
            mainContent.classList.toggle('expanded');
        } else {
            console.error('Sidebar or main content element not found.');
        }
    }
    
    // Make the toggleSidebar function available globally
    window.toggleSidebar = toggleSidebar;

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add functionality to "Select Plan" buttons
    const selectButtons = document.querySelectorAll('.select-plan');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the plan type from the parent card's class
            const card = this.closest('.pricing-card');
            let planType = '';
            
            if (card.classList.contains('basic')) {
                planType = 'Basic';
            } else if (card.classList.contains('standard')) {
                planType = 'Standard';
            } else if (card.classList.contains('premium')) {
                planType = 'Premium';
            }
            
            // Show confirmation dialog
            const confirmation = confirm(`You've selected the ${planType} plan. Would you like to proceed with registration?`);
            
            if (confirmation) {
                // Simple form for user details
                const userEmail = prompt("Please enter your email to register:", "");
                
                if (userEmail && validateEmail(userEmail)) {
                    alert(`Thank you for registering for the ${planType} plan! We'll send confirmation details to ${userEmail}`);
                    // Here you would typically send this information to a server
                } else if (userEmail) {
                    alert("Please enter a valid email address.");
                }
            }
        });
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add comparison feature
    createComparisonButton();

    function createComparisonButton() {
        // Create the comparison button
        const comparisonButton = document.createElement('button');
        comparisonButton.textContent = 'Compare Plans';
        comparisonButton.style.padding = '12px 24px';
        comparisonButton.style.backgroundColor = '#35aed6';
        comparisonButton.style.color = 'white';
        comparisonButton.style.border = 'none';
        comparisonButton.style.borderRadius = '4px';
        comparisonButton.style.cursor = 'pointer';
        comparisonButton.style.margin = '20px auto';
        comparisonButton.style.display = 'block';
        
        // Add the button to the page
        const pricingContainer = document.querySelector('.pricing-container');
        pricingContainer.parentNode.insertBefore(comparisonButton, pricingContainer);
        
        // Add click event to the button
        comparisonButton.addEventListener('click', showComparison);
    }

    function showComparison() {
        // Create modal container
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '800px';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflowY = 'auto';
        
        // Create comparison table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        
        // Table content
        table.innerHTML = `
            <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Features</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Basic</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Standard</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Premium</th>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Price</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">999dt / Month</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">1200dt / Month</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">2500dt / Month</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Unlimited access courses</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Progress Report Available</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">High resolution videos</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Certificate after completion</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✗</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Private sessions</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✗</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✗</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✓</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Customer Support</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Email Only</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Email & Chat</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Priority Support</td>
            </tr>
            <tr>
                <td style="padding: 12px; text-align: left; border: 1px solid #ddd;">Download Courses</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✗</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Limited</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Unlimited</td>
            </tr>
        `;
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#35aed6';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginTop = '20px';
        closeButton.style.display = 'block';
        closeButton.style.marginLeft = 'auto';
        closeButton.style.marginRight = 'auto';
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Plan Comparison';
        title.style.textAlign = 'center';
        title.style.margin = '0 0 20px 0';
        title.style.color = '#35aed6';
        
        // Assemble modal
        modalContent.appendChild(title);
        modalContent.appendChild(table);
        modalContent.appendChild(closeButton);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Close when clicking outside the modal
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    // Add special offer countdown timer
    createSpecialOfferTimer();

    function createSpecialOfferTimer() {
        // Create the offer container
        const offerContainer = document.createElement('div');
        offerContainer.style.textAlign = 'center';
        offerContainer.style.marginBottom = '20px';
        offerContainer.style.padding = '15px';
        offerContainer.style.backgroundColor = '#ffeaa7';
        offerContainer.style.borderRadius = '8px';
        offerContainer.style.color = '#2d3436';
        
        // Create the offer text
        const offerText = document.createElement('p');
        offerText.innerHTML = '<strong>Special Offer:</strong> 20% off all plans! Ends in:';
        offerText.style.marginBottom = '10px';
        
        // Create the timer
        const timer = document.createElement('div');
        timer.style.fontWeight = 'bold';
        timer.style.fontSize = '20px';
        timer.style.color = '#e17055';
        
        // Set the countdown time (24 hours from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 1);
        
        // Update the timer every second
        const timerInterval = setInterval(function() {
            // Get current time
            const now = new Date().getTime();
            
            // Calculate the time remaining
            const distance = countDownDate - now;
            
            // Calculate hours, minutes, and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the timer
            timer.textContent = `${hours}h ${minutes}m ${seconds}s`;
            
            // If the countdown is finished, clear the interval
            if (distance < 0) {
                clearInterval(timerInterval);
                timer.textContent = "Offer Expired";
                offerContainer.style.backgroundColor = "#dfe6e9";
            }
        }, 1000);
        
        // Assemble the offer container
        offerContainer.appendChild(offerText);
        offerContainer.appendChild(timer);
        
        // Add the offer container to the page
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(offerContainer, mainContent.firstChild);
    }

    // Initialize some animations for the menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        // Add a small delay for each item for a staggered effect
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
});