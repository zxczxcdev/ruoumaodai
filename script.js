// ===================================
// ROYAL BAMBOO WINE LANDING PAGE
// JavaScript Logic - Premium Experience
// ===================================

const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxA4Xhkbu61BwRpqn0NzGNJ-uKcVW8T1IjJmPqnQaCuORb4MdP0f5l1WOcms7SDrnEJ/exec',
    PACKAGES: {
        single: { name: 'Dùng Thử (1 Ống)', price: 199000, original: 300000 },
        box1: { name: '1 Thùng (6 Ống)', price: 1050000, original: 1350000 }, // Popular
        box2: { name: '2 Thùng (12 Ống)', price: 1900000, original: 2200000 },
    }
};

// === DOM ELEMENTS ===
const els = {
    packageLabels: document.querySelectorAll('.package-label'),
    packageCards: document.querySelectorAll('.package-card'),
    qtyDisplay: document.getElementById('quantity'),
    qtyMinus: document.getElementById('qtyMinus'),
    qtyPlus: document.getElementById('qtyPlus'),
    totalAmount: document.getElementById('totalAmount'),
    savingsAmount: document.getElementById('savingsAmount'),
    form: document.getElementById('orderForm'),
    submitBtn: document.getElementById('submitBtn'),
    successModal: document.getElementById('successModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    stickyFooter: document.getElementById('stickyFooter'),
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    setupPackageSelection();
    setupQuantityControl();
    setupCarousel();
    setupStickyFooter();
    setupFormSubmission();
    setupGalleryLightbox(); // Gallery lightbox
    updateTotal(); // Calc initial state
    
    // AOS Init (handled in HTML, but good to ensure load)
    if(typeof AOS !== 'undefined') AOS.init();
});

// === PACKAGE SELECTION LOGIC ===
function setupPackageSelection() {
    // Query elements AFTER DOM is ready
    const packageLabels = document.querySelectorAll('.package-label');
    const packageCards = document.querySelectorAll('.package-card');
    
    packageLabels.forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        const card = label.querySelector('.package-card');
        
        // Handle both change and click events
        const updateSelection = () => {
            // Update Visuals
            packageCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Ensure radio is checked
            radio.checked = true;
            
            // Recalculate Total
            updateTotal();
        };
        
        radio.addEventListener('change', updateSelection);
        label.addEventListener('click', updateSelection);
    });
}

// === QUANTITY CONTROL ===
function setupQuantityControl() {
    els.qtyMinus.addEventListener('click', () => {
        let val = parseInt(els.qtyDisplay.textContent);
        if (val > 1) {
            els.qtyDisplay.textContent = val - 1;
            updateTotal();
            updateButtonStates(val - 1);
        }
    });

    els.qtyPlus.addEventListener('click', () => {
        let val = parseInt(els.qtyDisplay.textContent);
        if (val < 50) {
            els.qtyDisplay.textContent = val + 1;
            updateTotal();
            updateButtonStates(val + 1);
        }
    });
}

function updateButtonStates(qty) {
    els.qtyMinus.disabled = qty <= 1;
    els.qtyPlus.disabled = qty >= 50;
}

// === TOTAL CALCULATION ===
function updateTotal() {
    const selectedRadio = document.querySelector('input[name="package"]:checked');
    if (!selectedRadio) return;

    const pkgKey = selectedRadio.value;
    const pkgData = CONFIG.PACKAGES[pkgKey];
    const qty = parseInt(els.qtyDisplay.textContent) || 1;

    const total = pkgData.price * qty;
    const original = pkgData.original * qty;
    const savings = original - total;

    els.totalAmount.textContent = formatMoney(total);
    els.savingsAmount.textContent = formatMoney(savings);
}

function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// === CAROUSEL ===
function setupCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('carouselNext');
    const prevBtn = document.getElementById('carouselPrev');
    
    let currentIndex = 0;
    
    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        });
    }

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }, 5000);
}

// === STICKY FOOTER VISIBILITY ===
function setupStickyFooter() {
    const hero = document.querySelector('.hero');
    if (!hero || !els.stickyFooter) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        // Show if scrolled past hero
        if (scrollY > heroHeight) {
            els.stickyFooter.classList.add('visible');
        } else {
            els.stickyFooter.classList.remove('visible');
        }
    });
}

// === FORM HANDLING ===
function setupFormSubmission() {
    els.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic Validation
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        if (phone.length < 10) {
            alert('Vui lòng nhập số điện thoại hợp lệ (10 số)');
            return;
        }

        // Show Loading
        const btnText = els.submitBtn.querySelector('.btn-text');
        const btnLoading = els.submitBtn.querySelector('.btn-loading');
        els.submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';

        // Prepare Data
        const selectedRadio = document.querySelector('input[name="package"]:checked');
        const pkgData = CONFIG.PACKAGES[selectedRadio.value];
        const qty = parseInt(els.qtyDisplay.textContent) || 1;

        const data = {
            timestamp: new Date().toISOString(),
            name: name,
            phone: phone,
            address: document.getElementById('customerAddress').value.trim(),
            package: pkgData.name,
            quantity: qty,
            total: pkgData.price * qty,
            status: 'New Order'
        };

        try {
            await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // Success
            els.successModal.classList.add('show');
            els.form.reset();
            
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline.');
        } finally {
            // Reset Button
            els.submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }
    });

    els.closeModalBtn.addEventListener('click', () => {
        els.successModal.classList.remove('show');
    });
}
