// Register Service Worker for PWA
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

// High-quality Mock News to supplement API data
const MOCK_NEWS = [
    {
        title: "Global Tech Summit 2026: Innovations in Quantum Computing",
        description: "Leading tech giants gather in Singapore to discuss the future of quantum processing and its implications for cybersecurity and data analysis.",
        category: ["Technology"],
        pubDate: "2026-01-15 10:30:00",
        link: "https://www.techcrunch.com",
        source_id: "TechDaily",
        image_url: "https://picsum.photos/seed/tech1/600/400"
    },
    {
        title: "Sustainability Trends: The Rise of Vertical Farming",
        description: "Urban centers are increasingly adopting vertical farming techniques to ensure food security and reduce carbon footprints of long-distance transport.",
        category: ["Environment"],
        pubDate: "2026-01-16 08:45:00",
        link: "https://www.nationalgeographic.com/environment",
        source_id: "EcoWatch",
        image_url: "https://picsum.photos/seed/farm/600/400"
    },
    {
        title: "Central Bank Announces New Digital Currency Pilot",
        description: "The national treasury outlines a roadmap for a sovereign digital currency aimed at streamlining cross-border payments and reducing transaction costs.",
        category: ["Business"],
        pubDate: "2026-01-14 14:15:00",
        link: "https://www.bloomberg.com",
        source_id: "FinTimes",
        image_url: "https://picsum.photos/seed/money/600/400"
    },
    {
        title: "Health Breakthrough: AI-Driven Early Cancer Detection",
        description: "Researchers announce a new diagnostic tool that uses machine learning to identify early-stage markers with 99.4% accuracy.",
        category: ["Health"],
        pubDate: "2026-01-17 09:00:00",
        link: "https://www.medicalnewstoday.com",
        source_id: "MedNews",
        image_url: "https://picsum.photos/seed/health/600/400"
    },
    {
        title: "SpaceX Mars Expedition: First Crewed Landing Prep",
        description: "Final simulations are underway for the upcoming historic mission that aims to establish the first human outpost on the Red Planet.",
        category: ["Science"],
        pubDate: "2026-01-16 20:00:00",
        link: "https://www.space.com",
        source_id: "Cosmos",
        image_url: "https://picsum.photos/seed/space/600/400"
    },
    {
        title: "Renewable Energy: Offshore Wind Power Sees Record Growth",
        description: "A surge in offshore wind farm investments is expected to triple the global energy production from renewable sources by 2030.",
        category: ["Business"],
        pubDate: "2026-01-15 11:20:00",
        link: "https://www.reuters.com/business/energy",
        source_id: "EnergyInsight",
        image_url: "https://picsum.photos/seed/wind/600/400"
    },
    {
        title: "Modern Architecture: Floating Cities of the Future",
        description: "Designers propose innovative oceanic residential zones to address rising sea levels and urban overcrowding in coastal regions.",
        category: ["Architecture"],
        pubDate: "2026-01-13 16:40:00",
        link: "https://www.archdaily.com",
        source_id: "DesignHub",
        image_url: "https://picsum.photos/seed/arch/600/400"
    },
    {
        title: "Global Soccer: Underdogs Secure Historic Victory",
        description: "In a stunning upset, the national team has advanced to the finals of the international championship, sparking nationwide celebrations.",
        category: ["Sports"],
        pubDate: "2026-01-17 22:00:00",
        link: "https://www.espn.com",
        source_id: "SportsNet",
        image_url: "https://picsum.photos/seed/soccer/600/400"
    },
    {
        title: "Culinary Trends: The Renaissance of Traditional Fermentation",
        description: "Top chefs around the globe are returning to ancient preservation methods, blending tradition with modern gastronomy.",
        category: ["Lifestyle"],
        pubDate: "2026-01-16 13:10:00",
        link: "https://www.eater.com",
        source_id: "FoodieMag",
        image_url: "https://picsum.photos/seed/food/600/400"
    },
    {
        title: "Automotive News: Solid-State Batteries Ready for Production",
        description: "Major car manufacturers claim the new battery technology will double the range of electric vehicles while cutting charge times to 10 minutes.",
        category: ["Autos"],
        pubDate: "2026-01-15 07:45:00",
        link: "#",
        source_id: "AutoWorld",
        image_url: "https://picsum.photos/seed/cars/600/400"
    },
    {
        title: "Education Policy: Gaming as a Tool for STEM Learning",
        description: "New studies show that integrating strategic video games into the curriculum significantly boosts student engagement in mathematics and physics.",
        category: ["Education"],
        pubDate: "2026-01-14 09:55:00",
        link: "#",
        source_id: "EduTrend",
        image_url: "https://picsum.photos/seed/edu/600/400"
    },
    {
        title: "Cybersecurity Alert: New Multi-Stage Phishing Tactics",
        description: "Experts warn of increasingly sophisticated social engineering attacks targeting remote workers through encrypted messaging apps.",
        category: ["Technology"],
        pubDate: "2026-01-17 11:15:00",
        link: "#",
        source_id: "CyberGuard",
        image_url: "https://picsum.photos/seed/cyber/600/400"
    },
    {
        title: "Art & Culture: Immersive VR Museums Gaining Popularity",
        description: "Digital galleries provide users with a cross-continental look at historical artifacts without leaving their homes.",
        category: ["Arts"],
        pubDate: "2026-01-16 15:30:00",
        link: "#",
        source_id: "ArtVibe",
        image_url: "https://picsum.photos/seed/art/600/400"
    },
    {
        title: "Market Report: Lithium Demand Skyrockets",
        description: "Mining companies struggle to keep pace with the global shift toward electrification, leading to price spikes in raw materials.",
        category: ["Finance"],
        pubDate: "2026-01-15 14:00:00",
        link: "#",
        source_id: "MarketWatch",
        image_url: "https://picsum.photos/seed/lithium/600/400"
    },
    {
        title: "Philosophy & Ethics: The Moral Status of Advanced AI",
        description: "A panel of eticists debates the societal implications of creating machines that possess high-level reasoning and self-awareness.",
        category: ["Science"],
        pubDate: "2026-01-13 10:00:00",
        link: "#",
        source_id: "ThinkDeep",
        image_url: "https://picsum.photos/seed/brain/600/400"
    },
    {
        title: "Travel News: Eco-Tourism Hubs in Southeast Asia",
        description: "New sustainable travel initiatives aim to protect coral reefs while providing authentic cultural experiences for visitors.",
        category: ["Travel"],
        pubDate: "2026-01-14 12:20:00",
        link: "#",
        source_id: "Wanderlust",
        image_url: "https://picsum.photos/seed/travel/600/400"
    },
    {
        title: "Social Media: The Move Toward Decenteralized Platforms",
        description: "Users are flocking toward open-source protocols as concerns over privacy and algorithmic control grow globally.",
        category: ["Technology"],
        pubDate: "2026-01-15 16:50:00",
        link: "#",
        source_id: "NetNews",
        image_url: "https://picsum.photos/seed/social/600/400"
    },
    {
        title: "Ocean Exploration: Deep-Sea Creatures Discovered",
        description: "A research expedition in the Mariana Trench captures footage of previously unknown bioluminescent species living at extreme depths.",
        category: ["Science"],
        pubDate: "2026-01-17 08:30:00",
        link: "#",
        source_id: "DeepBlue",
        image_url: "https://picsum.photos/seed/ocean/600/400"
    },
    {
        title: "Fashion Industry: The Rise of Lab-Grown Leather",
        description: "Luxury brands are committing to cruelty-free materials as biotechnology allows for the creation of sustainable leather alternatives.",
        category: ["Lifestyle"],
        pubDate: "2026-01-16 11:00:00",
        link: "#",
        source_id: "StyleFile",
        image_url: "https://picsum.photos/seed/fashion/600/400"
    },
    {
        title: "Workforce Trends: The 4-Day Work Week Trial Results",
        description: "Major corporations report a 20% increase in productivity following a six-month trial of reduced working hours with no pay cuts.",
        category: ["Business"],
        pubDate: "2026-01-15 09:15:00",
        link: "#",
        source_id: "WorkLife",
        image_url: "https://picsum.photos/seed/office/600/400"
    },
    {
        title: "Physics: Theory on Dark Matter Particles Challenged",
        description: "New data from the latest particle accelerator experiments suggests our understanding of the universe's unseen mass may be flawed.",
        category: ["Science"],
        pubDate: "2026-01-14 17:40:00",
        link: "#",
        source_id: "QuantumEdge",
        image_url: "https://picsum.photos/seed/physics/600/400"
    },
    {
        title: "Entertainment: Revival of Classical Cinema in Theaters",
        description: "Audiences are returning to the big screen for curated screenings of 20th-century masterpieces, revitalizing local arthouse cinemas.",
        category: ["Entertainment"],
        pubDate: "2026-01-16 19:30:00",
        link: "#",
        source_id: "CineMag",
        image_url: "https://picsum.photos/seed/cinema/600/400"
    },
    {
        title: "Real Estate: Suburban Revitalization in Post-Pandemic Era",
        description: "Small towns are seeing a massive influx of residents seeking more space and community-focused environments outside major metros.",
        category: ["Lifestyle"],
        pubDate: "2026-01-15 13:25:00",
        link: "#",
        source_id: "HomeDaily",
        image_url: "https://picsum.photos/seed/houses/600/400"
    },
    {
        title: "Robotics: Assistive Drones for the Elderly",
        description: "Engineers develop compact home robots capable of monitoring vital signs and assisting with daily tasks for independent seniors.",
        category: ["Technology"],
        pubDate: "2026-01-17 14:50:00",
        link: "#",
        source_id: "RobotReview",
        image_url: "https://picsum.photos/seed/robot/600/400"
    },
    {
        title: "Meteorology: Atmospheric Rivers Impacting Coastal Regions",
        description: "Increasingly frequent weather patterns are prompting new infrastructure projects to manage excess rainfall and prevent flooding.",
        category: ["Environment"],
        pubDate: "2026-01-16 06:10:00",
        link: "#",
        source_id: "SkyWatch",
        image_url: "https://picsum.photos/seed/storm/600/400"
    }
];

// Global variable to store fetched articles
let globalArticles = [];
let currentCategory = 'All';

// Fetch news from API
async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        let allArticles = [];

        // Combine API results with mock data
        if (data.results && Array.isArray(data.results)) {
            allArticles = [...data.results, ...MOCK_NEWS];
        } else {
            allArticles = [...MOCK_NEWS];
        }

        // Shuffle articles for variety (optional but recommended)
        allArticles.sort(() => Math.random() - 0.5);


        // Store globally
        globalArticles = [...allArticles];

        if (allArticles.length > 0) {
            updateTicker(allArticles.slice(0, 10)); // Top 10 for ticker
            displayFeaturedNews(allArticles.slice(0, 3));

            // Setup filters and display initial latest news
            setupCategoryFilters(allArticles);
            filterArticles('All');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        // On error, still show mock news
        globalArticles = [...MOCK_NEWS];
        setupCategoryFilters(globalArticles);
        displayFeaturedNews(MOCK_NEWS.slice(0, 3));
        filterArticles('All');
        updateTicker(MOCK_NEWS.slice(0, 10));
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

// Setup Category Filters
function setupCategoryFilters(articles) {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // Extract categories
    const categories = new Set(['All']);
    articles.forEach(article => {
        if (article.category && Array.isArray(article.category)) {
            article.category.forEach(cat => categories.add(cat));
        } else if (article.category && typeof article.category === 'string') {
            categories.add(article.category);
        }
    });

    // Create buttons
    filterContainer.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        btn.className = `category-btn ${category === 'All' ? 'active' : ''}`;
        btn.onclick = () => {
            // Update active state
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter
            filterArticles(category);
        };
        filterContainer.appendChild(btn);
    });
}

// Filter Articles
function filterArticles(category) {
    currentCategory = category;
    const container = document.querySelector('.news-grid');
    if (!container) return;

    // Filter logic
    let filtered = [];
    if (category === 'All') {
        // Show everything except what's already in featured (logic can be adjusted)
        // For simplicity, let's show everything excluding the top 3 which are usually featured
        // Or if we want "Latest News" to be filterable independently:
        filtered = globalArticles.slice(3);
    } else {
        filtered = globalArticles.filter(article => {
            if (Array.isArray(article.category)) {
                return article.category.some(c => c.toLowerCase() === category.toLowerCase());
            }
            return article.category && article.category.toLowerCase() === category.toLowerCase();
        });
    }

    // Display
    displayLatestNews(filtered);
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
                            <span style="font-size: 0.8rem; height: 100%; display: flex; align-items: center;">${pubDate}</span>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <button class="tts-btn" aria-label="Listen to article" title="Listen">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                </button>
                                <a href="${article.link}" target="_blank" class="read-more">Read More →</a>
                            </div>
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

    // TTS Button logic
    const ttsBtn = card.querySelector('.tts-btn');
    if (ttsBtn) {
        ttsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToRead = `${article.title}. ${article.description || ''}`;
            toggleSpeech(textToRead, ttsBtn);
        });
    }

    return card;
}

// Speech Synthesis Variables
let currentUtterance = null;
let currentSpeakingBtn = null;

// Toggle Speech
function toggleSpeech(text, btn) {
    // If currently speaking this text, stop
    if (window.speechSynthesis.speaking && currentSpeakingBtn === btn) {
        window.speechSynthesis.cancel();
        resetspeechState();
        return;
    }

    // If speaking something else, stop it first
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetspeechState();
    }

    // Start speaking
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
        resetspeechState();
    };

    utterance.onerror = (e) => {
        console.error('Speech error:', e);
        resetspeechState();
    };

    currentUtterance = utterance;
    currentSpeakingBtn = btn;
    btn.classList.add('speaking');
    // Change icon to Stop
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

    window.speechSynthesis.speak(utterance);
}

function resetspeechState() {
    if (currentSpeakingBtn) {
        currentSpeakingBtn.classList.remove('speaking');
        // Reset icon to Speaker
        currentSpeakingBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
    currentUtterance = null;
    currentSpeakingBtn = null;
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

// Accessibility: Text Resizer
document.addEventListener('DOMContentLoaded', () => {
    const minSize = 14;
    const maxSize = 24;
    const defaultSize = 16;
    let currentSize = parseInt(localStorage.getItem('userFontSize')) || defaultSize;

    // Apply saved size immediately
    document.documentElement.style.fontSize = `${currentSize}px`;

    const decreaseBtn = document.getElementById('decrease-text');
    const increaseBtn = document.getElementById('increase-text');
    const resetBtn = document.getElementById('reset-text');

    if (decreaseBtn && increaseBtn && resetBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (currentSize > minSize) {
                currentSize -= 2;
                updateFontSize(currentSize);
            }
        });

        increaseBtn.addEventListener('click', () => {
            if (currentSize < maxSize) {
                currentSize += 2;
                updateFontSize(currentSize);
            }
        });

        resetBtn.addEventListener('click', () => {
            currentSize = defaultSize;
            updateFontSize(currentSize);
        });
    }

    function updateFontSize(size) {
        document.documentElement.style.fontSize = `${size}px`;
        localStorage.setItem('userFontSize', size);
    }
});

// Footer Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('footer-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    const modalContent = {
        'footer-about': {
            title: 'About ReadRelief',
            body: `<p>ReadRelief is a modern news aggregation platform designed to bring you the latest and most relevant stories from around the globe. Our mission is to provide a clean, accessible, and user-friendly reading experience for everyone.</p>
                   <p>Developed with care by three dedicated college students, we aim to bridge the gap between complex information and simple, enjoyable reading.</p>`
        },
        'footer-team': {
            title: 'Our Team',
            body: `<p>ReadRelief was developed by:</p>
                   <ul>
                       <li><strong>Kenneth Raye T. Lapiz</strong></li>
                       <li><strong>Louie Andrew D. Magahis</strong></li>
                       <li><strong>Xavier Ali P. Vergara</strong></li>
                   </ul>`
        },
        'footer-careers': {
            title: 'Careers',
            body: `<p>We are currently not hiring, but we appreciate your interest! Please check back later for future opportunities.</p>`
        },
        'footer-press': {
            title: 'Press Kit',
            body: `<p>For press inquiries and brand assets, please contact our team via the Contact section.</p>`
        },
        'footer-privacy': {
            title: 'Privacy Policy',
            body: `<p>Your privacy is important to us. We do not collect any personal data without your consent. Cookies are used solely to enhance your browsing experience (e.g., remembering your font size preference).</p>`
        },
        'footer-terms': {
            title: 'Terms of Service',
            body: `<p>By using ReadRelief, you agree to consume content responsibly. All news content belongs to their respective sources.</p>`
        },
        'footer-cookies': {
            title: 'Cookie Policy',
            body: `<p>We use local storage to save your preferences, such as text size and theme settings. No third-party tracking cookies are used.</p>`
        },
        'footer-contact': {
            title: 'Contact Us',
            body: `<p>Have questions or feedback? Reach out to us at:</p>
                   <p><a href="mailto:lapizkenneth5@gmail.com" style="color: var(--accent-color); font-weight: bold;">lapizkenneth5@gmail.com</a></p>`
        }
    };

    // Open Modal Handlers
    Object.keys(modalContent).forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const content = modalContent[id];
                modalTitle.textContent = content.title;
                modalBody.innerHTML = content.body;
                openModal();
            });
        }
    });

    // Close Modal Logic
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModalFunc();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Category Footer Links
    const categoryLinks = document.querySelectorAll('.footer-category');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');

            // Scroll to top or news section
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Trigger filter
            const filterButtons = document.querySelectorAll('.category-btn');
            filterButtons.forEach(btn => {
                if (btn.textContent === category) {
                    btn.click();
                }
            });
        });
    });
});
