// Main JavaScript for True Light Photography

// Global data storage
let siteData = {
portfolio: [],
services: [],
testimonials: [],
blog: [],
siteInfo: {}
};

// Load all JSON data on page load
document.addEventListener(‘DOMContentLoaded’, async function () {
try {
// Load all data files
await loadAllData();

```
    // Initialize the site
    initializeSite();
} catch (error) {
    console.error('Error loading site data:', error);
}
```

});

// Load all JSON data files
async function loadAllData() {
try {
const [portfolio, services, testimonials, blog, siteInfo] = await Promise.all([
fetch(‘content/portfolio.json’).then(res => res.json()),
fetch(‘content/services.json’).then(res => res.json()),
fetch(‘content/testimonials.json’).then(res => res.json()),
fetch(‘content/blog.json’).then(res => res.json()),
fetch(‘content/site-info.json’).then(res => res.json())
]);

```
    siteData = { portfolio, services, testimonials, blog, siteInfo };
} catch (error) {
    console.error('Error fetching data:', error);
    // Use fallback data if JSON files don't exist yet
    useFallbackData();
}
```

}

// Fallback data if JSON files aren’t loaded
function useFallbackData() {
siteData = {
portfolio: [
{
id: 1,
category: “Portraits”,
image: “https://picsum.photos/id/1062/400/500”,
title: “Portraits”,
description: “Authentic moments captured beautifully”,
featured: true
},
{
id: 2,
category: “Couples”,
image: “https://picsum.photos/id/1082/400/500”,
title: “Couples & Engagements”,
description: “Love stories in their truest form”,
featured: true
},
{
id: 3,
category: “Family”,
image: “https://picsum.photos/id/1015/400/500”,
title: “Family”,
description: “Cherished memories that last forever”,
featured: true
}
],
services: [
{
name: “Mini Sessions”,
price: “$250–$350”,
features: [
“30-minute session”,
“One location of your choice”,
“15-20 professionally edited images”,
“Digital gallery with download rights”,
“Perfect for quick updates & seasonal photos”
]
},
{
name: “Standard Portraits”,
price: “$500–$700”,
features: [
“60-minute session”,
“Two locations”,
“40-50 edited images”,
“Digital gallery”,
“Print release included”,
“Wardrobe consultation”
]
},
{
name: “Premium Sessions”,
price: “$900–$1,200”,
features: [
“90-minute session”,
“Multiple locations”,
“75+ edited images”,
“Premium luxury editing”,
“Print release + complimentary 8x10 print”,
“Styling guide & location scouting”
]
},
{
name: “Engagement & Branding”,
price: “$1,200–$2,000+”,
features: [
“Custom session length (2-3 hours)”,
“Multiple locations”,
“100+ edited images”,
“Luxury editing & retouching”,
“Full print release”,
“Option for albums & wall art”,
“Short video reels available”
]
}
],
testimonials: [
{
text: “Working with True Light Photography was an absolute dream. The photos captured our love story perfectly, and we couldn’t be happier with the results!”,
author: “SARAH & MICHAEL”
},
{
text: “Professional, creative, and so easy to work with! Our family photos are stunning and we treasure every single one.”,
author: “THE JOHNSON FAMILY”
},
{
text: “The branding photos elevated my business presence completely. I receive compliments constantly and my bookings have increased.”,
author: “EMILY, SMALL BUSINESS OWNER”
}
],
blog: [
{
title: “What to Wear for Your Portrait Session”,
date: “SEPTEMBER 15, 2025”,
image: “https://picsum.photos/seed/blog1/400/250”,
excerpt: “Choosing the right outfit can make all the difference… Here are my top tips for selecting colors, styles, and accessories.”,
link: “#”
},
{
title: “5 Posing Tips for Natural-Looking Photos”,
date: “AUGUST 28, 2025”,
image: “https://picsum.photos/seed/blog2/400/250”,
excerpt: “Feeling awkward in front of the camera? These simple posing techniques will help you look and feel confident.”,
link: “#”
},
{
title: “Behind the Scenes: A Day in the Life”,
date: “AUGUST 10, 2025”,
image: “https://picsum.photos/seed/blog3/400/250”,
excerpt: “Ever wonder what goes on behind the camera? Join me for a day of shooting, editing, and all the little moments.”,
link: “#”
}
],
siteInfo: {
email: “hello@truelightphotography.com”,
phone: “(555) 123-4567”,
businessHours: “Mon-Fri, 9:00 AM - 6:00 PM”,
social: {
instagram: “https://instagram.com”,
tiktok: “https://tiktok.com”,
pinterest: “https://pinterest.com”,
facebook: “https://facebook.com”
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

```
// Load content
loadPortfolio();
loadServices();
loadTestimonials();
loadBlog();
loadSiteInfo();

// Initialize router
router();
window.addEventListener('hashchange', router);
```

}

// Page Router (SPA)
function router() {
const hash = window.location.hash || ‘#home’;
const pageId = hash.substring(1);

```
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
```

}

// Load Portfolio
function loadPortfolio() {
// Featured Portfolio on Home Page
const featuredContainer = document.getElementById(‘featured-portfolio’);
if (featuredContainer) {
const featured = siteData.portfolio.filter(item => item.featured).slice(0, 3);
featuredContainer.innerHTML = featured.map(item => `<div class="portfolio-item"> <img src="${item.image}" alt="${item.title}"> <div class="portfolio-label"> <h3>${item.title}</h3> <p>${item.description}</p> </div> </div>`).join(’’);
}

```
// Full Portfolio Page
const portfolioContainer = document.getElementById('portfolio-categories');
if (portfolioContainer) {
    const categories = [...new Set(siteData.portfolio.map(item => item.category))];
    
    portfolioContainer.innerHTML = categories.map(category => {
        const items = siteData.portfolio.filter(item => item.category === category);
        return `
            <h3 style="font-size: 2rem; margin: 3rem 0 2rem; color: var(--gold);">${category}</h3>
            <div class="portfolio-grid">
                ${items.map(item => `
                    <div class="portfolio-item">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}
```

}

// Load Services
function loadServices() {
const servicesContainer = document.getElementById(‘services-grid’);
if (servicesContainer) {
servicesContainer.innerHTML = siteData.services.map(service => `<div class="service-card"> <h3>${service.name}</h3> <p class="service-price">${service.price}</p> <ul class="service-features"> ${service.features.map(feature =>`<li>${feature}</li>`).join('')} </ul> <a href="#booking" class="cta-button" style="display: inline-block; margin-top: 1rem;">Book Now</a> </div> `).join(’’);
}

```
// Populate booking form dropdown
const sessionTypeSelect = document.getElementById('session-type');
if (sessionTypeSelect) {
    const optionsHTML = '<option value="">Select a session type</option>' + 
        siteData.services.map(service => 
            `<option value="${service.name.toLowerCase().replace(/\s+/g, '-')}">${service.name} (${service.price})</option>`
        ).join('');
    sessionTypeSelect.innerHTML = optionsHTML;
}

// Load add-ons if they exist
if (siteData.services.addons) {
    const addonsContainer = document.getElementById('addons-grid');
    if (addonsContainer) {
        addonsContainer.innerHTML = siteData.services.addons.map(addon => `
            <div>
                <h4 style="color: var(--gold); margin-bottom: 0.5rem;">${addon.name}</h4>
                <p>${addon.price}</p>
            </div>
        `).join('');
    }
}
```

}

// Load Testimonials
function loadTestimonials() {
// Home page testimonial carousel
const homeTestimonial = document.getElementById(‘home-testimonial’);
if (homeTestimonial && siteData.testimonials.length > 0) {
setupTestimonialCarousel(homeTestimonial, siteData.testimonials);
}

```
// All testimonials page
const allTestimonialsContainer = document.getElementById('all-testimonials');
if (allTestimonialsContainer) {
    allTestimonialsContainer.innerHTML = siteData.testimonials.map(testimonial => `
        <div class="testimonial-carousel">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">— ${testimonial.author}</p>
        </div>
    `).join('');
}
```

}

// Testimonial Carousel Setup
function setupTestimonialCarousel(container, testimonials) {
let currentIndex = 0;
const textEl = container.querySelector(’.testimonial-text’);
const authorEl = container.querySelector(’.testimonial-author’);
const dotsContainer = container.querySelector(’.carousel-dots’);

```
// Create dots
dotsContainer.innerHTML = testimonials.map((_, index) => 
    `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
).join('');

// Update testimonial display
function updateTestimonial() {
    textEl.textContent = `"${testimonials[currentIndex].text}"`;
    authorEl.textContent = `— ${testimonials[currentIndex].author}`;
    
    // Update dots
    container.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Dot click handlers
container.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        updateTestimonial();
    });
});

// Auto-rotate every 6 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
}, 6000);

// Initial display
updateTestimonial();
```

}

// Load Blog
function loadBlog() {
const blogContainer = document.getElementById(‘blog-grid’);
if (blogContainer) {
blogContainer.innerHTML = siteData.blog.map(post => `<div class="blog-card"> <img class="blog-image" src="${post.image}" alt="${post.title}"> <div class="blog-content"> <p class="blog-date">${post.date}</p> <h3>${post.title}</h3> <p>${post.excerpt}</p> <a href="${post.link}" class="read-more">Read More →</a> </div> </div>`).join(’’);
}
}

// Load Site Info (contact details, social links, etc.)
function loadSiteInfo() {
const info = siteData.siteInfo;

```
// Update all email references
document.querySelectorAll('#contact-email, #footer-email').forEach(el => {
    if (el) el.textContent = info.email;
});

// Update phone
const phoneEl = document.getElementById('contact-phone');
if (phoneEl) phoneEl.textContent = info.phone;

// Update business hours
const hoursEl = document.getElementById('business-hours');
if (hoursEl) hoursEl.textContent = info.businessHours;

// Update social links
updateSocialLinks('footer-social', info.social);
updateSocialLinks('contact-social', info.social);
```

}

// Update Social Links
function updateSocialLinks(containerId, social) {
const container = document.getElementById(containerId);
if (container && social) {
container.innerHTML = `${social.instagram ?`<a href="${social.instagram}" aria-label="Instagram">📷</a>`: ''} ${social.tiktok ?`<a href="${social.tiktok}" aria-label="TikTok">🎵</a>`: ''} ${social.pinterest ?`<a href="${social.pinterest}" aria-label="Pinterest">📌</a>`: ''} ${social.facebook ?`<a href="${social.facebook}" aria-label="Facebook">📘</a>`: ''}`;
}
}

// Navigation Setup
function setupNavigation() {
const navLinks = document.querySelectorAll(’.nav-links a’);
navLinks.forEach(link => {
link.addEventListener(‘click’, function() {
document.getElementById(‘navLinks’).classList.remove(‘active’);
});
});
}

// Mobile Menu Toggle
function setupMobileMenu() {
const mobileMenu = document.getElementById(‘mobileMenu’);
const navLinks = document.getElementById(‘navLinks’);

```
mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});
```

}

// Scroll Effects
function setupScrollEffects() {
const navbar = document.getElementById(‘navbar’);
const scrollTopBtn = document.getElementById(‘scrollTop’);

```
// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top click
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-item, .service-card, .blog-card, .highlight-item, .booking-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
```

}
