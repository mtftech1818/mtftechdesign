/**
 * MTFTech网站主要JavaScript功能
 * 本文件包含网站的所有交互功能，包括：
 * - 菜单和导航交互
 * - 轮播功能（Hero轮播和合作伙伴轮播）
 * - 动画效果（滚动触发、数字增长、视差效果等）
 * - 表单验证和提交处理
 * - 响应式设计支持
 * - 内容过滤和切换功能
 */

// Browser compatibility polyfill for older browsers
(function() {
    // Object.assign polyfill for IE
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // Element.closest polyfill for IE
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // Element.matches polyfill for older browsers
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                   Element.prototype.webkitMatchesSelector;
    }
})();

// Detect touch capability
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// Add appropriate class to the body
document.body.classList.add(isTouchDevice ? 'touch-device' : 'no-touch');

// Device/Browser detection for specific adjustments
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isIOS) document.body.classList.add('ios');
if (isIE) document.body.classList.add('ie');
if (isEdge) document.body.classList.add('edge');
if (isChrome) document.body.classList.add('chrome');
if (isFirefox) document.body.classList.add('firefox');
if (isSafari) document.body.classList.add('safari');

// Add a class to identify mobile devices
const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (isMobile) document.body.classList.add('mobile');

// Function to check viewport size changes
function handleViewportChange() {
    const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileNow) {
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}

// Set up resize observer for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleViewportChange, 250);
});

// Add a class when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('dom-loaded');
    handleViewportChange();

    // Initialize all components when DOM is fully loaded
    initMenuToggle();
    initLanguageSwitcher();
    initHeroCarousel();
    initParallaxEffect();
    initServiceCardsAnimation();
    initTechBarAnimation();
    initProjectsFilter();
    initCountAnimation();
    initPartnersCarousel();
    initContactForm();
    initNewsletterForm();
});

/**
 * 初始化移动端菜单切换功能
 * 处理菜单按钮点击、下拉菜单交互和外部点击关闭
 */
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // 切换aria-expanded属性以提升无障碍性
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
        
        // 菜单打开时阻止body滚动
        document.body.classList.toggle('nav-open');
    });
    
    // 为下拉菜单添加移动特定事件处理程序
    const dropdownItems = document.querySelectorAll('.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdownContent = item.querySelector('.dropdown-content');
        
        if (!link || !dropdownContent) return;
        
        // 对移动设备：处理下拉切换
        if (isMobile || isTouchDevice) {
            link.addEventListener('click', function(e) {
                // 仅在存在下拉内容时阻止默认行为
                if (!item.classList.contains('show-dropdown')) {
                    e.preventDefault();
                }
                
                // 关闭其他打开的下拉菜单
                dropdownItems.forEach(other => {
                    if (other !== item && other.classList.contains('show-dropdown')) {
                        other.classList.remove('show-dropdown');
                    }
                });
                
                item.classList.toggle('show-dropdown');
            });
        } else {
            // 对桌面：使用悬停
            item.addEventListener('mouseenter', () => {
                item.classList.add('show-dropdown');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('show-dropdown');
            });
        }
    });
    
    // 点击外部时关闭菜单
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Mobile dropdown toggle
    const hasDropdown = document.querySelectorAll('.has-dropdown');
    
    hasDropdown.forEach(item => {
        if (window.innerWidth < 768) {
            const dropdownToggle = item.querySelector('a');
            const dropdown = item.querySelector('.dropdown');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Language Switcher
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLang = document.querySelector('.current-lang');
    const langOptions = document.querySelectorAll('.lang-dropdown li');
    
    if (languageSwitcher && langOptions.length > 0) {
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const flagSrc = this.querySelector('.lang-flag').src;
                const langText = this.querySelector('span').textContent;
                
                // Update active class
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update current language display
                currentLang.querySelector('.lang-flag').src = flagSrc;
                currentLang.querySelector('span').textContent = lang.toUpperCase();
                
                // Here you would typically handle language change logic
                console.log(`Language changed to: ${lang}`);
            });
        });
    }
    
    // Add scroll event for header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for dropdown toggles on mobile
            if (window.innerWidth <= 768 && this.parentNode.classList.contains('dropdown')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animate numbers in stats section
    const animateStats = () => {
        const stats = document.querySelectorAll('.count');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 30; // Divide by number of frames
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    };
    
    // Set progress bar width attribute
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        const progressBar = item.querySelector('.progress');
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        progressBar.style.setProperty('--width', width);
    });
    
    // Create intersection observer for animations
    const observerOptions = { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                animateOnScroll.unobserve(entry.target);
                
                // If this is the stats section, animate numbers
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        animateOnScroll.observe(section);
    });
    
    // Observe tech items separately for progress bar animation
    techItems.forEach(item => {
        animateOnScroll.observe(item);
    });
    
    // Observe elements with reveal class
    const revealElements = document.querySelectorAll('.reveal, .service-card, .project-card, .news-card, .tech-item');
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        animateOnScroll.observe(el);
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    const circles = document.querySelectorAll('.circle');
    const digitalCode = document.querySelectorAll('.code-block');
    
    if (heroSection && (circles.length || digitalCode.length)) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX * speed) - (speed / 2);
                const y = (mouseY * speed) - (speed / 2);
                
                circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${1 + mouseY * 0.1})`;
            });
            
            digitalCode.forEach((code, index) => {
                const speed = (index + 1) * 5;
                const x = (mouseX * speed);
                const y = (mouseY * speed);
                
                code.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Add particles to tech-particles element
    const techParticles = document.querySelector('.tech-particles');
    if (techParticles) {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            techParticles.appendChild(particle);
        }
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value.trim()) {
                alert('メールアドレスを入力してください。');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }
            
            // In a real application, you would send this to a server
            alert('ニュースレターに登録しました！');
            this.reset();
        });
    }
    
    // Add typing effect to headline
    const headline = document.querySelector('.hero-content h1');
    
    if (headline) {
        // Save original text and empty the element
        const originalText = headline.innerHTML;
        headline.innerHTML = '';
        
        // Add cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        headline.parentNode.appendChild(cursor);
        
        // Type text character by character
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                headline.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    cursor.style.display = 'none';
                }, 1500);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Hero Carousel
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const slideContents = document.querySelectorAll('.carousel-slide-content');
        
        let currentSlide = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Start automatic slideshow
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        }
        
        // Stop slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        // Event listeners for controls
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        });
        
        // Indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showSlide(index);
                stopSlideshow();
                startSlideshow();
            });
        });
        
        // Touch events for mobile swipe
        heroCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            // Calculate swipe distance
            let swipeDistance = touchEndX - touchStartX;
            
            // Minimum swipe distance to trigger a slide change (adjust as needed)
            const minSwipeDistance = 50;
            
            if (swipeDistance > minSwipeDistance) {
                // Swiped right, go to previous slide
                prevSlide();
            } else if (swipeDistance < -minSwipeDistance) {
                // Swiped left, go to next slide
                nextSlide();
            }
            
            stopSlideshow();
            startSlideshow();
        }
        
        // Pause on hover
        slides.forEach(slide => {
            slide.addEventListener('mouseenter', stopSlideshow);
            slide.addEventListener('mouseleave', startSlideshow);
        });
        
        // Animate slide content on active
        function animateSlideContent() {
            // Watch for slide changes
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        const target = mutation.target;
                        if (target.classList.contains('active')) {
                            const content = target.querySelector('.carousel-slide-content');
                            if (content) {
                                content.style.animation = 'none';
                                setTimeout(() => {
                                    content.style.animation = 'fadeInRight 0.8s forwards';
                                }, 10);
                            }
                        }
                    }
                });
            });
            
            // Observe each slide for class changes
            slides.forEach(slide => {
                observer.observe(slide, { attributes: true });
            });
        }
        
        // Start the animations
        animateSlideContent();
        
        // Start the slideshow
        startSlideshow();
    }

    // Partner Carousel
    const partnersWrapper = document.querySelector('.partners-wrapper');
    const partnerSlides = document.querySelectorAll('.partner-slide');
    const prevBtn = document.querySelector('.control-prev');
    const nextBtn = document.querySelector('.control-next');
    
    if (partnersWrapper && partnerSlides.length > 0) {
        let slideIndex = 0;
        let slidesPerView = 1;
        let autoplayInterval;
        let slideWidth;
        
        // Adjust slides per view based on screen width
        function updateSlidesPerView() {
            if (window.innerWidth >= 1200) {
                slidesPerView = 3;
            } else if (window.innerWidth >= 992) {
                slidesPerView = 2;
            } else if (window.innerWidth >= 576) {
                slidesPerView = 1;
            } else {
                slidesPerView = 1;
            }
            
            // Calculate slide width
            const containerWidth = partnersWrapper.parentElement.clientWidth;
            slideWidth = containerWidth / slidesPerView;
            
            // Set slide width
            partnerSlides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });
            
            // Reset to valid position
            if (slideIndex > partnerSlides.length - slidesPerView) {
                slideIndex = partnerSlides.length - slidesPerView;
            }
            
            updateSlidePosition();
        }
        
        // Initial setup
        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        
        // Function to update slide position with smooth transition
        function updateSlidePosition() {
            partnersWrapper.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }
        
        // Next slide
        function nextSlide() {
            if (slideIndex >= partnerSlides.length - slidesPerView) {
                // Loop back to first slide with a smooth transition
                partnersWrapper.style.transition = 'none';
                slideIndex = 0;
                setTimeout(() => {
                    partnersWrapper.style.transition = 'transform 0.8s ease';
                    updateSlidePosition();
                }, 10);
            } else {
                partnersWrapper.style.transition = 'transform 0.8s ease';
                slideIndex++;
                updateSlidePosition();
            }
        }
        
        // Previous slide
        function prevSlide() {
            if (slideIndex <= 0) {
                // Loop to last slide with a smooth transition
                partnersWrapper.style.transition = 'none';
                slideIndex = partnerSlides.length - slidesPerView;
                setTimeout(() => {
                    partnersWrapper.style.transition = 'transform 0.8s ease';
                    updateSlidePosition();
                }, 10);
            } else {
                partnersWrapper.style.transition = 'transform 0.8s ease';
                slideIndex--;
                updateSlidePosition();
            }
        }
        
        // Set up button listeners if they exist
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
        
        // Touch events for mobile swipe
        let touchStart = 0;
        let touchEnd = 0;
        
        partnersWrapper.addEventListener('touchstart', function(e) {
            touchStart = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        
        partnersWrapper.addEventListener('touchend', function(e) {
            touchEnd = e.changedTouches[0].screenX;
            
            // Calculate swipe distance
            let swipeDistance = touchEnd - touchStart;
            
            // Minimum swipe distance (adjust as needed)
            const minSwipeDistance = 50;
            
            if (swipeDistance > minSwipeDistance) {
                // Swiped right, go to previous slide
                prevSlide();
            } else if (swipeDistance < -minSwipeDistance) {
                // Swiped left, go to next slide
                nextSlide();
            }
            
            startAutoplay();
        }, { passive: true });
        
        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay
        startAutoplay();
        
        // Pause on hover
        partnersWrapper.addEventListener('mouseenter', stopAutoplay);
        partnersWrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Tech Section Animations
    const techSectionEl = document.querySelector('.technology');
    const techItemsEl = document.querySelectorAll('.tech-item');
    const progressBarsEl = document.querySelectorAll('.tech-bar .progress');

    if (techItemsEl.length > 0) {
        // Set initial width for animation
        progressBarsEl.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            bar.dataset.targetWidth = targetWidth;
        });
        
        // Add fade-in and progress animation on scroll
        const animateTechSection = () => {
            if (isElementInViewport(techSectionEl)) {
                setTimeout(() => {
                    techItemsEl.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('revealed');
                            const progressBar = item.querySelector('.progress');
                            if (progressBar && progressBar.dataset.targetWidth) {
                                progressBar.style.width = progressBar.dataset.targetWidth;
                            }
                        }, index * 200); // Stagger animation by index
                    });
                }, 300);
                
                // Remove event listener once animation is triggered
                window.removeEventListener('scroll', animateTechSection);
            }
        };

        // Run on initial load and scroll
        animateTechSection();
        window.addEventListener('scroll', animateTechSection);
    }

    // Add China map background particles
    const techBackground = document.querySelector('.china-connection-lines');
    if (techBackground) {
        for (let i = 0; i < 15; i++) {
            createConnectionNode(techBackground);
        }
    }

    function createConnectionNode(container) {
        const node = document.createElement('div');
        node.className = 'connection-node';
        
        // Random positioning
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = 5 + Math.random() * 8;
        
        // Style the node
        node.style.left = `${posX}%`;
        node.style.top = `${posY}%`;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        
        // Animation timing
        const duration = 15 + Math.random() * 20;
        node.style.animation = `pulse ${duration}s infinite alternate`;
        
        // Add node to container
        container.appendChild(node);
    }

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});

// Add CSS for form validation 
const formStylesheet = document.createElement('style');
formStylesheet.textContent = `
    .feedback-message {
        font-size: 12px;
        margin-top: 4px;
        transition: all 0.3s ease;
    }
    
    .feedback-message.error {
        color: #e74c3c;
    }
    
    .feedback-message.success {
        color: #2ecc71;
    }
    
    .form-group input.invalid,
    .form-group select.invalid,
    .form-group textarea.invalid {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .form-group input.valid,
    .form-group select.valid,
    .form-group textarea.valid {
        border-color: #2ecc71;
        box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
    }
    
    .contact-form .spinner {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 5px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .contact-form button.success {
        background-color: #2ecc71;
    }
`;
document.head.appendChild(formStylesheet); 