if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// PWA Installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Install prompt ready');
});

// API Configuration
const API_KEY = 'pub_5412d679c56545bb9c273891730b780a';
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=ph`;

// Fetch news from API
async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.results) {
            updateTicker(data.results); // Update ticker with headlines
            displayFeaturedNews(data.results.slice(0, 3));
            displayLatestNews(data.results.slice(3));
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.querySelector('.featured-grid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Unable to load news. Please try again later.</p>';
        updateTicker([]); // Show placeholder on error
    }
}

// Update News Ticker (Queue Style)
function updateTicker(articles) {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    if (articles.length === 0) {
        tickerContent.innerHTML = '<span>Unable to load featured news.</span>';
        return;
    }

    // Limit to top 10 articles (More news)
    const topArticles = articles.slice(0, 10);
    let currentIndex = 0;

    // Initial render
    renderCurrentHeadline();

    // Start cycling
    setInterval(() => {
        currentIndex = (currentIndex + 1) % topArticles.length;
        renderCurrentHeadline();
    }, 4000); // 4 seconds per headline

    function renderCurrentHeadline() {
        const article = topArticles[currentIndex];

        // Create new element
        const newSpan = document.createElement('span');
        newSpan.className = 'ticker-headline slide-enter';
        newSpan.textContent = article.title;

        // Remove old active element
        const oldSpan = tickerContent.querySelector('.slide-active');
        if (oldSpan) {
            oldSpan.classList.remove('slide-active');
            oldSpan.classList.add('slide-exit');
            setTimeout(() => oldSpan.remove(), 500); // Remove after animation
        }

        // Add new element and animate in
        tickerContent.appendChild(newSpan);
        // Force reflow
        void newSpan.offsetWidth;
        newSpan.classList.remove('slide-enter');
        newSpan.classList.add('slide-active');
    }
}

// Display featured news
function displayFeaturedNews(articles) {
    const container = document.querySelector('.featured-grid');
    if (!container) return;
    container.innerHTML = '';

    articles.forEach(article => {
        const card = createNewsCard(article);
        container.appendChild(card);
    });
}

// Display latest news
function displayLatestNews(articles) {
    const container = document.querySelector('.news-grid');
    if (!container) return;
    container.innerHTML = '';

    articles.forEach(article => {
        const card = createNewsCard(article);
        container.appendChild(card);
    });
}

// Create news card element
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';

    // Build SVG placeholder data URI to use as a reliable fallback
    const placeholderSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect fill='%23e0e0e0' width='100%' height='100%'/><text x='50%' y='50%' font-size='24' fill='%23999' text-anchor='middle' dominant-baseline='middle' font-family='Arial'>No image</text></svg>";
    const placeholderSrc = 'data:image/svg+xml;utf8,' + placeholderSVG;

    // Generate image element HTML
    let imageHtml = '';
    if (article.image_url && article.image_url.trim()) {
        imageHtml = `<img src="${article.image_url}" alt="${article.title}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.onerror=null;this.src='${placeholderSrc}';">`;
    } else {
        imageHtml = `<img src="${placeholderSrc}" alt="No image" style="width:100%;height:100%;object-fit:cover;display:block;">`;
    }

    const category = article.category ? article.category[0].toUpperCase() : 'News';
    const pubDate = new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const source = article.source_id || 'News Source';

    card.innerHTML = `<div class="card-image">
                        ${imageHtml}
                      </div>
                      <div class="card-content">
                        <span class="card-category">${category}</span>
                        <h3 class="card-title">${article.title}</h3>
                        <div class="description-wrapper">
                            <p class="card-description collapsed">${article.description || 'No description available.'}</p>
                            <button class="desc-toggle" aria-expanded="false">More</button>
                        </div>
                        <div class="card-meta">
                            <span>${pubDate}</span>
                            <a href="${article.link}" target="_blank" class="read-more">Read More →</a>
                        </div>
                        <div style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">Source: ${source}</div>
                      </div>`;

    // Attach expand/collapse behavior for the description
    const toggleBtn = card.querySelector('.desc-toggle');
    const desc = card.querySelector('.card-description');

    if (toggleBtn && desc) {
        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';

            if (expanded) {
                desc.classList.add('collapsed');
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.textContent = 'More';
            } else {
                desc.classList.remove('collapsed');
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.textContent = 'Less';
            }
        });
    }

    return card;
}

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display news
    fetchNews();

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header Search Toggle
    const searchToggle = document.querySelector('.search-toggle');
    const headerSearchBar = document.querySelector('.header-search-bar');

    if (searchToggle && headerSearchBar) {
        searchToggle.addEventListener('click', () => {
            headerSearchBar.classList.toggle('hidden');
            if (!headerSearchBar.classList.contains('hidden')) {
                const input = headerSearchBar.querySelector('input');
                if (input) input.focus();
            }
        });
    }

    // Search Form Submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const query = input.value.trim();
            if (query) {
                searchNews(query);
                input.value = '';
                // Optional: Hide search bar after search
                if (headerSearchBar) headerSearchBar.classList.add('hidden');
            }
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                alert(`Thank you for subscribing with: ${email}\n\nYou'll receive the latest news in your inbox!`);
                emailInput.value = '';
            }
        });
    }

    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Search function
async function searchNews(query) {
    try {
        const searchUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=ph&q=${query}`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        // Target the main container (Featured Section)
        const container = document.querySelector('.featured-grid');
        const featuredTitle = document.querySelector('.featured-section h2');
        const latestSection = document.querySelector('#categories');

        // Reset/Clear displays
        container.innerHTML = '';
        if (latestSection) latestSection.style.display = 'none'; // Hide "Latest News" section entirely

        if (data.results && data.results.length > 0) {
            // Update Title
            if (featuredTitle) featuredTitle.textContent = `Search Results for: "${query}"`;

            // Render results
            data.results.forEach(article => {
                const card = createNewsCard(article);
                container.appendChild(card);
            });

            // Scroll to results
            const featuredSection = document.querySelector('.featured-section');
            if (featuredSection) featuredSection.scrollIntoView({ behavior: 'smooth' });

        } else {
            if (featuredTitle) featuredTitle.textContent = `Search Results for: "${query}"`;
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No results found.</p>';
        }

    } catch (error) {
        console.error('Error searching news:', error);
        alert('Error searching news. Please try again.');
    }
}