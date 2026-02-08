// === GALLERY LIGHTBOX ===
function setupGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // Open lightbox when clicking gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.getAttribute('data-src') || this.src;
            lightboxCaption.textContent = this.alt;
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}
