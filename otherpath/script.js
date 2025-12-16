function deduplicateImages(data) {
    const seen = new Set();
    const uniqueData = [];
    
    for (const item of data) {
        if (!seen.has(item.src)) {
            seen.add(item.src);
            uniqueData.push(item);
        }
    }
    
    return uniqueData;
}

// Image data array containing all image paths and captions
const imageData = [
    { src: "AdditionalM5/13.jpg", caption: "Year End Party" },
    { src: "AdditionalM4.1/104.jpg", caption: "Year End Party" },
    { src: "AdditionalM5/16.jpg", caption: "Year End Party" },
    { src: "AdditionalM5/15.jpg", caption: "Year End Party" },
    { src: "Album2/Year-End-Party.jpeg", caption: "Year End Party" },
    { src: "AdditionalM5/14.jpg", caption: "Year End Party" },
    { src: "AdditionalM4.1/103.jpg", caption: "Classroom" },
    { src: "AdditionalM6/20.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/19.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/16.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/18.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/17.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM7/1.jpg", caption: "Classroom" },
    { src: "AdditionalM7/2.jpg", caption: "Classroom" },
    { src: "AdditionalM7/3.jpg", caption: "Classroom" },
    { src: "AdditionalM7/4.jpg", caption: "Classroom" },
    { src: "AdditionalM7/5.jpg", caption: "Classroom" },
    { src: "AdditionalM7/6.jpg", caption: "Classroom" },
    { src: "AdditionalM7/7.jpg", caption: "Classroom" },
    { src: "AdditionalM4/1.jpg", caption: "Intramuros" },
    { src: "AdditionalFile1/122.jpeg", caption: "MBC" },
    { src: "AdditionalFile1/121.gif", caption: "Cantata" },
    { src: "AdditionalFile1/120.gif", caption: "Cantata" },
    { src: "AdditionalFile1/119.jpeg", caption: "SM" },
    { src: "AdditionalFile1/118.jpeg", caption: "Bridge" },
    { src: "AdditionalFile1/117.jpeg", caption: "SM" },
    { src: "AdditionalFile1/116.jpg", caption: "Raja Soliman" },
    { src: "AdditionalFile1/115.jpg", caption: "Bridge" },
    { src: "AdditionalFile1/114.jpg", caption: "Classroom" },
    { src: "AdditionalFile1/112.jpg", caption: "Classroom" },
    { src: "AdditionalFile1/110.jpg", caption: "Classroom" },
    { src: "AdditionalFile1/109.jpg", caption: "Classroom" },
    { src: "Additional-Memory/72.jpeg", caption: "Graduation" },
    { src: "Additional-Memory/73.jpeg", caption: "Classroom" },
    { src: "Additional-Memory/76.jpg", caption: "Classroom" },
    { src: "Additional-Memory/77.jpg", caption: "Classroom" },
    { src: "Additional-Memory/78.jpg", caption: "MBC" },
    { src: "Additional-Memory/79.jpg", caption: "MBC" },
    { src: "Additional-Memory/81.jpg", caption: "MBC" },
    { src: "Additional-Memory/82.jpg", caption: "MBC" },
    { src: "Additional-Memory/83.jpg", caption: "MBC" },
    { src: "Additional-Memory/84.jpg", caption: "Toga" },
    { src: "Additional-Memory/85.jpg", caption: "Intra" },
    { src: "Additional-Memory/86.jpg", caption: "Intra" },
    { src: "Additional-Memory/87.jpg", caption: "Intra" },
    { src: "Additional-Memory/88.jpg", caption: "Intra" },
    { src: "Additional-Memory/89.jpg", caption: "MBC" },
    { src: "Additional-Memory/92.jpeg", caption: "MBC" },
    { src: "Additional-Memory/93.jpeg", caption: "LCT Mall" },
    { src: "Additional-Memory/95.jpg", caption: "😁" },
    { src: "AdditionalM8/IMG_20250416_005345.jpg", caption: "😁" },
    { src: "Additional-Memory/96.jpg", caption: "Raja Soliman" },
    { src: "Additional-Memory/97.jpg", caption: "Classroom" },
    { src: "Additional-Memory/98.jpg", caption: "Classroom" },
    { src: "Additional-Memory/99.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM2/02.jpg", caption: "SM" },
    { src: "AdditionalM2/03.jpg", caption: "Classroom" },
    { src: "AdditionalM2/04.jpg", caption: "WHAT THE!" },
    { src: "AdditionalM2/05.jpg", caption: "Classroom" },
    { src: "AdditionalM2/06.jpg", caption: ". . ." },
    { src: "AdditionalM2/08.jpg", caption: "Classroom" },
    { src: "AdditionalM2/09.jpg", caption: "Classroom" },
    { src: "AdditionalM2/11.jpg", caption: "Classroom" },
    { src: "AdditionalM2/13.jpg", caption: "Classroom" },
    { src: "AdditionalM2/16.jpg", caption: "Classroom" },
    { src: "AdditionalM2/17.jpg", caption: "Classroom" },
    { src: "AdditionalM2/18.jpg", caption: "Classroom" },
    { src: "AdditionalM2/21.jpg", caption: "MBC" },
    { src: "AdditionalM2/22.jpg", caption: "Cater" },
    { src: "AdditionalM2/23.jpg", caption: "Cater" },
    { src: "AdditionalM2/24.jpg", caption: "Classroom" },
    { src: "AdditionalM2/25.jpg", caption: "Cater" },
    { src: "AdditionalM2/26.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM2/27.jpg", caption: "Classroom" },
    { src: "AdditionalM2/28.jpg", caption: "MBC" },
    { src: "AdditionalM2/31.jpg", caption: "MBC" },
    { src: "AdditionalM2/32.jpg", caption: "MBC" },
    { src: "AdditionalM2/33.jpg", caption: "MBC" },
    { src: "AdditionalM2/34.jpg", caption: "Bridge" },
    { src: "AdditionalM2/39.jpg", caption: "MBC" },
    { src: "AdditionalM2/48.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM3/100.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM3/101.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM3/104.jpg", caption: "Graduation" },
    { src: "AdditionalM3/105.jpg", caption: "Cater" },
    { src: "AdditionalM3/106.jpg", caption: "Classroom" },
    { src: "AdditionalM3/108.jpg", caption: "Classroom" },
    { src: "AdditionalM6/21.jpg", caption: "" },
    { src: "AdditionalM6/22.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/1.jpg", caption: "Classroom" },
    { src: "AdditionalM6/2.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/3.jpg", caption: "Classroom" },
    { src: "AdditionalM6/4.jpg", caption: "Baseco" },
    { src: "AdditionalM6/5.jpg", caption: "Classroom" },
    { src: "AdditionalM6/6.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/7.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/8.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/9.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/10.jpg", caption: "UNKNOWN" },
    { src: "AdditionalM6/11.jpg", caption: "Classroom" },
    { src: "AdditionalM6/12.jpg", caption: "Classroom" },
    { src: "AdditionalM6/13.jpg", caption: "Intramuros" },
    { src: "AdditionalM6/14.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM6/15.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/2.jpg", caption: "Funeral" },
    { src: "AdditionalM4/3.jpg", caption: "Funeral" },
    { src: "AdditionalM4/4.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/5.jpg", caption: "Classroom" },
    { src: "AdditionalM4/6.jpg", caption: "MBC" },
    { src: "AdditionalM4/7.jpg", caption: "MBC" },
    { src: "AdditionalM4/8.jpg", caption: "Classroom" },
    { src: "AdditionalM4/9.jpg", caption: "Classroom" },
    { src: "AdditionalM4/10.jpg", caption: "Classroom" },
    { src: "AdditionalM4/11.jpg", caption: "Graduation" },
    { src: "AdditionalM4/12.jpg", caption: "Graduation" },
    { src: "AdditionalM4/13.jpg", caption: "Graduation" },
    { src: "AdditionalM4/14.jpg", caption: "Graduation" },
    { src: "AdditionalM4/15.jpg", caption: "Graduation" },
    { src: "AdditionalM4/16.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/17.jpg", caption: "MBC" },
    { src: "AdditionalM4/18.jpg", caption: "MBC" },
    { src: "AdditionalM4/19.jpg", caption: "MBC" },
    { src: "AdditionalM4/20.jpg", caption: "MBC" },
    { src: "AdditionalM4/21.jpg", caption: "MBC" },
    { src: "AdditionalM4/22.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/23.jpg", caption: "MBC" },
    { src: "AdditionalM4/24.jpg", caption: "MBC" },
    { src: "AdditionalM4/25.jpg", caption: "MBC" },
    { src: "AdditionalM4/26.jpg", caption: "MBC" },
    { src: "AdditionalM4/27.jpg", caption: "MBC" },
    { src: "AdditionalM4/28.jpg", caption: "MBC" },
    { src: "AdditionalM4/29.jpg", caption: "MBC" },
    { src: "AdditionalM4/30.jpg", caption: "MBC" },
    { src: "AdditionalM4/31.jpg", caption: "MBC" },
    { src: "AdditionalM4/32.jpg", caption: "MBC" },
    { src: "AdditionalM4/33.jpg", caption: "MBC" },
    { src: "AdditionalM4/34.jpg", caption: "MBC" },
    { src: "AdditionalM4/35.jpg", caption: "MBC" },
    { src: "AdditionalM4/36.jpg", caption: "MBC" },
    { src: "AdditionalM4/37.jpg", caption: "MBC" },
    { src: "AdditionalM4/38.jpg", caption: "MBC" },
    { src: "AdditionalM4/39.jpg", caption: "Classroom" },
    { src: "AdditionalM4/40.jpg", caption: "Classroom" },
    { src: "AdditionalM4/41.jpg", caption: "Classroom" },
    { src: "AdditionalM4/42.jpg", caption: "Classroom" },
    { src: "AdditionalM4/43.jpg", caption: "Classroom" },
    { src: "AdditionalM4/44.jpg", caption: "Classroom" },
    { src: "AdditionalM4/45.jpg", caption: "Classroom" },
    { src: "AdditionalM4/46.jpg", caption: "Classroom" },
    { src: "AdditionalM4/47.jpg", caption: "Classroom" },
    { src: "AdditionalM4/48.jpg", caption: "Classroom" },
    { src: "AdditionalM4/49.jpg", caption: "Classroom" },
    { src: "AdditionalM4/50.jpg", caption: "Classroom" },
    { src: "AdditionalM4/51.jpg", caption: "Classroom" },
    { src: "AdditionalM4/52.jpg", caption: "Classroom" },
    { src: "AdditionalM4/53.jpg", caption: "Classroom" },
    { src: "AdditionalM4/54.jpg", caption: "Classroom" },
    { src: "AdditionalM4/55.jpg", caption: "Classroom" },
    { src: "AdditionalM4/56.jpg", caption: "Classroom" },
    { src: "AdditionalM4/57.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/58.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/59.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/60.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/61.jpg", caption: "Classroom" },
    { src: "AdditionalM4/62.jpg", caption: "Classroom" },
    { src: "AdditionalM4/63.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/64.jpg", caption: "Road" },
    { src: "AdditionalM4/65.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/66.jpg", caption: "Classroom" },
    { src: "AdditionalM4/67.jpg", caption: "Classroom" },
    { src: "AdditionalM4/68.jpg", caption: "Classroom" },
    { src: "AdditionalM4/69.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/70.jpg", caption: "Baseco" },
    { src: "AdditionalM4/71.jpg", caption: "Baseco" },
    { src: "AdditionalM4/72.jpg", caption: "Classroom" },
    { src: "AdditionalM4/73.jpg", caption: "Classroom" },
    { src: "AdditionalM4/74.jpg", caption: "Classroom" },
    { src: "AdditionalM4/75.jpg", caption: "Classroom" },
    { src: "AdditionalM4/76.jpg", caption: "Classroom" },
    { src: "AdditionalM4/77.jpg", caption: "Intramuros" },
    { src: "AdditionalM4/78.jpg", caption: "Intramuros" },
    { src: "AdditionalM4/79.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/80.jpg", caption: "Classroom" },
    { src: "AdditionalM4/81.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/82.jpg", caption: "Mall" },
    { src: "AdditionalM4/83.jpg", caption: "Classroom" },
    { src: "AdditionalM4/84.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/85.jpg", caption: "Classroom" },
    { src: "AdditionalM4/86.jpg", caption: "Classroom" },
    { src: "AdditionalM4/87.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/88.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4/89.jpg", caption: "Classroom" },
    { src: "AdditionalM4/90.jpg", caption: "Classroom" },
    { src: "AdditionalM4/91.jpg", caption: "Mall" },
    { src: "AdditionalM4/92.jpg", caption: "Mall" },
    { src: "AdditionalM4/93.jpg", caption: "Intramuros" },
    { src: "AdditionalM4/94.jpg", caption: "Baseco" },
    { src: "AdditionalM4/95.jpg", caption: "Baseco" },
    { src: "AdditionalM4/96.jpg", caption: "Baseco" },
    { src: "AdditionalM4/97.jpg", caption: "Baseco" },
    { src: "AdditionalM4/98.jpg", caption: "Baseco" },
    { src: "AdditionalM4/99.jpg", caption: "Baseco" },
    { src: "AdditionalM4.1/100.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/101.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/102.jpg", caption: "UNKNOWN" },
    { src: "AdditionalM4.1/105.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/106.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/107.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/108.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/109.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/110.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/111.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/112.jpg", caption: "Divisoria" },
    { src: "AdditionalM4.1/113.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/114.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/115.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/116.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/117.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/118.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/119.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM4.1/120.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/121.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/122.jpg", caption: "Classroom" },
    { src: "AdditionalM4.1/123.jpg", caption: "Classroom" },
    { src: "AdditionalM5/1.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/2.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/3.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/4.jpg", caption: "Classroom" },
    { src: "AdditionalM5/5.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/6.jpg", caption: "Classroom" },
    { src: "AdditionalM5/7.jpg", caption: "Classroom" },
    { src: "AdditionalM5/8.jpg", caption: "Classroom" },
    { src: "AdditionalM5/9.jpg", caption: "Classroom" },
    { src: "AdditionalM5/10.jpg", caption: "Classroom" },
    { src: "AdditionalM5/11.jpg", caption: "Classroom" },
    { src: "AdditionalM5/12.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/17.jpg", caption: "Classroom" },
    { src: "AdditionalM5/18.jpg", caption: "Classroom" },
    { src: "AdditionalM5/19.jpg", caption: "Classroom" },
    { src: "AdditionalM5/20.jpg", caption: "Classroom" },
    { src: "AdditionalM5/21.jpg", caption: "Classroom" },
    { src: "AdditionalM5/22.jpg", caption: "Classroom" },
    { src: "AdditionalM5/23.jpg", caption: "Classroom" },
    { src: "AdditionalM5/24.jpg", caption: "Classroom" },
    { src: "AdditionalM5/25.jpg", caption: "Classroom" },
    { src: "AdditionalM5/26.jpg", caption: "Classroom" },
    { src: "AdditionalM5/27.jpg", caption: "Classroom" },
    { src: "AdditionalM5/28.jpg", caption: "Classroom" },
    { src: "AdditionalM5/29.jpg", caption: "Classroom" },
    { src: "AdditionalM5/30.jpg", caption: "Classroom" },
    { src: "AdditionalM5/31.jpg", caption: "Classroom" },
    { src: "AdditionalM5/32.jpg", caption: "Classroom" },
    { src: "AdditionalM5/33.jpg", caption: "Classroom" },
    { src: "AdditionalM5/34.jpg", caption: "Classroom" },
    { src: "AdditionalM5/35.jpg", caption: "Classroom" },
    { src: "AdditionalM5/36.jpg", caption: "Classroom" },
    { src: "AdditionalM5/37.jpg", caption: "Classroom" },
    { src: "AdditionalM5/38.jpg", caption: "Classroom" },
    { src: "AdditionalM5/39.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/40.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/41.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/42.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/43.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/44.jpg", caption: "Raja Soliman" },
    { src: "AdditionalM5/45.jpg", caption: "Classroom" },
    { src: "AdditionalM5/46.jpg", caption: "Classroom" },
    { src: "AdditionalM5/47.jpg", caption: "Classroom" },
    { src: "AdditionalM5/48.jpg", caption: "Classroom" },
    { src: "AdditionalM5/49.jpg", caption: "Classroom" },
    { src: "AdditionalM5/50.jpg", caption: "Classroom" },
    { src: "AdditionalM5/51.jpg", caption: "Classroom" },
    { src: "AdditionalM5/52.jpg", caption: "Classroom" },
    { src: "AdditionalM5/53.jpg", caption: "Classroom" }
];

// State variables
let currentImageIndex = 0;
let images = [];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
const totalImagesElement = document.getElementById('totalImages');
const currentYearElement = document.getElementById('currentYear');

// Initialize the gallery
function initGallery() {
    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Update total images count
    totalImagesElement.textContent = imageData.length;
    
    // Create gallery items
    imageData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.caption}" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-expand"></i>
                <div class="gallery-caption">${item.caption}</div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
        
        // Preload images for better performance
        const img = new Image();
        img.src = item.src;
        images.push(img);
    });
}

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Update lightbox content
function updateLightbox() {
    const currentImage = imageData[currentImageIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.caption;
    lightboxCaption.textContent = currentImage.caption || 'No caption';
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageData.length}`;
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
    updateLightbox();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageData.length;
    updateLightbox();
}

// Handle keyboard navigation
function handleKeydown(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
}

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
document.addEventListener('keydown', handleKeydown);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    // Start scroll animations after a short delay to ensure images are loaded
    setTimeout(initScrollAnimations, 300);
    // Initialize background music
    initBackgroundMusic();
});

// Premium Scroll Animation Functions
function initScrollAnimations() {
    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Create scroll hint
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '<i class="fas fa-chevron-down"></i> Scroll to explore';
    document.body.appendChild(scrollHint);
    
    // Get elements to animate
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryHeader = document.querySelector('.gallery-header');
    const starField = document.querySelector('.star-field');
    
    // Intersection Observer for gallery items
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each gallery item
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
        
        // Header and star field effects
        if (winScroll > 100) {
            galleryHeader.classList.add('scrolled');
            starField.classList.add('scrolled');
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            galleryHeader.classList.remove('scrolled');
            starField.classList.remove('scrolled');
            scrollHint.style.opacity = '0.7';
            scrollHint.style.pointerEvents = 'auto';
        }
    }
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        requestAnimationFrame(updateScrollProgress);
    });
    
    // Smooth scroll to gallery on click hint
    scrollHint.addEventListener('click', () => {
        window.scrollTo({
            top: galleryGrid.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    // Remove scroll hint after first scroll
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            setTimeout(() => {
                scrollHint.style.opacity = '0';
                setTimeout(() => {
                    scrollHint.style.display = 'none';
                }, 300);
            }, 1000);
        }
    });
    
    // Initial call
    updateScrollProgress();
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    // Start scroll animations after a short delay to ensure images are loaded
    setTimeout(initScrollAnimations, 300);
});

// Background Music Functions
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicIndicator = document.getElementById('musicIndicator');
    
    // Set volume to maximum (150% is not possible, browsers cap at 100%)
    bgMusic.volume = 1.0; // Maximum volume
    
    // Autoplay with user interaction fallback
    function playMusic() {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Music started successfully
                showMusicIndicator();
                setupMusicControls();
            }).catch(error => {
                // Autoplay prevented, wait for user interaction
                console.log('Autoplay prevented, waiting for user interaction');
                setupMusicControls();
                showMusicIndicator(true); // Show paused state
                
                // Try to play on first user interaction
                document.addEventListener('click', function tryPlayOnClick() {
                    bgMusic.play().then(() => {
                        musicIndicator.classList.remove('paused');
                        showMusicIndicator();
                        document.removeEventListener('click', tryPlayOnClick);
                    }).catch(e => console.log('User declined to play music'));
                }, { once: true });
            });
        }
    }
    
    // Show music indicator with animation
    function showMusicIndicator(isPaused = false) {
        if (isPaused) {
            musicIndicator.classList.add('paused');
        } else {
            musicIndicator.classList.remove('paused');
        }
        
        setTimeout(() => {
            musicIndicator.classList.add('visible');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (!musicIndicator.matches(':hover')) {
                    musicIndicator.classList.remove('visible');
                }
            }, 5000);
        }, 1000);
    }
    
    // Setup music control interactions
    function setupMusicControls() {
        // Toggle play/pause on indicator click
        musicIndicator.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicIndicator.classList.remove('paused');
                    showMusicIndicator();
                });
            } else {
                bgMusic.pause();
                musicIndicator.classList.add('paused');
                showMusicIndicator(true);
            }
        });
        
        // Show indicator on hover
        musicIndicator.addEventListener('mouseenter', () => {
            musicIndicator.classList.add('visible');
        });
        
        // Hide indicator when not hovering (if not playing recently)
        musicIndicator.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!musicIndicator.matches(':hover')) {
                    musicIndicator.classList.remove('visible');
                }
            }, 3000);
        });
        
        // Keyboard shortcuts (M to mute/unmute)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'm' || e.key === 'M') {
                if (bgMusic.muted) {
                    bgMusic.muted = false;
                    musicIndicator.classList.remove('paused');
                } else {
                    bgMusic.muted = true;
                    musicIndicator.classList.add('paused');
                }
                showMusicIndicator(bgMusic.muted || bgMusic.paused);
            }
        });
    }
    
    // Start music
    setTimeout(() => {
        playMusic();
    }, 1000); // Start after 1 second delay
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            bgMusic.pause();
        } else {
            if (!bgMusic.paused && document.hasFocus()) {
                bgMusic.play().catch(() => {
                    // Autoplay might be blocked
                });
            }
        }
    });
}