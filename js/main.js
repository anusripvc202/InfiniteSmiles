/* ==========================================================================
   Priyanka's Infinite Smiles – Advanced Dental Studio
   Interactive Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const CLINIC_WHATSAPP_NUMBER = '917893146767';
  const CLINIC_EMAIL = 'infinitesmilesdentalstudio@gmail.com';

  /* ------------------------------------------------------------------------
     1. Sticky Navbar Scroll Effect & SPA Progress
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('mainNavbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('navbar-scrolled', scrollY > 24);
    }
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      scrollProgressBar.style.width = `${pct}%`;
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('is-visible', scrollY > 420);
    }
  }

  // SPA hash sync on anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', () => {
      const hash = anchor.getAttribute('href');
      if (hash && hash.length > 1 && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', hash);
      }
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     2. Scroll Reveal & Real-Figure Counter Animation
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  const counterEls = document.querySelectorAll('.counter-value');

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    counterEls.forEach((el) => animateCounter(el));
  }

  /* ------------------------------------------------------------------------
     2b. Patient Stories Live Transparent Floating Hearts (Visible-Triggered)
     ------------------------------------------------------------------------ */
  const testimonialsSec = document.getElementById('testimonials');
  const heartsLayer = document.getElementById('testimonialsHeartsLayer');

  if (testimonialsSec && heartsLayer) {
    const heartConfigs = [
      { left: '4%', size: 28, dur: 8.5, delay: -1.5, sway: '22px', opacity: 0.48, color: '#60CBF4', outline: true },
      { left: '10%', size: 22, dur: 10.2, delay: -6.2, sway: '-18px', opacity: 0.40, color: '#C49B3E', outline: false },
      { left: '16%', size: 36, dur: 9.4, delay: -3.1, sway: '26px', opacity: 0.36, color: '#60CBF4', outline: false },
      { left: '22%', size: 24, dur: 7.8, delay: -5.4, sway: '-20px', opacity: 0.46, color: '#60CBF4', outline: true },
      { left: '29%', size: 42, dur: 11.4, delay: -2.2, sway: '18px', opacity: 0.34, color: '#DFC585', outline: false },
      { left: '36%', size: 26, dur: 8.9, delay: -7.1, sway: '-24px', opacity: 0.44, color: '#60CBF4', outline: false },
      { left: '43%', size: 34, dur: 9.8, delay: -4.2, sway: '20px', opacity: 0.38, color: '#C49B3E', outline: true },
      { left: '50%', size: 24, dur: 8.2, delay: -1.0, sway: '-16px', opacity: 0.48, color: '#60CBF4', outline: true },
      { left: '57%', size: 38, dur: 10.8, delay: -8.3, sway: '24px', opacity: 0.36, color: '#60CBF4', outline: false },
      { left: '64%', size: 26, dur: 8.7, delay: -3.5, sway: '-22px', opacity: 0.42, color: '#C49B3E', outline: true },
      { left: '71%', size: 32, dur: 9.6, delay: -6.8, sway: '18px', opacity: 0.44, color: '#60CBF4', outline: false },
      { left: '78%', size: 24, dur: 7.9, delay: -2.6, sway: '-18px', opacity: 0.45, color: '#DFC585', outline: false },
      { left: '85%', size: 36, dur: 11.0, delay: -5.9, sway: '-14px', opacity: 0.38, color: '#60CBF4', outline: true },
      { left: '91%', size: 26, dur: 9.1, delay: -0.9, sway: '20px', opacity: 0.44, color: '#60CBF4', outline: false },
      { left: '13%', size: 30, dur: 12.1, delay: -9.4, sway: '20px', opacity: 0.38, color: '#60CBF4', outline: true },
      { left: '47%', size: 28, dur: 10.5, delay: -7.8, sway: '-20px', opacity: 0.40, color: '#60CBF4', outline: false },
      { left: '68%', size: 30, dur: 11.6, delay: -4.9, sway: '22px', opacity: 0.38, color: '#C49B3E', outline: false },
      { left: '88%', size: 32, dur: 10.4, delay: -8.1, sway: '-22px', opacity: 0.36, color: '#60CBF4', outline: true }
    ];

    heartConfigs.forEach((cfg) => {
      const span = document.createElement('span');
      span.className = 'floating-heart';
      span.style.left = cfg.left;
      span.style.width = `${cfg.size}px`;
      span.style.height = `${cfg.size}px`;
      span.style.animationDuration = `${cfg.dur}s`;
      span.style.animationDelay = `${cfg.delay}s`;
      span.style.setProperty('--heart-sway', cfg.sway);
      span.style.setProperty('--heart-opacity', String(cfg.opacity));

      const fill = cfg.outline ? 'none' : cfg.color;
      const stroke = cfg.color;
      const strokeWidth = cfg.outline ? '2.2' : '0';

      span.innerHTML =
        `<svg viewBox="0 0 24 24" width="${cfg.size}" height="${cfg.size}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}">` +
        `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>` +
        `</svg>`;
      heartsLayer.appendChild(span);
    });

    const syncHeartsVisibility = () => {
      const rect = testimonialsSec.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      testimonialsSec.classList.toggle('hearts-active', visible);
    };

    if ('IntersectionObserver' in window) {
      const heartsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            testimonialsSec.classList.toggle('hearts-active', entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      heartsObserver.observe(testimonialsSec);
    }

    window.addEventListener('scroll', syncHeartsVisibility, { passive: true });
    syncHeartsVisibility();
  }

  /* ------------------------------------------------------------------------
     3. Dental Treatments Data, Modal & Appointment Form Pre-Selection
     ------------------------------------------------------------------------ */
  const TREATMENT_DETAILS = {
    'Dental Implants': {
      badge: 'Restorative & Implantology',
      overview:
        'Permanent, natural-looking titanium tooth replacements anchored securely into the jawbone to restore full chewing function, facial support, and smile aesthetics.',
      highlights: [
        'Digital 3D diagnostic planning for precise implant placement',
        'Biocompatible implants with custom shade-matched crowns',
        'Single-tooth, multiple-tooth, and full-arch solutions',
        'Preserves surrounding natural teeth and prevents bone loss'
      ],
      expectation: 'Comprehensive consultation & imaging on Day 1, followed by gentle guided placement and final crown restoration.'
    },
    'Root Canal Treatment': {
      badge: 'Pain-Free Endodontics',
      overview:
        'Gentle, modern endodontic therapy designed to eliminate toothache, clear deep root infection, and preserve your natural tooth comfortably.',
      highlights: [
        'Effective local anesthesia for a calm, pain-free visit',
        'Rotary endodontic precision and digital apex location',
        'Single-sitting option available for eligible cases',
        'Protective crown restoration to reinforce tooth strength'
      ],
      expectation: 'Most routine root canal treatments are completed comfortably in 1–2 streamlined studio appointments.'
    },
    'Teeth Whitening': {
      badge: 'Cosmetic Brightening',
      overview:
        'Clinically supervised whitening protocols that safely lift deep coffee, tea, and age-related stains while protecting tooth enamel and minimizing sensitivity.',
      highlights: [
        'Enamel-safe desensitizing formulation',
        'Noticeably brighter shade in a single in-studio session',
        'Custom take-home touch-up trays available',
        'Even, natural luminosity without chalky over-bleaching'
      ],
      expectation: 'Quick 45–60 minute studio brightening session after a routine dental polish check.'
    },
    'Braces & Aligners': {
      badge: 'Orthodontics & Invisalign',
      overview:
        'Customized orthodontic care for teens and adults—from discreet clear aligners (including Invisalign) to precision ceramic and metal braces.',
      highlights: [
        'Clear, removable aligners for virtually invisible straightening',
        'Ceramic & self-ligating braces for complex bite corrections',
        'Specialist orthodontist monitoring throughout your journey',
        'Improves both smile symmetry and long-term bite health'
      ],
      expectation: 'Digital bite assessment and personalized alignment roadmap reviewed during your orthodontic consult.'
    },
    'Smile Designing': {
      badge: 'Aesthetic Studio Care',
      overview:
        'Bespoke cosmetic smile architecture combining porcelain veneers, composite bonding, contouring, and whitening tailored to your facial proportions.',
      highlights: [
        'Facial-harmony evaluation before any enamel work',
        'Minimally invasive porcelain veneers and aesthetic bonding',
        'Addresses chips, gaps, discoloration, and uneven edges',
        'Natural translucency matched to your complexion'
      ],
      expectation: 'Dedicated smile consultation, shade selection, and staged artistic fabrication for balanced results.'
    },
    'Crowns & Bridges': {
      badge: 'Prosthodontic Restorations',
      overview:
        'High-strength zirconia and ceramic crowns and bridges engineered to protect weakened teeth or bridge missing tooth spaces seamlessly.',
      highlights: [
        'Metal-free zirconia and all-ceramic natural translucency',
        'Precision margin fit to protect underlying gum health',
        'Restores comfortable biting and natural speech',
        'Custom shade matching to adjacent natural teeth'
      ],
      expectation: 'Usually completed in two visits: gentle tooth preparation & scan, followed by final bonding.'
    },
    'Pediatric Dentistry': {
      badge: 'Gentle Kids’ Care',
      overview:
        'Warm, fear-free dental visits crafted especially for children to establish positive lifelong oral hygiene habits and protect growing smiles.',
      highlights: [
        'Kid-friendly, patient communication to ease dental anxiety',
        'Preventive fluoride applications and pit-and-fissure sealants',
        'Gentle cavity care and space maintainers',
        'Guidance for parents on brushing, nutrition, and jaw growth'
      ],
      expectation: 'Calm, welcoming checkups paced to your child’s comfort level.'
    },
    'General Dentistry': {
      badge: 'Preventive & Family Care',
      overview:
        'Foundational checkups, ultrasonic scaling and polishing, tooth-colored fillings, and early diagnostics to keep every family member’s smile healthy.',
      highlights: [
        'Thorough oral examinations and digital dental X-rays',
        'Ultrasonic plaque and tartar removal for gum wellness',
        'Mercury-free, tooth-colored composite fillings',
        'Personalized 6-month preventive recall plans'
      ],
      expectation: 'Recommended every 6 months for effortless prevention and early detection.'
    },
    'Laser Dentistry': {
      badge: 'Minimally Invasive Tech',
      overview:
        'Advanced dental laser applications for soft-tissue contouring, gum depigmentation, periodontal care, and faster, gentler healing.',
      highlights: [
        'Minimal bleeding and reduced need for sutures',
        'Lower post-procedure discomfort and rapid recovery',
        'Precision gum sculpting for balanced smile proportions',
        'Effective bacterial reduction in gum treatments'
      ],
      expectation: 'Short, targeted outpatient visits with minimal downtime.'
    }
  };

  const treatmentModalEl = document.getElementById('treatmentModal');
  const treatmentModal = treatmentModalEl && typeof bootstrap !== 'undefined'
    ? new bootstrap.Modal(treatmentModalEl)
    : null;
  const treatmentSelect = document.getElementById('treatmentSelect');
  const appointmentSection = document.getElementById('appointment');

  function preselectTreatmentAndScroll(treatmentName) {
    if (treatmentSelect && treatmentName) {
      const matchedOption = Array.from(treatmentSelect.options).find(
        (opt) => opt.value.toLowerCase() === treatmentName.toLowerCase()
      );
      if (matchedOption) {
        treatmentSelect.value = matchedOption.value;
        treatmentSelect.classList.add('field-highlight');
        setTimeout(() => treatmentSelect.classList.remove('field-highlight'), 1800);
      }
    }
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelectorAll('.btn-learn-more[data-treatment]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.treatment;
      const details = TREATMENT_DETAILS[name];
      if (!details || !treatmentModal) return;

      document.getElementById('treatmentModalBadge').textContent = details.badge;
      document.getElementById('treatmentModalTitle').textContent = name;
      document.getElementById('treatmentModalOverview').textContent = details.overview;
      document.getElementById('treatmentModalExpectation').textContent = details.expectation;

      const listEl = document.getElementById('treatmentModalHighlights');
      listEl.innerHTML = '';
      details.highlights.forEach((point) => {
        const li = document.createElement('li');
        li.className = 'd-flex align-items-start gap-2 mb-2';
        li.innerHTML = `<i class="bi bi-check-circle-fill accent-cyan mt-1"></i><span>${point}</span>`;
        listEl.appendChild(li);
      });

      const modalBookBtn = document.getElementById('treatmentModalBookBtn');
      modalBookBtn.dataset.treatment = name;
      treatmentModal.show();
    });
  });

  document.querySelectorAll('.book-treatment-btn[data-treatment]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.treatment;
      if (treatmentModal && treatmentModalEl.classList.contains('show')) {
        treatmentModal.hide();
      }
      preselectTreatmentAndScroll(name);
    });
  });

  /* ------------------------------------------------------------------------
     4. Dentist Profile Modal
     ------------------------------------------------------------------------ */
  const DENTIST_PROFILES = {
    priyanka: {
      name: 'Dr. Priyanka Vijayakumar',
      role: 'Chief Dentist, Founder & Implantologist',
      qual: 'BDS, MDS (Oral Medicine & Radiology)',
      experience: '20+ Years of Clinical Experience',
      bio: 'Founder of Priyanka’s Infinite Smiles – Advanced Dental Studio in Manikonda, Hyderabad. Dr. Priyanka combines diagnostic mastery in Oral Medicine & Radiology with over two decades of clinical practice in dental implants, aesthetic smile designing, painless root canal care, and comprehensive family dentistry.',
      focus: [
        'Dental Implants & Full-Mouth Rehabilitation',
        'Digital Smile Designing & Cosmetic Veneers',
        'Oral Medicine, Diagnostics & Painless Endodontics',
        'Patient-Centered, Transparent Consultation Approach'
      ]
    },
    orthodontist: {
      name: 'Associate Orthodontist',
      role: 'Specialist Consultant – Orthodontics',
      qual: 'MDS – Orthodontics & Dentofacial Orthopedics',
      experience: 'Multi-Specialty Visiting Specialist',
      bio: 'Our specialist orthodontist provides comprehensive tooth alignment and bite correction plans tailored for teenagers and adults, ensuring balanced facial aesthetics and comfortable jaw function.',
      focus: [
        'Invisalign & Clear Aligner Therapy',
        'Ceramic & Self-Ligating Braces',
        'Teen & Adult Bite Alignment Corrections',
        'Post-Treatment Retention Planning'
      ]
    },
    pediatric: {
      name: 'Pediatric Dental Specialist',
      role: 'Specialist Consultant – Children’s Dentistry',
      qual: 'MDS – Pedodontics & Preventive Dentistry',
      experience: 'Multi-Specialty Visiting Specialist',
      bio: 'Dedicated exclusively to infants, children, and adolescents, our pediatric dental specialist creates a reassuring, gentle atmosphere that turns early dental visits into positive lifelong habits.',
      focus: [
        'Behavior-Guided Gentle Checkups for Kids',
        'Preventive Pit & Fissure Sealants & Fluoride Care',
        'Minimally Invasive Pediatric Cavity Care',
        'Habit Counseling & Developing-Dentition Monitoring'
      ]
    }
  };

  const dentistModalEl = document.getElementById('dentistModal');
  const dentistModal = dentistModalEl && typeof bootstrap !== 'undefined'
    ? new bootstrap.Modal(dentistModalEl)
    : null;

  document.querySelectorAll('.btn-view-dentist[data-dentist]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const profile = DENTIST_PROFILES[btn.dataset.dentist];
      if (!profile || !dentistModal) return;

      document.getElementById('dentistModalRole').textContent = profile.role;
      document.getElementById('dentistModalName').textContent = profile.name;
      document.getElementById('dentistModalQual').textContent = profile.qual;
      document.getElementById('dentistModalExp').textContent = profile.experience;
      document.getElementById('dentistModalBio').textContent = profile.bio;

      const focusEl = document.getElementById('dentistModalFocus');
      focusEl.innerHTML = '';
      profile.focus.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'd-flex align-items-start gap-2 mb-2';
        li.innerHTML = `<i class="bi bi-stars star-gold mt-1"></i><span>${item}</span>`;
        focusEl.appendChild(li);
      });

      dentistModal.show();
    });
  });

  const dentistModalBookBtn = document.getElementById('dentistModalBookBtn');
  if (dentistModalBookBtn) {
    dentistModalBookBtn.addEventListener('click', () => {
      if (dentistModal) dentistModal.hide();
      preselectTreatmentAndScroll('General Dentistry');
    });
  }

  /* ------------------------------------------------------------------------
     5. Smile Gallery Category Filtering
     ------------------------------------------------------------------------ */
  const galleryBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      galleryBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ------------------------------------------------------------------------
     5b. SPA Treatments Category Filtering
     ------------------------------------------------------------------------ */
  const treatFilterBtns = document.querySelectorAll('.treat-filter-btn');
  const treatmentItems = document.querySelectorAll('.treatment-item[data-treat-category]');
  const treatmentsTrackEl = document.getElementById('treatmentsTrack');

  treatFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.treatFilter;
      treatFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      treatmentItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.treatCategory === filter;
        item.classList.toggle('is-hidden', !match);
        if (match) {
          item.classList.add('is-visible');
        }
      });

      if (treatmentsTrackEl) {
        treatmentsTrackEl.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. Horizontal Carousels (Mobile Treatments + Testimonials)
     ------------------------------------------------------------------------ */
  const treatmentsTrack = document.getElementById('treatmentsTrack');
  const treatPrevBtn = document.getElementById('treatPrevBtn');
  const treatNextBtn = document.getElementById('treatNextBtn');

  if (treatmentsTrack && treatPrevBtn && treatNextBtn) {
    treatPrevBtn.addEventListener('click', () => {
      treatmentsTrack.scrollBy({ left: -290, behavior: 'smooth' });
    });
    treatNextBtn.addEventListener('click', () => {
      treatmentsTrack.scrollBy({ left: 290, behavior: 'smooth' });
    });
  }

  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
  const testimonialNextBtn = document.getElementById('testimonialNextBtn');
  const testimonialDots = document.querySelectorAll('.carousel-dot');

  if (testimonialTrack) {
    const getSlideWidth = () => {
      const firstSlide = testimonialTrack.querySelector('.testimonial-slide');
      return firstSlide ? firstSlide.getBoundingClientRect().width + 22 : 340;
    };

    if (testimonialPrevBtn) {
      testimonialPrevBtn.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
      });
    }
    if (testimonialNextBtn) {
      testimonialNextBtn.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
      });
    }

    testimonialDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        testimonialTrack.scrollTo({ left: idx * getSlideWidth(), behavior: 'smooth' });
      });
    });

    testimonialTrack.addEventListener(
      'scroll',
      () => {
        const width = getSlideWidth();
        const activeIdx = Math.min(
          testimonialDots.length - 1,
          Math.max(0, Math.round(testimonialTrack.scrollLeft / width))
        );
        testimonialDots.forEach((d, idx) => d.classList.toggle('active', idx === activeIdx));
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     7. Appointment Form Validation & WhatsApp/Email Submission
     ------------------------------------------------------------------------ */
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentDateInput = document.getElementById('appointmentDate');
  const successModalEl = document.getElementById('bookingSuccessModal');
  const bookingSuccessModal = successModalEl && typeof bootstrap !== 'undefined'
    ? new bootstrap.Modal(successModalEl)
    : null;

  // Set minimum date to today (local timezone)
  if (appointmentDateInput) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    appointmentDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function validateField(input, isValid) {
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
    return isValid;
  }

  if (appointmentForm) {
    const fullName = document.getElementById('fullName');
    const phoneNumber = document.getElementById('phoneNumber');
    const emailAddress = document.getElementById('emailAddress');
    const patientMessage = document.getElementById('patientMessage');

    const validateAll = () => {
      const nameOk = fullName.value.trim().length >= 2;
      const digitsOnly = phoneNumber.value.replace(/\D/g, '');
      const phoneOk = digitsOnly.length >= 10 && digitsOnly.length <= 15;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.value.trim());
      const treatmentOk = treatmentSelect.value.trim() !== '';
      const dateVal = appointmentDateInput.value;
      const dateOk = Boolean(dateVal) && dateVal >= appointmentDateInput.min;

      const r1 = validateField(fullName, nameOk);
      const r2 = validateField(phoneNumber, phoneOk);
      const r3 = validateField(emailAddress, emailOk);
      const r4 = validateField(treatmentSelect, treatmentOk);
      const r5 = validateField(appointmentDateInput, dateOk);

      return r1 && r2 && r3 && r4 && r5;
    };

    [fullName, phoneNumber, emailAddress, treatmentSelect, appointmentDateInput].forEach((field) => {
      field.addEventListener('input', () => {
        if (appointmentForm.dataset.submitted === 'true') {
          validateAll();
        }
      });
    });

    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appointmentForm.dataset.submitted = 'true';

      if (!validateAll()) {
        const firstInvalid = appointmentForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const payload = {
        name: fullName.value.trim(),
        phone: phoneNumber.value.trim(),
        email: emailAddress.value.trim(),
        treatment: treatmentSelect.value.trim(),
        date: appointmentDateInput.value,
        message: patientMessage.value.trim() || 'No additional notes provided.'
      };

      // Populate confirmation modal
      document.getElementById('confirmPatientName').textContent = payload.name;
      document.getElementById('confirmTreatment').textContent = payload.treatment;
      document.getElementById('confirmDate').textContent = payload.date;
      document.getElementById('confirmPhone').textContent = payload.phone;

      const summaryText =
        `Hello Priyanka's Infinite Smiles,%0A` +
        `I would like to book an appointment:%0A` +
        `• Name: ${encodeURIComponent(payload.name)}%0A` +
        `• Phone: ${encodeURIComponent(payload.phone)}%0A` +
        `• Email: ${encodeURIComponent(payload.email)}%0A` +
        `• Treatment: ${encodeURIComponent(payload.treatment)}%0A` +
        `• Preferred Date: ${encodeURIComponent(payload.date)}%0A` +
        `• Message: ${encodeURIComponent(payload.message)}`;

      const waBtn = document.getElementById('confirmWhatsappLink');
      const mailBtn = document.getElementById('confirmEmailLink');
      if (waBtn) {
        waBtn.href = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${summaryText}`;
      }
      if (mailBtn) {
        const subject = encodeURIComponent(`Appointment Request – ${payload.treatment} (${payload.name})`);
        const plainBody =
          `Hello Priyanka's Infinite Smiles,\n` +
          `I would like to book an appointment:\n` +
          `- Name: ${payload.name}\n` +
          `- Phone: ${payload.phone}\n` +
          `- Email: ${payload.email}\n` +
          `- Treatment: ${payload.treatment}\n` +
          `- Preferred Date: ${payload.date}\n` +
          `- Message: ${payload.message}`;
        mailBtn.href = `mailto:${CLINIC_EMAIL}?subject=${subject}&body=${encodeURIComponent(plainBody)}`;
      }

      if (bookingSuccessModal) {
        bookingSuccessModal.show();
      }

      // Reset form cleanly
      appointmentForm.reset();
      appointmentForm.dataset.submitted = 'false';
      appointmentForm.querySelectorAll('.is-valid, .is-invalid').forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
      });
    });
  }
});
