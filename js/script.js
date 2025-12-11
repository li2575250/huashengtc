// 轮播图功能实现
class Carousel {
    constructor(container) {
        this.container = container;
        this.carouselInner = container.querySelector('.carousel-inner');
        this.carouselItems = container.querySelectorAll('.carousel-item');
        this.prevBtn = container.querySelector('.carousel-control.prev');
        this.nextBtn = container.querySelector('.carousel-control.next');
        this.indicators = container.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        this.interval = null;
        this.intervalTime = 5000;
        
        this.init();
    }

    init() {
        // 创建指示器
        this.createIndicators();
        
        // 初始化显示
        this.showItem(this.currentIndex);
        
        // 绑定事件
        this.bindEvents();
        
        // 启动自动轮播
        this.startAutoPlay();
    }

    createIndicators() {
        if (!this.indicators) return;
        
        this.carouselItems.forEach((item, index) => {
            const li = document.createElement('li');
            if (index === 0) {
                li.classList.add('active');
            }
            li.addEventListener('click', () => {
                this.showItem(index);
            });
            this.indicators.appendChild(li);
        });
        
        this.indicatorItems = this.indicators.querySelectorAll('li');
    }

    showItem(index) {
        // 隐藏所有项
        this.carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 显示当前项
        this.carouselItems[index].classList.add('active');
        
        // 更新指示器
        if (this.indicatorItems) {
            this.indicatorItems.forEach(item => {
                item.classList.remove('active');
            });
            this.indicatorItems[index].classList.add('active');
        }
        
        // 更新当前索引
        this.currentIndex = index;
    }

    next() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.carouselItems.length) {
            nextIndex = 0;
        }
        this.showItem(nextIndex);
    }

    prev() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.carouselItems.length - 1;
        }
        this.showItem(prevIndex);
    }

    bindEvents() {
        // 左右按钮事件
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoPlay();
            });
        }
        
        // 鼠标悬停事件
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    startAutoPlay() {
        this.interval = setInterval(() => {
            this.next();
        }, this.intervalTime);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        new Carousel(carousel);
    }
    
    // 导航栏激活状态
    const navLinks = document.querySelectorAll('.nav ul li a');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href') || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和提交逻辑
            alert('感谢您的留言，我们会尽快与您联系！');
            this.reset();
        });
    }
});
