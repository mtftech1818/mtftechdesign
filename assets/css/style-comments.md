# MTFTech 网站 CSS 样式注释指南

## 基础变量和通用样式

### CSS 变量定义
```css
:root {
    --primary-color: #0073e6;
    --secondary-color: #00c6ff;
    /* 其他颜色和基础变量 */
}
```

CSS 变量定义了网站的主要颜色方案、阴影效果、过渡动画时间和边框半径等基础样式值，使整个网站风格保持一致性，同时便于全局修改。

### 浏览器兼容性
```css
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}
```

这些规则确保在不同浏览器中元素尺寸计算一致，并防止移动设备上的文本自动调整大小，提高跨浏览器兼容性。

### 基础HTML元素样式
```css
body {
    font-family: var(--font-family);
    color: var(--text-color);
    line-height: 1.6;
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
}
```

设置基础HTML元素的默认样式，包括字体、颜色、行高和链接样式，建立网站的基础视觉基调。

## 无障碍支持

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    /* 其他属性 */
}

.skip-to-content {
    /* 跳过导航链接样式 */
}

a:focus, button:focus, input:focus {
    outline: 2px solid var(--primary-color);
}
```

这些样式提供了无障碍支持功能，包括屏幕阅读器专用类、跳过导航链接和清晰的焦点状态样式，确保网站对键盘导航和辅助技术用户友好。

## 头部和导航样式

### 头部区域
```css
header {
    position: fixed;
    width: 100%;
    z-index: 1000;
    /* 其他属性 */
}

header.scrolled {
    background-color: var(--white);
    box-shadow: var(--shadow);
}
```

头部使用固定定位，使导航栏始终可见。滚动时添加背景色和阴影效果，增强用户体验。

### 导航菜单
```css
nav ul {
    display: flex;
    list-style: none;
}

nav ul li a {
    /* 链接样式 */
}

nav ul li a::after {
    /* 悬停下划线效果 */
}
```

导航菜单使用Flexbox布局，链接包含悬停效果和下划线动画，增强交互体验。

### 下拉菜单
```css
.dropdown {
    position: relative;
}

.dropdown-content {
    position: absolute;
    display: none;
    /* 其他属性 */
}

.dropdown:hover .dropdown-content {
    display: block;
}
```

下拉菜单使用绝对定位和显示/隐藏机制，在悬停时显示子菜单，提供多级导航功能。

### 语言切换器
```css
.language-switcher {
    position: relative;
}

.lang-dropdown {
    /* 语言下拉菜单样式 */
}

.language-switcher:hover .lang-dropdown {
    display: block;
}
```

语言切换器允许用户在多种语言之间切换，使用与服务下拉菜单类似的机制实现。

## 英雄区域样式

```css
.hero {
    height: 100vh;
    background: linear-gradient(135deg, var(--dark-blue), var(--primary-color));
    /* 其他属性 */
}

.hero-content {
    /* 内容样式 */
}

.hero-carousel {
    /* 轮播样式 */
}
```

英雄区域占据整个视口高度，使用渐变背景创造深邃感，包含轮播组件展示核心服务和信息。

### 轮播控制
```css
.carousel-indicators {
    /* 指示器样式 */
}

.carousel-control {
    /* 控制按钮样式 */
}
```

轮播控制包括指示器和前后导航按钮，提供直观的用户交互控制。

## 服务卡片样式

```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
}

.service-card {
    background-color: var(--white);
    border-radius: var(--border-radius);
    /* 其他属性 */
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-hover);
}
```

服务卡片使用CSS Grid布局，创建均匀的四列网格。卡片包含悬停效果，提升交互体验。

## 技术展示区样式

```css
.technology {
    background-color: var(--light-blue);
    position: relative;
    overflow: hidden;
}

.tech-showcase {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

.tech-item {
    /* 技术项目样式 */
}
```

技术展示区使用网格布局展示技术能力，背景采用浅蓝色增加技术感，包含多种动画和装饰元素。

### 中国地图背景
```css
.china-map-bg {
    position: absolute;
    /* 其他属性 */
}

.connection-node {
    /* 连接节点样式 */
}
```

使用中国地图背景和连接节点创建技术连接的视觉效果，强调公司与中国市场的关联。

## 项目展示区域样式

```css
.project-filter {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
}

.filter-btn {
    /* 过滤按钮样式 */
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}
```

项目展示区包含过滤按钮和项目卡片网格，允许用户根据类别筛选项目，增强用户交互性。

## 联系表单样式

```css
.contact {
    position: relative;
    background-color: var(--light-blue);
    /* 其他属性 */
}

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
}

.contact-form {
    /* 表单样式 */
}
```

联系区域使用网格布局，左侧为联系信息，右侧为联系表单，背景使用装饰元素增加视觉吸引力。

### 表单元素
```css
.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    /* 其他属性 */
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 115, 230, 0.2);
}
```

表单元素包含统一的样式和焦点状态效果，提供清晰的视觉反馈。

## 页脚样式

```css
footer {
    background-color: var(--footer-bg);
    color: var(--white);
    position: relative;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    gap: 50px;
}
```

页脚使用深色背景和网格布局，包含公司信息、链接列表和订阅表单，体现专业形象。

### 合作伙伴轮播
```css
.partner-carousel {
    /* 轮播容器样式 */
}

.partner-slide {
    /* 幻灯片样式 */
}
```

合作伙伴轮播展示公司的合作伙伴，增强可信度和专业形象。

## 响应式设计样式

```css
@media (max-width: 1200px) {
    /* 大屏幕调整 */
}

@media (max-width: 992px) {
    /* 平板调整 */
}

@media (max-width: 768px) {
    /* 小平板调整 */
}

@media (max-width: 576px) {
    /* 手机调整 */
}
```

响应式设计使用媒体查询，确保网站在各种屏幕尺寸上都能提供良好的用户体验，包括布局、字体大小和间距的调整。

## 动画效果

```css
@keyframes fadeInRight {
    /* 从右侧淡入动画 */
}

@keyframes pulse {
    /* 脉冲动画 */
}

@keyframes progressAnimation {
    /* 进度条动画 */
}
```

关键帧动画用于创建各种动态效果，包括淡入、脉冲和进度条动画，增强页面的视觉吸引力和用户体验。

## 触摸设备优化

```css
.touch-device .dropdown > a::after {
    /* 触摸设备下拉箭头样式 */
}

.touch-device .dropdown.show-dropdown > a::after {
    /* 触摸设备激活状态 */
}
```

触摸设备优化样式提供更大的点击区域和清晰的视觉指示，确保在触摸屏上的良好用户体验。

## 打印样式

```css
@media print {
    /* 打印样式调整 */
}
```

打印样式优化页面打印输出，隐藏不必要的元素，调整布局和颜色，确保打印材料清晰可读。 