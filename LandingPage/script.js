/**
 * Mitti - Handmade Stories
 * Interactive Features & Responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');

  const cartBadge = document.getElementById('cartBadge');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  const toastNotification = document.getElementById('toastNotification');

  const filterButtons = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialsTrack = document.getElementById('testimonialsTrack');

  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  const watchStoryBtn = document.getElementById('watchStoryBtn');

  let cartCount = 2; // Default cart count matching design mockup

  // 1. Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Search Overlay Toggle
  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
      });
    }

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  // 4. Toast Notification Utility
  let toastTimer;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // 5. Add to Cart Functionality
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const productName = button.getAttribute('data-name') || 'Product';
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartBadge.style.transform = 'scale(1)';
        }, 200);
      }
      showToast(`Added "${productName}" to your bag`);
    });
  });

  // 6. Wishlist Toggle
  wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = button.classList.toggle('active');
      const card = button.closest('.product-card');
      const title = card ? card.querySelector('.product-title')?.textContent : 'Item';

      if (isActive) {
        showToast(`Saved "${title}" to your wishlist`);
      } else {
        showToast(`Removed "${title}" from your wishlist`);
      }
    });
  });

  // 7. Category Filter Functionality
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active pill state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Testimonials Carousel Navigation
  if (testimonialPrev && testimonialNext && testimonialsTrack) {
    let currentSlide = 0;
    const cards = testimonialsTrack.querySelectorAll('.testimonial-card');

    testimonialNext.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // On mobile, scroll smoothly to next card
        const cardWidth = cards[0]?.offsetWidth || 300;
        testimonialsTrack.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
      } else {
        currentSlide = (currentSlide + 1) % cards.length;
        cards.forEach((card, idx) => {
          card.style.transform = `scale(${idx === currentSlide ? 1.02 : 1})`;
        });
      }
    });

    testimonialPrev.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const cardWidth = cards[0]?.offsetWidth || 300;
        testimonialsTrack.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
      } else {
        currentSlide = (currentSlide - 1 + cards.length) % cards.length;
        cards.forEach((card, idx) => {
          card.style.transform = `scale(${idx === currentSlide ? 1.02 : 1})`;
        });
      }
    });
  }

  // 9. Newsletter Form Submission
  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (!email || !email.includes('@')) {
        newsletterFeedback.textContent = 'Please enter a valid email address.';
        newsletterFeedback.style.color = '#ffd1c2';
        return;
      }

      newsletterFeedback.textContent = 'Welcome to Mitti! Your 10% code: SOUL10 has been sent to ' + email;
      newsletterFeedback.style.color = '#fff6ea';
      newsletterEmail.value = '';
      showToast('Thank you for subscribing! Check your inbox for 10% off.');
    });
  }

  // 10. Mobile Footer Accordion
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (window.innerWidth > 768) return; // Only enable accordion on mobile
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // Close other accordions for clean single view
      accordionTriggers.forEach(t => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
        }
      });

      trigger.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // 11. "Watch Their Story" Modal
  if (watchStoryBtn) {
    watchStoryBtn.addEventListener('click', () => {
      showToast('Opening artisan documentary video...');
    });
  }
});
