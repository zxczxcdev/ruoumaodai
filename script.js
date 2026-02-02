// ===================================
// TRADITIONAL CHINESE WINE LANDING PAGE
// JavaScript - Form Validation & Google Sheets Integration
// ===================================

// Configuration
const CONFIG = {
    // TODO: Replace with your Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxA4Xhkbu61BwRpqn0NzGNJ-uKcVW8T1IjJmPqnQaCuORb4MdP0f5l1WOcms7SDrnEJ/exec',
    PACKAGES: {
        single: { name: 'Mua Lẻ Ống', price: 199000, quantity: '1 ống' },
        box1: { name: 'Mua 1 Thùng', price: 1050000, quantity: '1 thùng' },
        box2: { name: 'Mua 2 Thùng', price: 1900000, quantity: '2 thùng' },
    },
    // Product Images for Gallery
    PRODUCT_IMAGES: [
        'assets/product.jpg',
        'assets/product.jpg', // Replace with actual image paths
        'assets/product.jpg',
        'assets/product.jpg',
        'assets/product.jpg',
    ],
    // Countdown Timer Settings
    COUNTDOWN_DURATION: 30 * 60, // 30 minutes in seconds
    COUNTDOWN_STORAGE_KEY: 'promotionCountdownEndTime',
};

// DOM Elements
const elements = {
    form: document.getElementById('orderForm'),
    nameInput: document.getElementById('customerName'),
    phoneInput: document.getElementById('customerPhone'),
    addressInput: document.getElementById('customerAddress'),
    packageInputs: document.querySelectorAll('input[name="package"]'),
    quantityInput: document.getElementById('quantity'),
    qtyMinus: document.getElementById('qtyMinus'),
    qtyPlus: document.getElementById('qtyPlus'),
    submitBtn: document.getElementById('submitBtn'),
    btnText: document.querySelector('.btn-text'),
    btnLoading: document.querySelector('.btn-loading'),
    formMessage: document.getElementById('formMessage'),
    totalAmount: document.getElementById('totalAmount'),
    nameError: document.getElementById('nameError'),
    phoneError: document.getElementById('phoneError'),
    addressError: document.getElementById('addressError'),
    packageError: document.getElementById('packageError'),
    quantityError: document.getElementById('quantityError'),
    successModal: document.getElementById('successModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
};

// ===================================
// VALIDATION FUNCTIONS
// ===================================

/**
 * Validate customer name
 * @param {string} name - Customer name
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateName(name) {
    name = name.trim();
    
    if (!name) {
        return { valid: false, message: 'Vui lòng nhập họ và tên' };
    }
    
    if (name.length < 2) {
        return { valid: false, message: 'Tên phải có ít nhất 2 ký tự' };
    }
    
    if (name.length > 100) {
        return { valid: false, message: 'Tên quá dài' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate Vietnamese phone number
 * @param {string} phone - Phone number
 * @returns {Object} - {valid: boolean, message: string}
 */
function validatePhone(phone) {
    phone = phone.trim().replace(/\s/g, '');
    
    if (!phone) {
        return { valid: false, message: 'Vui lòng nhập số điện thoại' };
    }
    
    // Vietnamese phone format: starts with 0, 10-11 digits
    const phoneRegex = /^0\d{9,10}$/;
    
    if (!phoneRegex.test(phone)) {
        return { valid: false, message: 'Số điện thoại không hợp lệ (VD: 0123456789)' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate address
 * @param {string} address - Delivery address
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateAddress(address) {
    address = address.trim();
    
    if (!address) {
        return { valid: false, message: 'Vui lòng nhập địa chỉ nhận hàng' };
    }
    
    if (address.length < 10) {
        return { valid: false, message: 'Địa chỉ quá ngắn, vui lòng nhập đầy đủ' };
    }
    
    if (address.length > 500) {
        return { valid: false, message: 'Địa chỉ quá dài' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate package selection
 * @param {string} packageType - Selected package type
 * @returns {Object} - {valid: boolean, message: string}
 */
function validatePackage(packageType) {
    if (!packageType) {
        return { valid: false, message: 'Vui lòng chọn gói sản phẩm' };
    }
    
    if (!CONFIG.PACKAGES[packageType]) {
        return { valid: false, message: 'Gói sản phẩm không hợp lệ' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Display error message for a field
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear error message for a field
 * @param {HTMLElement} errorElement - Error message element
 */
function clearError(errorElement) {
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// ===================================
// PACKAGE SELECTION CONTROL
// ===================================

/**
 * Get selected package
 * @returns {string|null} - Selected package type
 */
function getSelectedPackage() {
    const selectedInput = Array.from(elements.packageInputs).find(input => input.checked);
    return selectedInput ? selectedInput.value : null;
}

/**
 * Get quantity value
 * @returns {number} - Quantity (default 1)
 */
function getQuantity() {
    const qty = parseInt(elements.quantityInput.value, 10);
    return isNaN(qty) || qty < 1 ? 1 : qty;
}

/**
 * Update quantity display
 * @param {number} newQty - New quantity value
 */
function setQuantity(newQty) {
    const qty = Math.max(1, Math.min(99, newQty));
    elements.quantityInput.value = qty;
    
    // Update button states
    elements.qtyMinus.disabled = qty <= 1;
    elements.qtyPlus.disabled = qty >= 99;
    
    updateTotal();
}

/**
 * Decrease quantity
 */
function decreaseQuantity() {
    const currentQty = getQuantity();
    if (currentQty > 1) {
        setQuantity(currentQty - 1);
    }
}

/**
 * Increase quantity
 */
function increaseQuantity() {
    const currentQty = getQuantity();
    if (currentQty < 99) {
        setQuantity(currentQty + 1);
    }
}

/**
 * Update total price display (package price × quantity)
 * Shows: Original Price (35% higher), Sale Price, and Savings
 */
function updateTotal() {
    const packageType = getSelectedPackage();
    const quantity = getQuantity();
    
    if (packageType && CONFIG.PACKAGES[packageType]) {
        const packagePrice = CONFIG.PACKAGES[packageType].price;
        const saleTotal = packagePrice * quantity;
        
        // Calculate original price (35% higher than sale price)
        const originalTotal = Math.round(saleTotal * 1.35);
        const savings = originalTotal - saleTotal;
        
        // Update DOM
        const totalOriginalEl = document.getElementById('totalOriginal');
        const totalAmountEl = document.getElementById('totalAmount');
        const savingsAmountEl = document.getElementById('savingsAmount');
        
        if (totalOriginalEl) {
            totalOriginalEl.textContent = formatCurrency(originalTotal);
        }
        
        if (totalAmountEl) {
            totalAmountEl.textContent = formatCurrency(saleTotal);
        }
        
        if (savingsAmountEl) {
            savingsAmountEl.textContent = formatCurrency(savings);
        }
    } else {
        // Reset to zeros if no package selected
        const totalOriginalEl = document.getElementById('totalOriginal');
        const totalAmountEl = document.getElementById('totalAmount');
        const savingsAmountEl = document.getElementById('savingsAmount');
        
        if (totalOriginalEl) totalOriginalEl.textContent = '0đ';
        if (totalAmountEl) totalAmountEl.textContent = '0đ';
        if (savingsAmountEl) savingsAmountEl.textContent = '0đ';
    }
}

/**
 * Format number to Vietnamese currency
 * @param {number} amount - Amount in VND
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// ===================================
// PRODUCT CAROUSEL SLIDER
// ===================================

let currentSlide = 0;
let autoSlideInterval;
const AUTO_SLIDE_DELAY = 4000; // 4 seconds

/**
 * Get carousel DOM elements
 */
function getCarouselElements() {
    return {
        slides: document.querySelectorAll('.carousel-slide'),
        dots: document.querySelectorAll('.dot'),
        prevBtn: document.getElementById('carouselPrev'),
        nextBtn: document.getElementById('carouselNext'),
        track: document.getElementById('carouselTrack'),
    };
}

/**
 * Show specific slide
 * @param {number} index - Slide index to show
 */
function showSlide(index) {
    const carousel = getCarouselElements();
    const totalSlides = carousel.slides.length;
    
    // Wrap around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // Update slides
    carousel.slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots
    carousel.dots.forEach((dot, i) => {
        if (i === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Next slide
 */
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

/**
 * Previous slide
 */
function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

/**
 * Start auto-slide
 */
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, AUTO_SLIDE_DELAY);
}

/**
 * Stop auto-slide
 */
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

/**
 * Reset auto-slide timer
 */
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

/**
 * Setup carousel event listeners
 */
function setupCarousel() {
    const carousel = getCarouselElements();
    
    // Navigation buttons
    if (carousel.prevBtn) {
        carousel.prevBtn.addEventListener('click', prevSlide);
    }
    
    if (carousel.nextBtn) {
        carousel.nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dots click
    carousel.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const container = carousel.track?.parentElement;
    
    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - prev slide
                prevSlide();
            }
        }
    }
    
    // Pause on hover
    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto-slide
    startAutoSlide();
}

// ===================================
// COUNTDOWN TIMER
// ===================================

let countdownInterval;

/**
 * Get countdown end time (from localStorage or create new)
 */
function getCountdownEndTime() {
    const stored = localStorage.getItem(CONFIG.COUNTDOWN_STORAGE_KEY);
    
    if (stored) {
        const endTime = parseInt(stored, 10);
        const now = Date.now();
        
        // If countdown hasn't expired, use stored time
        if (endTime > now) {
            return endTime;
        }
    }
    
    // Create new countdown (30 minutes from now)
    const newEndTime = Date.now() + (CONFIG.COUNTDOWN_DURATION * 1000);
    localStorage.setItem(CONFIG.COUNTDOWN_STORAGE_KEY, newEndTime.toString());
    return newEndTime;
}

/**
 * Update countdown display
 */
function updateCountdown() {
    const endTime = getCountdownEndTime();
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);
    
    // Calculate minutes and seconds
    const totalSeconds = Math.floor(remaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Update DOM
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const wrapper = document.querySelector('.countdown-wrapper');
    
    if (minutesEl && secondsEl) {
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Add urgent class if less than 5 minutes
    if (wrapper) {
        if (minutes < 5) {
            wrapper.classList.add('urgent');
        } else {
            wrapper.classList.remove('urgent');
        }
    }
    
    // If countdown finished, reset it
    if (remaining === 0) {
        resetCountdown();
    }
}

/**
 * Reset countdown to 30 minutes
 */
function resetCountdown() {
    const newEndTime = Date.now() + (CONFIG.COUNTDOWN_DURATION * 1000);
    localStorage.setItem(CONFIG.COUNTDOWN_STORAGE_KEY, newEndTime.toString());
}

/**
 * Start countdown timer
 */
function startCountdown() {
    // Initial update
    updateCountdown();
    
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Stop countdown timer
 */
function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
}

// ===================================
// FOMO EFFECTS
// ===================================

let fomoInterval;

/**
 * Update inline countdown boxes (hours, minutes, seconds)
 */
function updateInlineCountdown() {
    const endTime = getCountdownEndTime();
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);
    
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Update DOM
    const hoursBox = document.getElementById('hoursBox');
    const minutesBox = document.getElementById('minutesBox');
    const secondsBox = document.getElementById('secondsBox');
    
    if (hoursBox) hoursBox.textContent = hours.toString().padStart(2, '0');
    if (minutesBox) minutesBox.textContent = minutes.toString().padStart(2, '0');
    if (secondsBox) secondsBox.textContent = seconds.toString().padStart(2, '0');
    
    // Reset if needed
    if (remaining === 0) {
        resetCountdown();
    }
}

/**
 * Update stock count (random between 8-15)
 */
function updateStockCount() {
    const stockEl = document.getElementById('stockCount');
    if (stockEl) {
        const count = Math.floor(Math.random() * 8) + 8; // 8-15
        stockEl.textContent = count;
    }
}

/**
 * Update viewer count (random between 18-35)
 */
function updateViewerCount() {
    const viewerEl = document.getElementById('viewerCount');
    if (viewerEl) {
        const count = Math.floor(Math.random() * 18) + 18; // 18-35
        viewerEl.textContent = count;
    }
}

/**
 * Start FOMO effects
 */
function startFOMO() {
    // Initial update
    updateInlineCountdown();
    updateStockCount();
    updateViewerCount();
    
    // Update countdown every second
    fomoInterval = setInterval(() => {
        updateInlineCountdown();
    }, 1000);
    
    // Update stock every 8 seconds
    setInterval(updateStockCount, 8000);
    
    // Update viewers every 5 seconds
    setInterval(updateViewerCount, 5000);
}

/**
 * Stop FOMO effects
 */
function stopFOMO() {
    if (fomoInterval) {
        clearInterval(fomoInterval);
    }
}

// ===================================
// FORM SUBMISSION
// ===================================

/**
 * Show loading state
 */
function showLoading() {
    elements.submitBtn.disabled = true;
    elements.btnText.style.display = 'none';
    elements.btnLoading.style.display = 'inline';
}

/**
 * Hide loading state
 */
function hideLoading() {
    elements.submitBtn.disabled = false;
    elements.btnText.style.display = 'inline';
    elements.btnLoading.style.display = 'none';
}

/**
 * Show success modal
 */
function showSuccessModal() {
    elements.successModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

/**
 * Hide success modal
 */
function hideSuccessModal() {
    elements.successModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showFormError(message) {
    elements.formMessage.textContent = message;
    elements.formMessage.className = 'form-message error';
}

/**
 * Submit order to Google Sheets
 * @param {Object} orderData - Order data
 */
async function submitToGoogleSheets(orderData) {
    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        
        // Note: With no-cors, we can't read the response
        // Assume success if no error is thrown
        return { success: true };
        
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous messages
    elements.formMessage.style.display = 'none';
    
    // Get selected package
    const packageType = getSelectedPackage();
    const quantity = getQuantity();
    
    // Get form values
    const formData = {
        name: elements.nameInput.value.trim(),
        phone: elements.phoneInput.value.trim().replace(/\s/g, ''),
        address: elements.addressInput.value.trim(),
        package: packageType,
        quantity: quantity,
    };
    
    // Validate all fields
    const nameValidation = validateName(formData.name);
    const phoneValidation = validatePhone(formData.phone);
    const addressValidation = validateAddress(formData.address);
    const packageValidation = validatePackage(formData.package);
    
    // Show errors
    if (!nameValidation.valid) {
        showError(elements.nameError, nameValidation.message);
    } else {
        clearError(elements.nameError);
    }
    
    if (!phoneValidation.valid) {
        showError(elements.phoneError, phoneValidation.message);
    } else {
        clearError(elements.phoneError);
    }
    
    if (!addressValidation.valid) {
        showError(elements.addressError, addressValidation.message);
    } else {
        clearError(elements.addressError);
    }
    
    if (!packageValidation.valid) {
        showError(elements.packageError, packageValidation.message);
    } else {
        clearError(elements.packageError);
    }
    
    // Stop if validation fails
    if (!nameValidation.valid || !phoneValidation.valid || 
        !addressValidation.valid || !packageValidation.valid) {
        return;
    }
    
    // Check if Google Script URL is configured
    if (CONFIG.GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        showFormError('⚠️ Vui lòng cấu hình Google Apps Script URL trong file script.js');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Get package details
    const packageDetails = CONFIG.PACKAGES[formData.package];
    const totalPrice = packageDetails.price * quantity;
    
    // Prepare order data
    const orderData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        package: packageDetails.name,
        quantity: quantity,
        unitPrice: packageDetails.price,
        total: totalPrice,
        status: 'Mới',
    };
    
    // Submit to Google Sheets
    const result = await submitToGoogleSheets(orderData);
    
    // Hide loading
    hideLoading();
    
    if (result.success) {
        // Success - Show Modal
        showSuccessModal();
        
        // Reset form
        elements.form.reset();
        // Reset to first package option
        if (elements.packageInputs[0]) {
            elements.packageInputs[0].checked = true;
        }
        // Reset quantity to 1
        setQuantity(1);
        updateTotal();
        
        // Clear errors
        clearError(elements.nameError);
        clearError(elements.phoneError);
        clearError(elements.addressError);
        clearError(elements.packageError);
        
    } else {
        // Error
        showFormError('❌ Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại hoặc liên hệ hotline.');
    }
}

// ===================================
// REAL-TIME VALIDATION
// ===================================

/**
 * Add real-time validation to inputs
 */
function setupRealTimeValidation() {
    // Name validation on blur
    elements.nameInput.addEventListener('blur', () => {
        const validation = validateName(elements.nameInput.value);
        if (!validation.valid) {
            showError(elements.nameError, validation.message);
        } else {
            clearError(elements.nameError);
        }
    });
    
    // Phone validation on blur
    elements.phoneInput.addEventListener('blur', () => {
        const validation = validatePhone(elements.phoneInput.value);
        if (!validation.valid) {
            showError(elements.phoneError, validation.message);
        } else {
            clearError(elements.phoneError);
        }
    });
    
    // Address validation on blur
    elements.addressInput.addEventListener('blur', () => {
        const validation = validateAddress(elements.addressInput.value);
        if (!validation.valid) {
            showError(elements.addressError, validation.message);
        } else {
            clearError(elements.addressError);
        }
    });
    
    // Package selection change
    elements.packageInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateTotal();
            clearError(elements.packageError);
        });
    });
    
    // Clear errors on input
    elements.nameInput.addEventListener('input', () => clearError(elements.nameError));
    elements.phoneInput.addEventListener('input', () => clearError(elements.phoneError));
    elements.addressInput.addEventListener('input', () => clearError(elements.addressError));
}

// ===================================
// SMOOTH SCROLL
// ===================================

/**
 * Smooth scroll to element
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application
 */
function init() {
    // Package selection event listeners
    elements.packageInputs.forEach(input => {
        input.addEventListener('change', updateTotal);
    });
    
    // Quantity buttons
    elements.qtyMinus.addEventListener('click', decreaseQuantity);
    elements.qtyPlus.addEventListener('click', increaseQuantity);
    
    // Quantity input change (for manual edits)
    elements.quantityInput.addEventListener('change', () => {
        setQuantity(getQuantity());
    });
    
    // Form submission
    elements.form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    setupRealTimeValidation();
    
    // Smooth scroll
    setupSmoothScroll();
    
    // Buy Now Button - Scroll to Order Section
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Product Carousel Slider
    setupCarousel();
    
    // Countdown Timer
    startCountdown();
    
    // FOMO Effects
    startFOMO();
    
    // Modal close button
    elements.closeModalBtn.addEventListener('click', hideSuccessModal);
    
    // Close modal when clicking outside
    elements.successModal.addEventListener('click', (e) => {
        if (e.target === elements.successModal) {
            hideSuccessModal();
        }
    });
    
    // Initialize total and quantity
    setQuantity(1);
    updateTotal();
    
    console.log('🏮 Traditional Chinese Wine Landing Page Initialized');
    console.log('⚠️ Remember to configure GOOGLE_SCRIPT_URL in script.js');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
