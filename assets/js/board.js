document.addEventListener('DOMContentLoaded', () => {
    const boardContainer = document.getElementById('board-container');

    // 数据源路径
    const DATA_URL = 'assets/data/board.json';

    // 初始化加载
    fetchData();

    async function fetchData() {
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            renderBoard(data);
        } catch (error) {
            console.error('Fetch error:', error);
            renderEmptyState();
        }
    }

    function renderBoard(data) {
        boardContainer.innerHTML = '';

        if (!data || data.length === 0) {
            renderEmptyState();
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'board-item';
            card.innerHTML = `
                <div class="board-item-meta">
                    <span class="tag ${item.type}">${getTypeLabel(item.type)}</span>
                    <span class="date">${item.date}</span>
                </div>
                <h3 class="board-item-title">${item.title}</h3>
                <p class="board-item-summary">${item.summary || '点击查看详情'}</p>
            `;

            // 修改为跳转到静态文章页
            card.addEventListener('click', () => {
                if (item.url) {
                    window.location.href = item.url;
                } else {
                    console.error('Article URL not found for item:', item.id);
                }
            });
            boardContainer.appendChild(card);
        });
    }

    function renderEmptyState() {
        boardContainer.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <h3>暂无内容</h3>
                <p>小黑板目前是空的，稍后再来看看吧。</p>
            </div>
        `;
    }

    function getTypeLabel(type) {
        const labels = {
            'news': '新闻',
            'notice': '公告',
            'tutorial': '教程',
            'guide': '指南'
        };
        return labels[type] || '其他';
    }
});
