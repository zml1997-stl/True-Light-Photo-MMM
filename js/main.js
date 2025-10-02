// Global data storage
let siteData = {
    portfolio: [],
    services: [],
    testimonials: [],
    blog: [],
    siteInfo: {}
};

// Load all JSON data on page load
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Load all data files
        await loadAllData();

        // Initialize the site
        initializeSite();
    } catch (error) {
        console.error('Error loading site data:', error);
    }
});

// Load all JSON data files
async function loadAllData() {
    try {
        const [portfolio, services, testimonials, blog, siteInfo] = await Promise.all([
            fetch('content/portfolio.json').then(res => res.json()),
            fetch('content/services.json').then(res => res.json()),
            fetch('content/testimonials.json').then(res => res.json()),
            fetch('content/blog.json').then(res => res.json()),
            fetch('content/site-info.json').then(res => res.json())
        ]);

        siteData = { portfolio, services, testimonials, blog, siteInfo };
    } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data if JSON files don't exist yet
        useFallbackData();
    }
}

// Fallback data if JSON files aren’t loaded
function useFallbackData() {
    siteData = {
        portfolio: [
            {
                id: 1,
                category: "Portraits",
                image: "https://picsum.photos/id/1062/400/500",
                title: "Portraits",
                description: "Authentic moments captured beautifully",
                featured: true
            },
            {
                id: 2,
                category: "Couples",
                image: "https://picsum.photos/id/1082/400/500",
                title: "Couples & Engagements",
                description: "Love stories in their truest form",
                featured: true
            },
            {
                id: 3,
                category: "Family",
                image: "https://picsum.photos/id/1015/400/500",
                title: "Family",
                description: "Cherished memories that last forever",
                featured: true
            }
        ],
        services: [
            {
                name: "Mini Sessions",
                price: "$250–$350",
                features: [
                    "30-minute session",
                    "One location of your choice",
                    "15-20 professionally edited images",
                    "Digital gallery with download rights",
                    "Perfect for quick updates & seasonal photos"
                ]
            },
            {
                name: "Standard Portraits",
                price: "$500–$700",
                features: [
                    "60-minute session",
                    "Two locations",
                    "40-50 edited images",
                    "Digital gallery",
                    "Print release included",
                    "Wardrobe consultation"
                ]
            },
            {
                name: "Premium Sessions",
                price: "$900–$1,200",
                features: [
                    "90-minute session",
                    "Multiple locations",
                    "75+ edited images",
                    "Premium luxury editing",
                    "Print release + complimentary 8x10 print",
                    "Styling guide & location scouting"
                ]
            },
            {
                name: "Engagement & Branding",
                price: "$1,200–$2,000+",
                features: [
                    "Custom session length (2-3 hours)",
                    "Multiple locations",
                    "100+ edited images",
                    "Luxury editing & retouching",
                    "Full print release",
                    "Option for albums & wall art",
                    "Short video reels available"
                ]
            }
        ],
        testimonials: [
            {
                text: "Working with True Light Photography was an absolute dream. The photos captured our love story perfectly, and we couldn’t be happier with the results!",
                author: "SARAH & MICHAEL"
            },
            {
                text: "Professional, creative, and so easy to work with! Our family photos are stunning and we treasure every single one.",
                author: "THE JOHNSON FAMILY"
            },
            {
                text: "The branding photos elevated my business presence completely. I receive compliments constantly and my bookings have increased.",
                author: "EMILY, SMALL BUSINESS OWNER"
            }
        ],
        blog: [
            {
                title: "What to Wear for Your Portrait Session",
                date: "SEPTEMBER 15, 2025",
                image: "https://picsum.photos/seed/blog1/400/250",
                excerpt: "Choosing the right outfit can make all the difference… Here are my top tips for selecting colors, styles, and accessories.",
                link: "#"
            },
            {
                title: "5 Posing Tips for Natural-Looking Photos",
                date: "AUGUST 28, 2025",
                image: "https://picsum.photos/seed/blog2/400/250",
                excerpt: "Feeling awkward in front of the camera? These simple posing techniques will help you look and feel confident.",
                link: "#"
            },
            {
                title: "Behind the Scenes: A Day in the Life",
                date: "AUGUST 10, 2025",
                image: "https://picsum.photos/seed/blog3/400/250",
                excerpt: "Ever wonder what goes on behind the camera? Join me for a day of shooting, editing, and all the little moments.",
                link: "#"
            }
        ],
        siteInfo: {
            email: "hello@truelightphotography.com",
            phone: "(555) 123-4567",
            businessHours: "Mon-Fri, 9:00 AM - 6:00 PM",
            social: {
                instagram: "https://instagram.com",
                tiktok: "https://tiktok.com",
                pinterest: "https://pinterest.com",
                facebook: "https://facebook.com"
            }
        }
    };
}

// Initialize all site components
function initializeSite() {
    // Navigation and UI
    setupNavigation();
    setupScrollEffects();
    setupMobileMenu();

    // Load content
    loadPortfolio();
    loadServices();
    loadTestimonials();
    loadBlog();
    loadSiteInfo();

    // Initialize router
    router();
    window.addEventListener('hashchange', router);
}

// Page Router (SPA)
function router() {
    const hash = window.location.hash || '#home';
    const pageId = hash.substring(1);

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('home').classList.add('active');
    }
    window.scrollTo(0, 0);
}