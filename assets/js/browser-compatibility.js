/**
 * 浏览器兼容性检测和回退方案
 * 此脚本检测浏览器功能支持情况并应用相应的回退解决方案
 * 确保网站在各种浏览器（包括旧版浏览器）上正常运行
 */

(function() {
    'use strict';

    // DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        checkBrowserCompatibility();
    });

    /**
     * 检查整体浏览器兼容性并应用必要的回退方案
     * 这是主检测函数，调用各种特定功能的检测方法
     */
    function checkBrowserCompatibility() {
        detectFlexboxSupport();       // 检测Flexbox支持
        detectGridSupport();          // 检测CSS Grid支持
        detectCSSVariablesSupport();  // 检测CSS变量支持
        detectPositionStickySupport(); // 检测粘性定位支持
        detectIntersectionObserverSupport(); // 检测交叉观察器API支持
        detectTouchSupport();         // 检测触摸支持
        detectPassiveEventSupport();  // 检测被动事件监听器支持
        
        // 记录兼容性信息到控制台
        console.info('浏览器兼容性检查完成');
    }

    /**
     * 检测Flexbox布局支持
     * Flexbox是现代CSS布局的核心功能，用于一维布局
     */
    function detectFlexboxSupport() {
        var flex = document.createElement('div');
        flex.style.display = 'flex';
        
        var isSupported = flex.style.display === 'flex';
        document.documentElement.classList.add(isSupported ? 'flexbox' : 'no-flexbox');
        
        if (!isSupported) {
            console.warn('Flexbox不受支持，应用回退方案');
            applyFlexboxFallbacks();
        }
    }

    /**
     * 为不支持flexbox的浏览器应用回退方案
     * 主要使用inline-block和浮动布局模拟flexbox效果
     */
    function applyFlexboxFallbacks() {
        // 为头部导航应用回退
        var nav = document.querySelector('nav ul');
        if (nav) {
            nav.style.display = 'block';
            var items = nav.querySelectorAll('li');
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'inline-block';
                items[i].style.marginRight = '15px';
            }
        }
        
        // 为其他flex容器添加简单的inline-block回退
        var flexContainers = document.querySelectorAll('.cta-buttons, .project-filter, .company-stats');
        for (var i = 0; i < flexContainers.length; i++) {
            var children = flexContainers[i].children;
            for (var j = 0; j < children.length; j++) {
                children[j].style.display = 'inline-block';
                children[j].style.marginRight = '15px';
                children[j].style.marginBottom = '15px';
            }
        }
    }

    /**
     * 检测CSS Grid布局支持
     * Grid是现代CSS布局的另一核心功能，用于二维布局
     */
    function detectGridSupport() {
        var grid = document.createElement('div');
        grid.style.display = 'grid';
        
        var isSupported = grid.style.display === 'grid';
        document.documentElement.classList.add(isSupported ? 'cssgrid' : 'no-cssgrid');
        
        if (!isSupported) {
            console.warn('CSS Grid不受支持，应用回退方案');
            applyGridFallbacks();
        }
    }

    /**
     * 为不支持CSS Grid的浏览器应用回退方案
     * 主要使用inline-block和百分比宽度模拟网格布局
     */
    function applyGridFallbacks() {
        // 为服务网格应用回退
        var servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.style.display = 'block';
            var cards = servicesGrid.querySelectorAll('.service-card');
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.display = 'inline-block';
                cards[i].style.width = 'calc(50% - 20px)';
                cards[i].style.marginRight = '20px';
                cards[i].style.marginBottom = '20px';
                cards[i].style.verticalAlign = 'top';
            }
        }
        
        // 为其他网格容器应用回退
        var gridContainers = document.querySelectorAll('.projects-grid, .news-grid');
        for (var i = 0; i < gridContainers.length; i++) {
            gridContainers[i].style.display = 'block';
            var items = gridContainers[i].children;
            for (var j = 0; j < items.length; j++) {
                items[j].style.display = 'inline-block';
                items[j].style.width = 'calc(33.333% - 20px)';
                items[j].style.marginRight = '20px';
                items[j].style.marginBottom = '20px';
                items[j].style.verticalAlign = 'top';
            }
        }
        
        // 为两列布局应用回退
        var twoColLayouts = document.querySelectorAll('.hero .container, .about .container, .contact-wrapper');
        for (var i = 0; i < twoColLayouts.length; i++) {
            var container = twoColLayouts[i];
            container.style.display = 'block';
            
            if (container.children.length >= 2) {
                container.children[0].style.display = 'inline-block';
                container.children[0].style.width = '48%';
                container.children[0].style.verticalAlign = 'top';
                container.children[1].style.display = 'inline-block';
                container.children[1].style.width = '48%';
                container.children[1].style.marginLeft = '4%';
                container.children[1].style.verticalAlign = 'top';
            }
        }
    }

    /**
     * 检测CSS变量（自定义属性）支持
     * CSS变量用于在样式表中存储和重用值
     */
    function detectCSSVariablesSupport() {
        var isSupported = window.CSS && window.CSS.supports && window.CSS.supports('--test', '0');
        document.documentElement.classList.add(isSupported ? 'cssvars' : 'no-cssvars');
        
        if (!isSupported) {
            console.warn('CSS变量不受支持，应用回退方案');
            applyCSSVarsFallbacks();
        }
    }

    /**
     * 为不支持CSS变量的浏览器应用回退方案
     * 直接应用硬编码的颜色和值
     */
    function applyCSSVarsFallbacks() {
        // 定义回退值
        var cssVarFallbacks = {
            '--primary-color': '#0073e6',
            '--secondary-color': '#00c6ff',
            '--text-color': '#333333',
            '--white': '#ffffff',
            '--shadow': '0 5px 15px rgba(0, 0, 0, 0.08)',
            '--transition': 'all 0.3s ease'
        };
        
        // 应用最关键的回退
        document.body.style.fontFamily = "'Roboto', 'Noto Sans JP', 'Noto Sans SC', sans-serif";
        document.body.style.color = '#333333';
        
        // 按钮样式回退
        var primaryButtons = document.querySelectorAll('.btn.primary');
        for (var i = 0; i < primaryButtons.length; i++) {
            primaryButtons[i].style.backgroundColor = '#0073e6';
            primaryButtons[i].style.color = '#ffffff';
        }
        
        // 服务卡片样式回退
        var serviceCards = document.querySelectorAll('.service-card');
        for (var i = 0; i < serviceCards.length; i++) {
            serviceCards[i].style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            serviceCards[i].style.transition = 'all 0.3s ease';
        }
    }

    /**
     * 检测position:sticky支持
     * 粘性定位用于元素在滚动时从相对定位切换到固定定位
     */
    function detectPositionStickySupport() {
        var sticky = document.createElement('div');
        sticky.style.position = 'sticky';
        
        var isSupported = sticky.style.position === 'sticky';
        document.documentElement.classList.add(isSupported ? 'csspositionsticky' : 'no-csspositionsticky');
        
        if (!isSupported) {
            console.warn('Position sticky不受支持，应用回退方案');
            applyStickyFallbacks();
        }
    }

    /**
     * 为不支持position:sticky的浏览器应用回退方案
     * 使用fixed定位和适当的内边距模拟粘性效果
     */
    function applyStickyFallbacks() {
        // 找到头部
        var header = document.querySelector('header');
        if (header) {
            // 移除任何粘性定位
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.width = '100%';
            header.style.zIndex = '1000';
            
            // 为body添加内边距，防止内容被固定头部遮挡
            document.body.style.paddingTop = header.offsetHeight + 'px';
            
            // 窗口大小调整时更新
            window.addEventListener('resize', function() {
                document.body.style.paddingTop = header.offsetHeight + 'px';
            });
        }
    }

    /**
     * 检测Intersection Observer API支持
     * 此API用于检测元素进入视口，用于滚动动画和懒加载
     */
    function detectIntersectionObserverSupport() {
        var isSupported = 'IntersectionObserver' in window;
        document.documentElement.classList.add(isSupported ? 'intersectionobserver' : 'no-intersectionobserver');
        
        if (!isSupported) {
            console.warn('IntersectionObserver不受支持，动画触发可能无法正常工作');
            applyIntersectionObserverFallbacks();
        }
    }

    /**
     * 为不支持IntersectionObserver的浏览器应用回退方案
     * 简单地使所有动画元素可见，不使用滚动触发
     */
    function applyIntersectionObserverFallbacks() {
        // 简化回退：直接使所有动画元素可见
        var animatedElements = document.querySelectorAll('.tech-bar .progress, .service-card, .tech-item, .project-card, .news-card');
        for (var i = 0; i < animatedElements.length; i++) {
            animatedElements[i].style.opacity = '1';
            animatedElements[i].style.transform = 'none';
        }
    }

    /**
     * 检测触摸支持
     * 用于优化触摸设备的用户界面
     */
    function detectTouchSupport() {
        var isSupported = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        document.documentElement.classList.add(isSupported ? 'touch' : 'no-touch');
        
        if (isSupported) {
            console.info('检测到触摸支持，增强触摸设备界面');
            enhanceTouchInterface();
        }
    }

    /**
     * 为触摸设备增强界面
     * 增加按钮尺寸和交互区域，提升触摸友好性
     */
    function enhanceTouchInterface() {
        // 增加按钮尺寸，提供更好的触摸目标
        var buttons = document.querySelectorAll('button, .btn, .carousel-control');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.minHeight = '44px';
            buttons[i].style.minWidth = '44px';
        }
        
        // 增加输入框高度，提升触摸交互性
        var inputs = document.querySelectorAll('input, select, textarea');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.minHeight = '44px';
            inputs[i].style.padding = '10px';
        }
    }

    /**
     * 检测被动事件监听器支持
     * 被动事件监听器用于提升滚动性能
     */
    function detectPassiveEventSupport() {
        var isSupported = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    isSupported = true;
                    return true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        
        document.documentElement.classList.add(isSupported ? 'passiveevents' : 'no-passiveevents');
        return isSupported;
    }
})(); 