document.addEventListener('DOMContentLoaded', function() {
    // Update current date and time in UTC
    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.getUTCFullYear() + '-' + 
            String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
            String(now.getUTCDate()).padStart(2, '0') + ' ' +
            String(now.getUTCHours()).padStart(2, '0') + ':' +
            String(now.getUTCMinutes()).padStart(2, '0') + ':' +
            String(now.getUTCSeconds()).padStart(2, '0');
        
        document.getElementById('current-datetime').textContent = formattedDateTime;
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('show');
        document.body.classList.toggle('menu-open');
        overlay.classList.toggle('show');
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    // Notifications Dropdown
    const notifications = document.querySelector('.notifications');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');

    notifications.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close user menu if open
        userProfile.classList.remove('active');
        userMenu.classList.remove('show');
        
        notifications.classList.toggle('active');
        notificationsDropdown.classList.toggle('show');
    });

    // User Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    const userMenu = document.querySelector('.user-menu');

    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close notifications if open
        notifications.classList.remove('active');
        notificationsDropdown.classList.remove('show');
        
        userProfile.classList.toggle('active');
        userMenu.classList.toggle('show');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!notifications.contains(e.target)) {
            notifications.classList.remove('active');
            notificationsDropdown.classList.remove('show');
        }
        if (!userProfile.contains(e.target)) {
            userProfile.classList.remove('active');
            userMenu.classList.remove('show');
        }
    });

    // Tab Navigation
    const tabLinks = document.querySelectorAll('.main-nav a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active tab
            tabLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show target content with fade effect
            tabContents.forEach(content => {
                content.style.opacity = '0';
                content.classList.remove('active');
                
                if (content.id === targetId) {
                    content.classList.add('active');
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 50);
                }
            });

            // Close mobile menu if open
            if (mainNav.classList.contains('show')) {
                toggleMobileMenu();
            }
        });
    });

    // Stats Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = parseInt(stat.textContent);
                animateValue(stat, 0, finalValue, 1500);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Quick Actions Animation
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });

    // Notification Mark as Read
    const markAllRead = document.querySelector('.mark-all-read');
    if (markAllRead) {
        markAllRead.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.notification-item.unread')
                .forEach(item => item.classList.remove('unread'));
            
            const badge = document.querySelector('.notification-badge');
            badge.style.display = 'none';
        });
    }

    // Search Functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', searchTerm);
        }, 300));
    });

    // Debounce Function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
                overlay.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = e.target.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});

// Calendar functionality
function initializeCalendar() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    const calendarDates = document.querySelector('.calendar-dates');
    calendarDates.innerHTML = '';

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.className = 'calendar-date empty';
        calendarDates.appendChild(emptyDate);
    }

    // Add dates
    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = i;

        if (i === today.getDate()) {
            dateElement.classList.add('today');
        }

        // Example: Add event indicator for some dates
        if ([5, 10, 15, 20].includes(i)) {
            dateElement.classList.add('has-event');
        }

        calendarDates.appendChild(dateElement);
    }
}

// Initialize calendar when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();

    // Handle calendar navigation
    const prevBtn = document.querySelector('.calendar-nav.prev');
    const nextBtn = document.querySelector('.calendar-nav.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            // Handle previous month
            console.log('Previous month');
        });

        nextBtn.addEventListener('click', () => {
            // Handle next month
            console.log('Next month');
        });
    }
});