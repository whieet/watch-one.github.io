// 动态布局脚本：用于渲染公共的 Header 和 Footer
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderWebviewControls(); // 新增：Webview 控制条
    highlightActiveNav();
});

function getPathPrefix() {
    // 简单判断：如果在 articles 目录下，返回 ../，否则返回 ./
    // 这里通过检查当前 URL 是否包含 /articles/ 来判断
    return window.location.pathname.includes('/articles/') ? '../' : '';
}

function renderHeader() {
    const prefix = getPathPrefix();
    const currentPath = window.location.pathname;
    const isHomePage = currentPath.endsWith('/') || currentPath.endsWith('index.html');

    // 修正首页锚点链接：
    // 如果在首页，使用锚点 (#features)
    // 如果在其他页面（如 board.html 或 articles/xxx.html），需要带上 index.html 前缀
    const baseLink = isHomePage ? '' : (prefix + 'index.html');

    const featuresLink = baseLink + '#features';
    const aboutLink = baseLink + '#about';
    const boardLink = prefix + 'board.html';

    // 如果已经在首页，点击 Logo 刷新；否则回首页
    const logoLink = isHomePage ? '#' : (prefix + 'index.html');

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

function renderWebviewControls() {
    // 创建底部控制条
    const controlsHtml = `
    <div class="webview-controls">
        <button onclick="history.back()" aria-label="后退">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>
        <button onclick="window.location.reload()" aria-label="刷新">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        </button>
        <button onclick="history.forward()" aria-label="前进">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </button>
    </div>
    `;

    const controlsDiv = document.createElement('div');
    controlsDiv.innerHTML = controlsHtml;
    document.body.appendChild(controlsDiv);
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
