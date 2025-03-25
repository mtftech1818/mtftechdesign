# MTFTech 网站 JavaScript 功能注释指南

## 核心初始化函数

### 文档就绪函数
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各种功能
});
```

该事件监听器确保DOM完全加载后再执行JavaScript代码，防止在页面元素尚未加载完成时尝试操作它们。

### 视口调整处理
```javascript
function handleViewportChange() {
    // 根据视口宽度调整功能
}

window.addEventListener('resize', handleViewportChange);
```

视口调整处理函数在窗口大小改变时执行，根据屏幕宽度启用或禁用某些功能，确保网站在各种设备上正常工作。

## 导航和菜单功能

### 菜单切换初始化
```javascript
function initMenuToggle() {
    // 移动端菜单切换逻辑
}
```

初始化移动设备上的汉堡菜单切换功能，管理导航菜单的显示和隐藏状态，提供更好的移动端用户体验。

### 下拉菜单处理
```javascript
function handleDropdownMenus() {
    // 处理下拉菜单的显示和隐藏
}
```

为移动设备上的下拉菜单添加点击事件，因为在触摸设备上无法使用悬停效果，确保触摸用户可以访问所有菜单项。

### 粘性导航处理
```javascript
function initStickyHeader() {
    // 滚动时导航栏样式变化
}
```

监听页面滚动事件，当页面滚动超过一定距离时，更改导航栏样式，使其更加明显和易于使用。

## 轮播功能

### 英雄区轮播初始化
```javascript
function initHeroCarousel() {
    // 初始化和控制英雄区轮播
}
```

初始化首页英雄区的轮播功能，包括自动轮播、幻灯片切换、触摸滑动支持和轮播指示器的管理。

### 合作伙伴轮播
```javascript
function initPartnerCarousel() {
    // 初始化和控制合作伙伴轮播
}
```

管理页脚区域的合作伙伴标志轮播，支持自动滚动、触摸滑动和导航控制，展示公司的合作伙伴。

### 轮播触摸事件处理
```javascript
function handleCarouselTouchEvents(carousel) {
    // 处理轮播的触摸滑动
}
```

为轮播组件添加触摸事件支持，允许用户在移动设备上通过滑动手势切换幻灯片，提升移动端用户体验。

## 动画和视觉效果

### 滚动动画初始化
```javascript
function initScrollAnimations() {
    // 初始化滚动显示动画
}
```

使用Intersection Observer API检测元素何时进入视口，并触发淡入和上移动画，创造渐进式内容展示效果。

### 计数动画
```javascript
function initCountAnimation() {
    // 数字计数动画效果
}
```

为统计数字添加递增计数动画，当用户滚动到数字区域时，数字从0递增到目标值，增强视觉吸引力。

### 技术进度条动画
```javascript
function animateTechBars() {
    // 技术技能进度条动画
}
```

为技术展示区的进度条添加动画效果，使进度条在视图中时从0%增长到指定百分比，视觉化展示技术能力。

## 表单处理

### 联系表单初始化
```javascript
function initContactForm() {
    // 表单验证和提交处理
}
```

初始化联系表单验证和提交功能，确保用户输入有效数据，防止表单提交错误，并处理表单提交后的反馈。

### 表单验证
```javascript
function validateForm(form) {
    // 验证表单输入
}
```

检查表单字段的有效性，包括必填字段、电子邮件格式和其他验证规则，提供即时反馈指示输入错误。

### 表单提交处理
```javascript
function handleFormSubmit(form, event) {
    // 处理表单提交和反馈
}
```

拦截表单提交事件，使用AJAX异步提交表单数据，显示加载状态，并处理成功或错误响应。

## 内容过滤和分类

### 项目过滤初始化
```javascript
function initProjectFilters() {
    // 初始化项目过滤器
}
```

为项目展示区添加分类过滤功能，允许用户根据项目类型筛选显示的项目，增强用户交互性。

### 过滤器点击处理
```javascript
function handleFilterClick(event) {
    // 处理过滤按钮点击
}
```

处理过滤按钮的点击事件，更新活动过滤器状态，并根据所选类别显示或隐藏项目卡片。

## 辅助功能

### 返回顶部按钮
```javascript
function initBackToTop() {
    // 初始化返回顶部按钮
}
```

添加返回顶部按钮功能，当用户滚动超过一定距离时显示按钮，点击后平滑滚动回页面顶部。

### 平滑滚动实现
```javascript
function initSmoothScroll() {
    // 初始化平滑滚动
}
```

为页内导航链接添加平滑滚动效果，点击导航链接时，页面平滑滚动到目标部分，而不是瞬时跳转。

### 预加载处理
```javascript
function handlePreloader() {
    // 处理页面预加载动画
}
```

管理页面加载期间的预加载动画，在页面内容完全加载后隐藏预加载器，提供更流畅的页面加载体验。

## 浏览器和设备检测

### 设备类型检测
```javascript
function detectDeviceType() {
    // 检测设备类型并添加相应的类
}
```

检测用户使用的设备类型（桌面、平板、移动设备），并向HTML元素添加相应的类，允许针对不同设备类型应用特定样式。

### 浏览器特性检测
```javascript
function detectBrowserFeatures() {
    // 检测浏览器支持的特性
}
```

检测浏览器是否支持现代Web特性，如Flexbox、Grid、CSS变量等，并添加相应的类，为不支持的功能提供回退方案。

## 性能优化

### 延迟加载实现
```javascript
function initLazyLoading() {
    // 初始化图片延迟加载
}
```

实现图片和其他资源的延迟加载，仅在元素即将进入视口时才加载，减少初始页面加载时间和带宽使用。

### 防抖动功能
```javascript
function debounce(func, wait) {
    // 防抖动函数实现
}
```

提供防抖动功能，确保在快速连续调用的情况下（如窗口调整大小或滚动事件）函数仅在事件停止后执行一次，提高性能。 