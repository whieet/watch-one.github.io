// 动态布局脚本：用于渲染公共的 Header 和 Footer
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    highlightActiveNav();
});

function getPathPrefix() {
    // 简单判断：如果在 articles 目录下，返回 ../，否则返回 ./
    // 这里通过检查当前 URL 是否包含 /articles/ 来判断
    return window.location.pathname.includes('/articles/') ? '../' : '';
}

function renderHeader() {
    const prefix = getPathPrefix();
    // 修正首页锚点链接：如果在子页面，锚点链接需要指向 index.html#xxx
    const homeLink = prefix === '../' ? '../index.html' : '#';
    const featuresLink = prefix === '../' ? '../index.html#features' : '#features';
    const aboutLink = prefix === '../' ? '../index.html#about' : '#about';
    const boardLink = prefix + 'board.html';

    // 如果已经在首页，点击 Logo 应该刷新或回顶部
    // 如果在其他页面，点击 Logo 回首页
    const logoLink = prefix === '' ? 'index.html' : '../index.html';

    const headerHtml = `
    <div class="container">
        <nav>
            <a href="${logoLink}" class="logo">腕能 Watch One</a>
            <div class="nav-links">
                <a href="${featuresLink}">功能</a>
                <a href="${boardLink}">小黑板</a>
                <a href="https://apps.apple.com/sa/app/id6448225070" target="_blank">下载</a>
                <a href="${aboutLink}">关于</a>
            </div>
        </nav>
    </div>
    `;

    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHtml;
    } else {
        // 如果页面没有 header 标签，创建一个并插入到 body 最前面
        const newHeader = document.createElement('header');
        newHeader.innerHTML = headerHtml;
        document.body.insertBefore(newHeader, document.body.firstChild);
    }
}

function renderFooter() {
    const footerHtml = `
    <div class="container">
        <p>&copy; 2024 腕能 Watch One. All rights reserved.</p>
    </div>
    `;

    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHtml;
    } else {
        // 如果页面没有 footer 标签，创建一个并插入到 body 最后面
        const newFooter = document.createElement('footer');
        // 如果需要 id="about" 用于锚点定位
        newFooter.id = 'about';
        newFooter.innerHTML = footerHtml;
        document.body.appendChild(newFooter);
    }
}

function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 简单的激活状态判断
        if (href && href.includes('board.html') && currentPath.includes('board.html')) {
            link.classList.add('active');
        }
        // 可以根据需要添加更多判断
    });
}
