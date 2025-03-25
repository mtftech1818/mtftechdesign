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

// DOM加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，初始化轮播图...');
    
    // 初始化主要功能
    initHeroCarousel();
    initSmoothScroll();
    
    // 直接绑定轮播图导航按钮
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    if(prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            const carousel = window.heroCarousel;
            if(carousel) {
                carousel.prevSlide();
            }
        };
    }
    
    if(nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            const carousel = window.heroCarousel;
            if(carousel) {
                carousel.nextSlide();
            }
        };
    }
    
    // 绑定指示器
    const indicators = document.querySelectorAll('.hero-indicators .indicator');
    indicators.forEach((indicator, index) => {
        indicator.onclick = function(e) {
            e.preventDefault();
            const carousel = window.heroCarousel;
            if(carousel) {
                carousel.showSlide(index);
            }
        };
    });
    
    document.body.classList.add('dom-loaded');
    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);
    
    // 初始化各种UI交互功能
    initMenuToggle();
    initLanguageSwitcher();
    initParallaxEffect();
    initServiceCardsAnimation();
    initCountAnimation();
    initProjectFilters();
    initProjectModals();
    initTestimonialSlider();
    initContactForm();
    initScrollToTop();
    initAIChatbot();
    initBookingForm();
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

/**
 * FAQ功能实现
 * 处理FAQ项的点击交互，展开和收起答案内容
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 切换当前项的激活状态
            const isActive = item.classList.contains('active');
            
            // 如果需要一次只展开一个FAQ（手风琴效果），取消注释以下代码
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });
            
            if (isActive) {
                item.classList.remove('active');
                const icon = item.querySelector('.toggle-icon i');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                item.classList.add('active');
                const icon = item.querySelector('.toggle-icon i');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
}

// AI チャットボット初期化
function initAIChatbot() {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatTrigger || !chatBox) return;
    
    // チャットボットの状態管理
    const chatbotState = {
        conversationHistory: [],
        context: '',
        isFirstInteraction: true,
        commonQuestions: [
            '中国市場進出について相談したい',
            'ECサイト開発のサービス内容は？',
            'IT技術開発の料金について',
            '中国でのプロモーション方法は？'
        ]
    };
    
    // チャットボットを表示する
    chatTrigger.addEventListener('click', () => {
        chatBox.classList.add('active');
        // 入力フィールドにフォーカス
        setTimeout(() => chatInput.focus(), 300);
        
        // 初回表示時のみサジェスト表示
        if (chatbotState.isFirstInteraction) {
            showSuggestions();
            chatbotState.isFirstInteraction = false;
        }
    });
    
    // チャットボットを閉じる
    chatClose.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });
    
    // メッセージ送信（Enterキー）
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // メッセージ送信（送信ボタン）
    chatSend.addEventListener('click', sendMessage);
    
    // ページ内のAIチャットトリガー
    const aiChatTriggers = document.querySelectorAll('.ai-chat-trigger');
    aiChatTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            chatBox.classList.add('active');
            setTimeout(() => chatInput.focus(), 300);
            
            // 初回表示時のみサジェスト表示
            if (chatbotState.isFirstInteraction) {
                showSuggestions();
                chatbotState.isFirstInteraction = false;
            }
        });
    });
    
    // サジェスト質問を表示する関数
    function showSuggestions() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chat-suggestions';
        
        const suggestionTitle = document.createElement('div');
        suggestionTitle.className = 'suggestion-title';
        suggestionTitle.textContent = 'よく聞かれる質問:';
        suggestionsDiv.appendChild(suggestionTitle);
        
        const suggestionBtns = document.createElement('div');
        suggestionBtns.className = 'suggestion-buttons';
        
        chatbotState.commonQuestions.forEach(question => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.textContent = question;
            btn.addEventListener('click', () => {
                chatInput.value = question;
                sendMessage();
                suggestionsDiv.remove();
            });
            suggestionBtns.appendChild(btn);
        });
        
        suggestionsDiv.appendChild(suggestionBtns);
        chatMessages.appendChild(suggestionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // メッセージ送信処理
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // ユーザーメッセージを表示
        addMessage(message, 'user');
        chatInput.value = '';
        
        // 会話履歴に追加
        chatbotState.conversationHistory.push({ role: 'user', content: message });
        
        // 入力中アニメーション表示
        showTypingIndicator();
        
        // AIの返答（会話内容に基づいてレスポンスを生成）
        setTimeout(() => {
            removeTypingIndicator();
            
            // サジェスト質問は削除
            const suggestions = document.querySelector('.chat-suggestions');
            if (suggestions) {
                suggestions.remove();
            }
            
            // メッセージに基づいた応答を生成
            const response = generateResponse(message);
            addMessage(response.message, 'bot');
            
            // 会話履歴に追加
            chatbotState.conversationHistory.push({ role: 'bot', content: response.message });
            chatbotState.context = response.context;
            
            // フォローアップのサジェストを表示（必要に応じて）
            if (response.suggestions && response.suggestions.length > 0) {
                setTimeout(() => {
                    showFollowUpSuggestions(response.suggestions);
                }, 500);
            }
            
            // スクロールを最下部に
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
    
    // フォローアップのサジェストを表示
    function showFollowUpSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chat-suggestions follow-up';
        
        const suggestionBtns = document.createElement('div');
        suggestionBtns.className = 'suggestion-buttons';
        
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => {
                chatInput.value = suggestion;
                sendMessage();
                suggestionsDiv.remove();
            });
            suggestionBtns.appendChild(btn);
        });
        
        suggestionsDiv.appendChild(suggestionBtns);
        chatMessages.appendChild(suggestionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // メッセージを追加する関数
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageContent.innerHTML = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // スクロールを最下部に
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 入力中インジケータを表示
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message typing-indicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'bot-message';
        typingContent.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        typingDiv.appendChild(typingContent);
        chatMessages.appendChild(typingDiv);
        
        // スクロールを最下部に
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 入力中インジケータを削除
    function removeTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            chatMessages.removeChild(typingIndicator);
        }
    }
    
    // メッセージに基づいて応答を生成する関数
    function generateResponse(message) {
        // キーワードベースの単純なマッチング
        const lowerMsg = message.toLowerCase();
        
        // 中国市場進出に関する質問
        if (lowerMsg.includes('中国') && (lowerMsg.includes('市場') || lowerMsg.includes('進出'))) {
            return {
                message: `中国市場進出には様々なステップがあります：<br>
                1. 市場調査とビジネスプラン<br>
                2. 法的要件と規制対応<br>
                3. パートナーシップと現地ネットワークの構築<br>
                4. デジタルマーケティング戦略<br><br>
                弊社のコンサルタントが詳細なご相談に対応いたします。<a href='services/market-entry.html' class='bot-link'>中国市場進出サービスの詳細を見る</a>`,
                context: 'china_market_entry',
                suggestions: ['具体的な成功事例を教えてください', '必要な準備は何ですか？', 'サービス料金について知りたい']
            };
        }
        
        // EC開発に関する質問
        if ((lowerMsg.includes('ec') || lowerMsg.includes('イーコマース') || lowerMsg.includes('通販')) && 
            (lowerMsg.includes('サイト') || lowerMsg.includes('開発') || lowerMsg.includes('構築'))) {
            return {
                message: `ECサイト開発・代行運営サービスでは以下をご提供しています：<br>
                ・日本向けおよび中国向けECプラットフォーム構築<br>
                ・越境ECソリューション<br>
                ・在庫管理システム連携<br>
                ・決済システム導入<br>
                ・多言語対応<br><br>
                <a href='services/ec-dev.html' class='bot-link'>ECサイト開発サービスの詳細はこちら</a>`,
                context: 'ec_development',
                suggestions: ['越境ECで販売するには？', '中国のECプラットフォームは？', '開発期間はどのくらいですか？']
            };
        }
        
        // 料金・費用に関する質問
        if (lowerMsg.includes('料金') || lowerMsg.includes('費用') || lowerMsg.includes('価格')) {
            return {
                message: `各サービスの料金はプロジェクトの規模や要件によって異なります。<br>
                個別のお見積りをご用意しておりますので、具体的なプロジェクト内容を<a href='contact.html' class='bot-link'>お問い合わせフォーム</a>からご連絡いただくか、オンライン相談をご予約ください。<br><br>
                初回相談は無料で承っておりますので、お気軽にご連絡ください。`,
                context: 'pricing',
                suggestions: ['オンライン相談を予約したい', 'プロジェクトの相場を知りたい']
            };
        }
        
        // プロモーション・マーケティングに関する質問
        if (lowerMsg.includes('プロモーション') || lowerMsg.includes('マーケティング') || lowerMsg.includes('広告')) {
            return {
                message: `中国市場でのプロモーション戦略には以下が含まれます：<br>
                ・WeChat/Weiboなどのソーシャルメディアマーケティング<br>
                ・インフルエンサー（KOL）マーケティング<br>
                ・Baidu SEO/SEM対策<br>
                ・動画プラットフォーム活用（DouYin/Bilibili等）<br>
                ・オンラインイベント開催<br><br>
                中国独自のデジタル環境に精通したマーケティングチームがサポートします。`,
                context: 'marketing',
                suggestions: ['中国のSNS対策について', 'KOLマーケティングとは？', '効果測定はどうするの？']
            };
        }
        
        // IoTについての質問
        if (lowerMsg.includes('iot') || lowerMsg.includes('センサー') || lowerMsg.includes('スマートデバイス')) {
            return {
                message: `IoTソリューションでは、センサーデバイスからクラウドプラットフォーム、データ分析まで一貫したサービスを提供しています。<br><br>
                産業用IoT、スマートホーム、ヘルスケアIoTなど、様々な分野での実績があります。<br>
                <a href='services/iot.html' class='bot-link'>IoTソリューションの詳細を見る</a>`,
                context: 'iot',
                suggestions: ['中国でのIoT規制は？', '開発実績を知りたい']
            };
        }
        
        // AI開発に関する質問
        if (lowerMsg.includes('ai') || lowerMsg.includes('人工知能') || lowerMsg.includes('機械学習')) {
            return {
                message: `AI人工知能ツール開発では、以下のようなソリューションを提供しています：<br>
                ・自然言語処理（NLP）システム<br>
                ・画像認識・分析システム<br>
                ・予測分析モデル<br>
                ・チャットボット/音声アシスタント<br>
                ・レコメンデーションエンジン<br><br>
                お客様のビジネスニーズに合わせたカスタムAIソリューションを開発します。<br>
                <a href='services/ai.html' class='bot-link'>AI開発サービスの詳細はこちら</a>`,
                context: 'ai_development',
                suggestions: ['具体的な活用例を教えて', '開発期間はどのくらい？']
            };
        }
        
        // コンテキストに基づくフォローアップ応答
        if (chatbotState.context === 'china_market_entry') {
            if (lowerMsg.includes('成功事例') || lowerMsg.includes('実績')) {
                return {
                    message: `弊社の中国市場進出支援の成功事例をいくつかご紹介します：<br>
                    ・日本の化粧品ブランドの中国市場参入と販売チャネル構築（6ヶ月で目標売上の130%達成）<br>
                    ・食品メーカーの中国向けEC販売立ち上げ（年間売上450%増加）<br>
                    ・アパレルブランドのソーシャルメディアマーケティング戦略（フォロワー数3ヶ月で10万人突破）<br><br>
                    詳細な事例はご相談時にご紹介可能です。`,
                    context: 'china_market_entry_cases'
                };
            }
            
            if (lowerMsg.includes('準備') || lowerMsg.includes('必要')) {
                return {
                    message: `中国市場進出のための準備として以下が重要です：<br>
                    1. 中国向け製品/サービスの適応（現地ニーズ・規制対応）<br>
                    2. 知的財産権の保護（商標登録等）<br>
                    3. 法的要件の確認（許認可・証明書等）<br>
                    4. パートナー選定と契約準備<br>
                    5. 中国語コンテンツの準備<br>
                    6. 決済システムの整備<br><br>
                    弊社では進出準備チェックリストをご用意しております。お気軽にご相談ください。`,
                    context: 'china_market_preparation'
                };
            }
        }
        
        // コンテキストがec_developmentの場合のフォローアップ
        if (chatbotState.context === 'ec_development') {
            if (lowerMsg.includes('越境') || lowerMsg.includes('海外')) {
                return {
                    message: `越境ECで販売するためには：<br>
                    1. 適切なプラットフォーム選択（Tmall Global、JD Worldwide、WeChat Mini-Programなど）<br>
                    2. 越境物流対応（保税区活用、国際配送等）<br>
                    3. 多通貨決済システム導入<br>
                    4. 現地規制・税関対応<br>
                    5. 多言語カスタマーサポート<br><br>
                    弊社では越境EC戦略立案から運用までトータルサポートを提供しています。`,
                    context: 'cross_border_ec'
                };
            }
            
            if (lowerMsg.includes('プラットフォーム') || lowerMsg.includes('モール')) {
                return {
                    message: `中国の主要ECプラットフォームには以下があります：<br>
                    ・Tmall/Taobao（最大手のプラットフォーム）<br>
                    ・JD.com（家電・デジタル製品に強み）<br>
                    ・Pinduoduo（ソーシャルEコマース）<br>
                    ・WeChat Mini-Program（ソーシャルプラットフォーム連携）<br>
                    ・RED/Xiaohongshu（SNS+ECハイブリッド）<br>
                    ・Douyin EC（短尺動画連携EC）<br><br>
                    目的や商品カテゴリによって最適なプラットフォームは異なります。弊社ではご相談に基づき最適な選択をご提案いたします。`,
                    context: 'china_ec_platforms'
                };
            }
        }
        
        // 一般的な問い合わせ
        if (lowerMsg.includes('問い合わせ') || lowerMsg.includes('連絡') || lowerMsg.includes('相談')) {
            return {
                message: `お問い合わせは以下の方法で承っております：<br>
                1. <a href='contact.html' class='bot-link'>お問い合わせフォーム</a>からのご連絡<br>
                2. お電話：03-1234-5678（平日9:00-18:00）<br>
                3. メール：info@mtftech.co.jp<br>
                4. オンライン相談予約（Zoom, Teams等）<br><br>
                初回相談は無料で承っておりますので、お気軽にご連絡ください。`,
                context: 'contact',
                suggestions: ['オンライン相談を予約したい', 'どんなことを相談できますか？']
            };
        }
        
        // 会社情報に関する質問
        if (lowerMsg.includes('会社') || lowerMsg.includes('企業') || lowerMsg.includes('mtftech')) {
            return {
                message: `MTFTech株式会社は、日本と中国を結ぶテクノロジーパートナーとして2015年に設立されました。<br><br>
                【会社概要】<br>
                ・従業員数：50名以上（中国語・日本語バイリンガルスタッフ多数）<br>
                ・拠点：東京（本社）、上海、深セン<br>
                ・強み：日中間のビジネス・IT開発の豊富な実績、現地ネットワーク<br><br>
                <a href='index.html#about' class='bot-link'>会社情報の詳細はこちら</a>`,
                context: 'company_info',
                suggestions: ['実績について教えてください', 'どんな企業と取引がありますか？']
            };
        }
        
        // 上記のいずれにも当てはまらない場合のデフォルト応答
        const defaultResponses = [
            `ご質問ありがとうございます。より詳しい情報をお伝えするため、<a href='contact.html' class='bot-link'>お問い合わせフォーム</a>からご連絡いただくか、03-1234-5678までお電話ください。専門スタッフが丁寧に対応いたします。`,
            `中国市場進出やIT開発に関する詳細は、<a href='services.html' class='bot-link'>サービス一覧ページ</a>をご覧ください。また、オンライン相談も承っておりますので、お気軽にご予約ください。`,
            `ご質問の内容について、もう少し詳しくお聞かせいただけますか？例えば、具体的なプロジェクトについてや、お探しの情報などをお教えいただけると、より的確にご案内できます。`,
            `申し訳ございません、ご質問の詳細な回答には専門スタッフの対応が必要かもしれません。<a href='contact.html' class='bot-link'>お問い合わせ</a>いただくか、オンライン相談をご予約いただけますでしょうか？`
        ];
        
        return {
            message: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
            context: 'general',
            suggestions: ['中国市場進出について知りたい', 'サービス内容を教えてください', 'お問い合わせ方法は？']
        };
    }
}

/**
 * オンライン予約フォーム処理
 * 日付選択、フォーム送信、バリデーション
 */
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const dateInputs = document.querySelectorAll('.date-picker');
    
    // 現在の日付を取得して日付入力の最小値に設定
    if (dateInputs.length > 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        
        dateInputs.forEach(input => {
            input.setAttribute('min', formattedToday);
            
            // 週末（土日）を選択不可に
            input.addEventListener('input', function() {
                const selectedDate = new Date(this.value);
                const day = selectedDate.getDay();
                
                // 0 = 日曜日, 6 = 土曜日
                if (day === 0 || day === 6) {
                    alert('週末は予約を受け付けておりません。平日を選択してください。');
                    this.value = '';
                }
            });
        });
    }
    
    // 日付の選択時に対応する時間帯のオプションを更新
    const date1Input = document.getElementById('booking-date1');
    const date2Input = document.getElementById('booking-date2');
    const time1Select = document.getElementById('booking-time1');
    const time2Select = document.getElementById('booking-time2');
    
    // 時間帯の選択肢を更新する関数
    function updateTimeOptions(dateInput, timeSelect) {
        if (!dateInput || !timeSelect) return;
        
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            
            // 曜日によって利用可能な時間帯を変更
            // 例: 月曜と水曜は午前中のみ、火曜と木曜は午後のみなど
            timeSelect.innerHTML = ''; // 既存のオプションをクリア
            
            // デフォルトのオプション
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '選択してください';
            timeSelect.appendChild(defaultOption);
            
            // 曜日別の利用可能時間
            let availableTimes;
            switch (day) {
                case 1: // 月曜
                    availableTimes = [
                        { value: '10:00', text: '10:00 - 11:00' },
                        { value: '11:00', text: '11:00 - 12:00' },
                        { value: '14:00', text: '14:00 - 15:00' }
                    ];
                    break;
                case 2: // 火曜
                    availableTimes = [
                        { value: '13:00', text: '13:00 - 14:00' },
                        { value: '15:00', text: '15:00 - 16:00' },
                        { value: '16:00', text: '16:00 - 17:00' }
                    ];
                    break;
                case 3: // 水曜
                    availableTimes = [
                        { value: '10:00', text: '10:00 - 11:00' },
                        { value: '15:00', text: '15:00 - 16:00' }
                    ];
                    break;
                case 4: // 木曜
                    availableTimes = [
                        { value: '13:00', text: '13:00 - 14:00' },
                        { value: '14:00', text: '14:00 - 15:00' },
                        { value: '16:00', text: '16:00 - 17:00' }
                    ];
                    break;
                case 5: // 金曜
                    availableTimes = [
                        { value: '10:00', text: '10:00 - 11:00' },
                        { value: '11:00', text: '11:00 - 12:00' },
                        { value: '15:00', text: '15:00 - 16:00' }
                    ];
                    break;
                default:
                    availableTimes = [];
            }
            
            // 時間オプションを追加
            availableTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time.value;
                option.textContent = time.text;
                timeSelect.appendChild(option);
            });
        });
    }
    
    // 日付フィールドの変更イベントを設定
    if (date1Input && time1Select) {
        updateTimeOptions(date1Input, time1Select);
    }
    
    if (date2Input && time2Select) {
        updateTimeOptions(date2Input, time2Select);
    }
    
    // フォーム送信時の処理
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易バリデーション
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('invalid');
                } else {
                    field.classList.remove('invalid');
                    field.classList.add('valid');
                }
            });
            
            // 日付が同じで時間も同じ場合はエラー
            if (date1Input.value && date2Input.value && time1Select.value && time2Select.value) {
                if (date1Input.value === date2Input.value && time1Select.value === time2Select.value) {
                    alert('第一希望と第二希望が同じ日時になっています。異なる日時を選択してください。');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // 送信ボタンにローディング表示
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('.btn-icon');
                
                const originalText = btnText.textContent;
                const originalIcon = btnIcon.innerHTML;
                
                btnText.textContent = '送信中...';
                btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                // 通常はここでAjaxを使用してサーバーに送信
                // ここではデモとして成功を模擬
                setTimeout(() => {
                    // 送信成功時
                    btnText.textContent = '予約を受け付けました';
                    btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                    submitBtn.classList.add('success');
                    
                    // 成功メッセージを表示
                    const successMessage = document.createElement('div');
                    successMessage.className = 'booking-success';
                    successMessage.innerHTML = `
                        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                        <h3>ご予約ありがとうございます</h3>
                        <p>ご予約内容を確認メールでお送りいたしました。担当者より改めてご連絡いたします。</p>
                        <p class="booking-details">
                            <strong>予約内容:</strong><br>
                            日時: ${date1Input.value} ${time1Select.options[time1Select.selectedIndex].text}<br>
                            相談内容: ${document.getElementById('booking-topic').options[document.getElementById('booking-topic').selectedIndex].text}<br>
                            ツール: ${document.getElementById('booking-tool').options[document.getElementById('booking-tool').selectedIndex].text}
                        </p>
                    `;
                    
                    // フォームを非表示にして成功メッセージを表示
                    bookingForm.style.display = 'none';
                    bookingForm.parentNode.insertBefore(successMessage, bookingForm.nextSibling);
                    
                    // 利用可能時間の表示も非表示に
                    const availableTimes = document.querySelector('.available-times');
                    if (availableTimes) {
                        availableTimes.style.display = 'none';
                    }
                    
                    // ページ上部へスクロール
                    window.scrollTo({
                        top: successMessage.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 2000);
            }
        });
    }
    
    // 予約トリガーのクリックイベント
    const bookTrigger = document.querySelector('.book-trigger');
    if (bookTrigger) {
        bookTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// 平滑滚动功能
function initSmoothScroll() {
    // 获取所有导航链接和按钮
    const links = document.querySelectorAll('.hero-buttons a, .nav-link');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            // 只处理内部锚点链接
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // 获取目标元素ID并查找元素
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 计算目标位置并平滑滚动
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: offsetTop - 100, // 减去导航栏高度
                        behavior: 'smooth'
                    });
                    
                    // 如果在移动设备上，点击后关闭菜单
                    const mobileMenu = document.querySelector('nav');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.menu-toggle').classList.remove('active');
                    }
                }
            }
        });
    }
}

// 轮播图功能
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) {
        console.warn('没有找到轮播图幻灯片!');
        return;
    }
    
    console.log('初始化轮播图，找到幻灯片数量:', slides.length);
    
    // 创建轮播图控制对象
    const carousel = {
        currentSlide: 0,
        slides: slides,
        indicators: document.querySelectorAll('.indicator'),
        autoplayInterval: null,
        autoplayDelay: 6000, // 6秒自动切换一次
        
        // 显示指定索引的幻灯片
        showSlide: function(index) {
            console.log('显示幻灯片:', index);
            
            // 确保索引在有效范围内
            if (index < 0) index = this.slides.length - 1;
            if (index >= this.slides.length) index = 0;
            
            // 隐藏所有幻灯片
            this.slides.forEach(slide => {
                slide.classList.remove('active');
                
                // 重置动画元素
                const animatedElements = slide.querySelectorAll('.animate-fadeInRight');
                animatedElements.forEach(el => {
                    el.style.opacity = 0;
                });
            });
            
            // 更新指示器状态
            this.indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // 显示当前幻灯片
            this.slides[index].classList.add('active');
            
            // 触发动画
            const currentAnimatedElements = this.slides[index].querySelectorAll('.animate-fadeInRight');
            currentAnimatedElements.forEach(el => {
                // 重置动画
                el.style.animation = 'none';
                el.offsetHeight; // 触发重排
                el.style.animation = null;
                
                // 设置延迟
                if (el.classList.contains('animation-delay-200')) {
                    setTimeout(() => { el.style.opacity = 1; }, 200);
                } else if (el.classList.contains('animation-delay-400')) {
                    setTimeout(() => { el.style.opacity = 1; }, 400);
                } else {
                    el.style.opacity = 1;
                }
            });
            
            this.currentSlide = index;
        },
        
        // 显示下一张幻灯片
        nextSlide: function() {
            this.showSlide(this.currentSlide + 1);
            this.startAutoplay();
        },
        
        // 显示上一张幻灯片
        prevSlide: function() {
            this.showSlide(this.currentSlide - 1);
            this.startAutoplay();
        },
        
        // 开始自动播放
        startAutoplay: function() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        },
        
        // 停止自动播放
        stopAutoplay: function() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        },
        
        // 初始化轮播图
        init: function() {
            // 初始化显示第一张幻灯片
            this.showSlide(0);
            this.startAutoplay();
            
            // 悬停暂停
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => this.stopAutoplay());
                heroSection.addEventListener('mouseleave', () => this.startAutoplay());
            }
            
            // 触摸滑动支持
            let touchStartX = 0;
            let touchEndX = 0;
            
            if (heroSection) {
                heroSection.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    this.stopAutoplay();
                }, {passive: true});
                
                heroSection.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const swipeThreshold = 50; // 滑动阈值
                    
                    if (touchEndX - touchStartX > swipeThreshold) {
                        // 右滑，显示上一张
                        this.prevSlide();
                    } else if (touchStartX - touchEndX > swipeThreshold) {
                        // 左滑，显示下一张
                        this.nextSlide();
                    } else {
                        this.startAutoplay();
                    }
                }, {passive: true});
            }
            
            // 键盘导航
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });
            
            console.log('轮播图初始化完成');
        }
    };
    
    // 初始化轮播图
    carousel.init();
    
    // 将轮播对象暴露给全局，便于按钮访问
    window.heroCarousel = carousel;
} 