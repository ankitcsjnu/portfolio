document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // Add preloader styles
    const preloaderStyle = document.createElement('style'); 
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .loader {
            display: flex;
            gap: 10px;
        }
        .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #3498db;
            animation: bounce 1s infinite ease-in-out;
        }
        .circle:nth-child(2) {
            animation-delay: 0.2s;
        }
        .circle:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        .preloader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(preloaderStyle);
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 800);
    });
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    
                    // Add animation
                    card.classList.add('fade-in');
                    setTimeout(() => {
                        card.classList.remove('fade-in');
                    }, 500);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
   // Get all skill level bars
const skillLevels = document.querySelectorAll('.skill-level');

// Set initial width to 0 for each skill bar
skillLevels.forEach(level => {
  level.style.width = '0';
  level.style.transition = 'width 1.5s ease-in-out';  // Set transition once
});

const animateOnScroll = () => {
  const skillsSection = document.querySelector('#skills');
  if (!skillsSection) return;

  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    skillLevels.forEach(level => {
      const targetWidth = level.getAttribute('data-level');
      if (targetWidth) {
        // Animate bar to target width only once
        if (level.style.width === '0px' || level.style.width === '0%') {
          level.style.width = targetWidth;
        }
      }
    });
  }

  // Animate other elements with data-animation attribute (if needed)
  document.querySelectorAll('[data-animation]').forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPositionAnim = window.innerHeight / 1.2;

    if (elementPosition < screenPositionAnim) {
      const animation = element.getAttribute('data-animation');
      element.classList.add(animation);
      element.style.opacity = '1';
    }
  });
};

// Add scroll and load event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

    
    // Add animation attributes to elements
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.setAttribute('data-animation', index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        card.style.opacity = '0';
    });
    
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.setAttribute('data-animation', index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        item.style.opacity = '0';
    });
    
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.setAttribute('data-animation', 'fade-in');
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for animations
    setTimeout(animateOnScroll, 500);
    
    // Form Submission with enhanced feedback
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.display = 'none';
        document.body.appendChild(notification);
        
        // Add notification styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .notification.success {
                background-color: #2ecc71;
            }
            .notification.error {
                background-color: #e74c3c;
            }
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(notificationStyle);
        
        // Show notification function
        function showNotification(message, type) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 300);
            }, 3000);
        }
        
        // Add loading indicator to submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending (would be an actual API call in production)
            setTimeout(() => {
                // Success
                showNotification(`Thank you for your message, ${name}! I will get back to you soon.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .slide-in-left {
            animation: slideInLeft 0.5s ease-in-out;
        }
        
        @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        
        .slide-in-right {
            animation: slideInRight 0.5s ease-in-out;
        }
        
        @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        
        .scale-in {
            animation: scaleIn 0.5s ease-in-out;
        }
        
        @keyframes scaleIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero h1');
    // Store the original text without any HTML tags for clean typing
    const nameText = 'Ankit Kumar Singh';
    const typingSpeed = 100;
    
    // Function to create typing effect
    function typeEffect() {
        heroTitle.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < nameText.length) {
                // If we're at the end of the text, wrap everything in the highlight span
                if (i === 0) {
                    heroTitle.innerHTML = '<span class="highlight">';
                }
                
                heroTitle.querySelector('.highlight').innerHTML += nameText.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                // Add blinking cursor at the end
                heroTitle.querySelector('.highlight').innerHTML += '<span class="cursor">|</span>';
                setInterval(() => {
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }
                }, 500);
            }
        }
        
        type();
    }
    
    // Start typing effect after a short delay
    setTimeout(typeEffect, 1000);
    
    // Add cursor style
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor {
            font-weight: 100;
            color: #3498db;
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Add back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Add back to top button styles
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .back-to-top:hover {
            background-color: #2980b9;
        }
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    // Add dark mode toggle styles
    const darkModeStyle = document.createElement('style');
    darkModeStyle.textContent = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: background-color 0.3s ease;
        }
        .dark-mode-toggle:hover {
            background-color: #2980b9;
        }
        body.dark-mode {
            background-color: #1a1a1a;
            color: #f5f5f5;
        }
        body.dark-mode #navbar {
            background-color: #222;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        body.dark-mode .nav-links a {
            color: #f5f5f5;
        }
        body.dark-mode .section-title {
            color: #f5f5f5;
        }
        body.dark-mode .bg-light {
            background-color: #222;
        }
        body.dark-mode .project-card, 
        body.dark-mode .timeline-content,
        body.dark-mode .contact-form input,
        body.dark-mode .contact-form textarea {
            background-color: #333;
            color: #f5f5f5;
        }
        body.dark-mode .project-info h3,
        body.dark-mode .timeline-content h3,
        body.dark-mode .contact-text h3 {
            color: #3498db;
        }
        body.dark-mode .hamburger .bar {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(darkModeStyle);
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});
