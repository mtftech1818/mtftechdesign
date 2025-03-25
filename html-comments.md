# MTFTech 网站 HTML 结构注释指南

## 文档基础结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 元数据设置 -->
    <!-- 样式和脚本引用 -->
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

## 头部区域 (Header)

```html
<header id="header" class="sticky-header">
    <!-- 导航菜单和标志 -->
</header>
```

头部区域包含了网站的导航栏和MTFTech的标志。该部分使用了`sticky-header`类，使导航栏在滚动时粘贴在页面顶部。

## 导航栏 (Navigation)

```html
<nav class="main-nav">
    <!-- 网站导航链接和下拉菜单 -->
</nav>
```

导航栏包含主要的导航链接，服务下拉菜单和语言选择器。导航菜单在移动设备上会变为汉堡菜单。

### 下拉菜单结构

```html
<div class="dropdown">
    <span>服务 <i class="fas fa-chevron-down"></i></span>
    <div class="dropdown-content">
        <!-- 服务链接列表 -->
    </div>
</div>
```

下拉菜单使用`dropdown`和`dropdown-content`类来实现悬停显示菜单项的功能。

### 语言选择器

```html
<div class="language-selector">
    <!-- 语言选项 -->
</div>
```

允许用户在英语，中文和日语之间切换，使用国旗图标来表示不同语言。

## 英雄区域 (Hero Section)

```html
<section id="hero" class="hero-section">
    <div class="hero-carousel">
        <!-- 轮播内容 -->
    </div>
</section>
```

英雄区域是网站的主要焦点，使用轮播来展示MTFTech的核心服务。每个轮播幻灯片包含相关的标题和描述内容。

### 轮播结构

```html
<div class="carousel-slide">
    <div class="carousel-slide-content">
        <!-- 轮播幻灯片内容 -->
    </div>
</div>
```

轮播幻灯片使用`fadeInRight`动画效果使内容从右侧淡入，增强用户体验。

## 服务区域 (Services)

```html
<section id="services" class="section services-section">
    <div class="container">
        <div class="services-grid">
            <!-- 服务卡片 -->
        </div>
    </div>
</section>
```

服务区域使用网格布局展示MTFTech提供的各种服务。每个服务卡片包含图标、标题和简短描述。

### 服务卡片结构

```html
<div class="service-card">
    <div class="service-icon">
        <!-- 服务图标 -->
    </div>
    <h3>服务标题</h3>
    <p>服务描述</p>
    <a href="#contact" class="btn-learn-more">了解更多</a>
</div>
```

服务卡片使用`service-card`类设置样式，包含图标、标题、简短描述和"了解更多"按钮。

## 团队区域 (Team)

```html
<section id="team" class="section team-section">
    <!-- 团队成员信息 -->
</section>
```

展示公司团队成员的区域，包含团队成员的照片、姓名、职位和简介。

## 项目案例 (Projects)

```html
<section id="projects" class="section projects-section">
    <!-- 项目筛选和展示 -->
</section>
```

项目案例区域展示MTFTech的过往项目。包含项目分类按钮和项目卡片网格。

### 项目筛选结构

```html
<div class="project-filters">
    <!-- 筛选按钮 -->
</div>
```

允许用户根据项目类型筛选显示的项目，使用数据属性实现筛选功能。

### 项目卡片结构

```html
<div class="project-grid">
    <div class="project-item" data-category="类别">
        <!-- 项目内容 -->
    </div>
</div>
```

每个项目卡片包含项目图片、标题和类别信息，使用`data-category`属性用于筛选功能。

## 联系我们 (Contact)

```html
<section id="contact" class="section contact-section">
    <!-- 联系表单和信息 -->
</section>
```

联系区域包含一个联系表单和公司联系信息，方便潜在客户与MTFTech取得联系。

### 联系表单结构

```html
<form id="contact-form" class="contact-form">
    <!-- 表单字段 -->
</form>
```

联系表单包含姓名、邮箱、主题和消息字段，并使用JavaScript进行表单验证。

### 联系信息结构

```html
<div class="contact-info">
    <!-- 联系方式和社交媒体链接 -->
</div>
```

显示MTFTech的联系方式，包括地址、电话、邮箱和社交媒体链接。

## 页脚 (Footer)

```html
<footer id="footer" class="footer">
    <!-- 页脚内容 -->
</footer>
```

页脚区域包含公司信息、服务链接、订阅表单和合作伙伴轮播。

### 合作伙伴轮播结构

```html
<div class="partner-carousel">
    <!-- 合作伙伴轮播内容 -->
</div>
```

展示MTFTech的合作伙伴标志，使用轮播效果自动切换显示。

### 版权信息

```html
<div class="footer-bottom">
    <!-- 版权信息和备案号 -->
</div>
```

显示版权信息和必要的法律声明，如备案号等。

## 辅助元素

### 返回顶部按钮

```html
<button id="back-to-top" class="back-to-top">
    <i class="fas fa-arrow-up"></i>
</button>
```

允许用户快速返回页面顶部的按钮，在滚动到一定距离时显示。

### 预加载器

```html
<div id="preloader">
    <!-- 预加载动画 -->
</div>
```

在页面完全加载之前显示的加载动画，提升用户体验。 