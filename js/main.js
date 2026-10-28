/**
 * LAMS PSU SURAT THANI 2026 - MAIN JAVASCRIPT
 * Interactivity: Sticky Header, Mobile Nav, Accordion Toggle, Smooth Scrolling, Video Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Visual Scroll Effect
  const header = document.querySelector('.header-bu');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)';
      header.style.backgroundColor = 'rgba(6, 11, 17, 0.96)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'var(--bu-header-bg)';
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links-bu');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bu-header-bg)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--border-subtle)';
      }
    });
  }

  // 3. Interactive Accordion Program Drawer Toggle
  const accordionToggle = document.getElementById('accordionProgramToggle') || document.querySelector('.accordion-select-box');
  const programDrawer = document.getElementById('accordionProgramDrawer');
  const accordionChevron = document.getElementById('accordionChevron');
  
  if (accordionToggle && programDrawer) {
    accordionToggle.addEventListener('click', () => {
      const isHidden = programDrawer.style.display === 'none' || programDrawer.style.display === '';
      programDrawer.style.display = isHidden ? 'block' : 'none';
      accordionToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      if (accordionChevron) {
        accordionChevron.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
      }
    });

    // Support Enter or Space key for Accessibility
    accordionToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        accordionToggle.click();
      }
    });
  }

  // 4. Video Box Campaign Click Handler
  const videoBox = document.querySelector('.video-box-campaign');
  if (videoBox) {
    videoBox.addEventListener('click', () => {
      alert('🎬 กำลังเปิดคลิปวิดีโอแนะนำคณะ: "เด็กจบใหม่ LAMS ม.อ.สุราษฎร์ฯ ไม่ อวสาน แน่นอน" (YouTube Player Embed)');
    });
  }

  // 5. Floating Messenger Quick Chat
  const messengerBtn = document.querySelector('.fb-messenger-float');
  if (messengerBtn) {
    messengerBtn.addEventListener('click', () => {
      alert('💬 เปิดกล่องข้อความ Facebook Messenger คณะ LAMS PSU Surat Thani (หรือเปลี่ยนเป็น LINE Official Account)');
    });
  }

  // 6. Smooth Scroll for Floating Action Bar Items
  const barItems = document.querySelectorAll('.bar-item');
  barItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 7. Interactive Procurement Filter Tabs
  const filterPills = document.querySelectorAll('.filter-pill');
  const procurementItems = document.querySelectorAll('.procurement-item');
  if (filterPills.length > 0 && procurementItems.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');
        procurementItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Toast Helper Function
  function showToast(message) {
    const toast = document.getElementById('lamsToast');
    const toastText = document.getElementById('lamsToastText');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
      }, 3500);
    } else {
      alert(message);
    }
  }

  // 9. Scholarship Modal Interactive Handlers
  const scholarshipBtn = document.getElementById('card-scholarships-btn');
  const scholarshipModal = document.getElementById('scholarshipModal');
  const closeScholarshipModal = document.getElementById('closeScholarshipModal');
  const dismissScholarshipBtn = document.getElementById('dismissScholarshipBtn');

  if (scholarshipBtn && scholarshipModal) {
    scholarshipBtn.addEventListener('click', () => {
      scholarshipModal.style.display = 'flex';
    });

    const hideModal = () => {
      scholarshipModal.style.display = 'none';
    };

    if (closeScholarshipModal) closeScholarshipModal.addEventListener('click', hideModal);
    if (dismissScholarshipBtn) dismissScholarshipBtn.addEventListener('click', hideModal);

    scholarshipModal.addEventListener('click', (e) => {
      if (e.target === scholarshipModal) hideModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && scholarshipModal.style.display === 'flex') {
        hideModal();
      }
    });
  }

  // 10. Research "Coming Soon" Handler (Short-Course now links to LAMS Academy)
  const researchBtn = document.getElementById('card-research-btn');
  if (researchBtn) {
    researchBtn.addEventListener('click', () => {
      showToast('🔬 ระบบสารสนเทศงานวิจัยและนวัตกรรม คณะ LAMS อยู่ระหว่างการพัฒนาและเชื่อมโยงระบบ (เร็วๆ นี้)');
    });
  }

  // 11. Interactive Bilingual Switcher (TH | EN)
  const langBtns = document.querySelectorAll('.lang-switch-btn');
  if (langBtns.length > 0) {
    const navAnchors = document.querySelectorAll('.nav-links-bu a');
    const staffBtn = document.querySelector('.btn-staff-portal');
    const applyBtn = document.querySelector('.btn-apply-sparkle');
    const thTranslations = [
      'หลักสูตร',
      'บรรยากาศแคมปัส',
      'รอบรั้ว ม.อ.สุราษฎร์ฯ',
      'เกี่ยวกับคณะ LAMS',
      'สำหรับบุคลากร'
    ];
    const enTranslations = [
      'Programs',
      'Campus',
      'LAMS News',
      'About LAMS',
      'Staff Portal'
    ];

    const applyLanguage = (lang) => {
      langBtns.forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      if (navAnchors.length >= 4) {
        navAnchors.forEach((a, idx) => {
          if (idx < thTranslations.length) {
            const hasIcon = a.querySelector('i');
            const iconHtml = hasIcon ? hasIcon.outerHTML + ' ' : '';
            a.innerHTML = iconHtml + (lang === 'en' ? enTranslations[idx] : thTranslations[idx]);
          }
        });
      }

      if (staffBtn) {
        staffBtn.innerHTML = lang === 'en'
          ? '<i class="fa-solid fa-user-tie"></i> Staff Portal'
          : '<i class="fa-solid fa-user-tie"></i> สำหรับบุคลากร';
      }

      if (applyBtn) {
        applyBtn.innerHTML = lang === 'en'
          ? 'Apply TCAS <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 4px;"></i>'
          : 'สมัครเรียน TCAS <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 4px;"></i>';
      }

      const heroTag = document.querySelector('.hero-tag');
      if (heroTag && lang === 'th') {
        heroTag.textContent = 'คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์';
      } else if (heroTag && lang === 'en') {
        heroTag.textContent = 'FACULTY OF LIBERAL ARTS AND MANAGEMENT SCIENCES';
      }

      try {
        localStorage.setItem('lams_lang', lang);
      } catch (e) {}
    };

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });

    try {
      const savedLang = localStorage.getItem('lams_lang');
      if (savedLang) applyLanguage(savedLang);
    } catch (e) {}
  }

  // 12. Campus Facility Video Modal Handlers (YouTube, TikTok & Native MP4 Architecture)
  const facilityCards = document.querySelectorAll('.campus-facility-card');
  const videoModal = document.getElementById('campusVideoModal');
  const videoDialog = document.getElementById('campusVideoDialog');
  const videoIframe = document.getElementById('campusVideoIframe');
  const videoNative = document.getElementById('campusVideoNative');
  const videoShowcase = document.getElementById('campusVideoShowcase');
  const videoPoster = document.getElementById('campusVideoPoster');
  const videoShowcaseTitle = document.getElementById('campusVideoShowcaseTitle');
  const videoHeroBtn = document.getElementById('campusVideoHeroBtn');
  const videoHeroIcon = document.getElementById('campusVideoHeroIcon');
  const videoHeroText = document.getElementById('campusVideoHeroText');
  const videoTitle = document.getElementById('campusVideoTitle');
  const videoBadge = document.getElementById('campusVideoBadge');
  const videoDirectLink = document.getElementById('campusVideoDirectLink');
  const closeVideoModal = document.getElementById('closeCampusVideoModal');
  const dismissVideoBtn = document.getElementById('dismissCampusVideoBtn');
  let lastFocusedFacilityCard = null;

  function openCampusVideo(card) {
    if (!videoModal) return;
    lastFocusedFacilityCard = card;

    const provider = card.getAttribute('data-video-provider');
    const videoId = card.getAttribute('data-video-id');
    const title = card.getAttribute('data-video-title') || 'วิดีโอบรรยากาศแคมปัส';
    const directUrl = card.getAttribute('data-video-url') || '#';
    const thumbUrl = card.getAttribute('data-video-thumb') || '';
    const mp4Url = card.getAttribute('data-video-mp4');

    if (videoTitle) videoTitle.textContent = title;
    if (videoShowcaseTitle) videoShowcaseTitle.textContent = title;

    if (videoDirectLink) {
      videoDirectLink.href = directUrl;
      videoDirectLink.innerHTML = provider === 'tiktok' 
        ? '<i class="fa-brands fa-tiktok" style="color: #25F4EE; margin-right: 6px;"></i> เปิดดูบน TikTok ➔' 
        : '<i class="fa-brands fa-youtube" style="color: #FF0000; margin-right: 6px;"></i> เปิดดูบน YouTube ➔';
    }

    if (videoBadge) {
      if (provider === 'tiktok') {
        videoBadge.innerHTML = '<i class="fa-brands fa-tiktok" style="color: #25F4EE;"></i> TikTok Clip';
        videoBadge.style.background = 'rgba(37, 244, 238, 0.15)';
        videoBadge.style.color = '#fff';
      } else {
        videoBadge.innerHTML = '<i class="fa-brands fa-youtube" style="color: #FF0000;"></i> YouTube Video';
        videoBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        videoBadge.style.color = '#fff';
      }
    }

    // Mode A: Future Server-Hosted MP4 Video playback
    if (mp4Url && videoNative) {
      if (videoShowcase) videoShowcase.style.display = 'none';
      if (videoIframe) {
        videoIframe.style.display = 'none';
        videoIframe.src = '';
      }
      videoNative.hidden = false;
      videoNative.style.display = 'block';
      videoNative.src = mp4Url;
      videoNative.load();
      try { videoNative.play(); } catch (e) {}
      if (videoDialog) videoDialog.style.maxWidth = '860px';
    } else {
      // Clean up native player if not MP4
      if (videoNative) {
        try { videoNative.pause(); } catch (e) {}
        videoNative.removeAttribute('src');
        videoNative.load();
        videoNative.hidden = true;
        videoNative.style.display = 'none';
      }

      const isLocalFile = window.location.protocol === 'file:';

      // Mode B: Local file:// or TikTok -> Showcase Player (Zero Error 153, Zero Broken Frames)
      if (isLocalFile || provider === 'tiktok') {
        if (videoIframe) {
          videoIframe.style.display = 'none';
          videoIframe.src = '';
        }
        if (videoShowcase) {
          videoShowcase.style.display = 'flex';
          if (videoPoster) {
            videoPoster.style.backgroundImage = thumbUrl ? `url('${thumbUrl}')` : '';
            videoPoster.setAttribute('aria-label', `เปิดรับชมวิดีโอ ${title}`);
          }
          if (videoHeroBtn) {
            videoHeroBtn.href = directUrl;
          }
          if (videoHeroIcon) {
            videoHeroIcon.className = provider === 'tiktok' ? 'fa-brands fa-tiktok' : 'fa-brands fa-youtube';
            videoHeroIcon.style.color = provider === 'tiktok' ? '#25F4EE' : '#FF0000';
          }
          if (videoHeroText) {
            videoHeroText.textContent = provider === 'tiktok'
              ? 'เปิดรับชมคลิปบน TikTok ➔'
              : 'เปิดรับชมวิดีโอบน YouTube ➔';
          }
        }
        if (videoDialog) {
          videoDialog.style.maxWidth = provider === 'tiktok' ? '540px' : '760px';
        }
      } else {
        // Mode C: Web Server (HTTP/HTTPS) with YouTube Embed
        if (videoShowcase) videoShowcase.style.display = 'none';
        if (videoIframe) {
          videoIframe.style.display = 'block';
          videoIframe.style.aspectRatio = '16 / 9';
          videoIframe.style.height = 'auto';
          videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        }
        if (videoDialog) videoDialog.style.maxWidth = '860px';
      }
    }

    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Accessibility: Focus Hero button or Close button
    setTimeout(() => {
      if (videoHeroBtn && videoShowcase && videoShowcase.style.display !== 'none') {
        videoHeroBtn.focus();
      } else if (closeVideoModal) {
        closeVideoModal.focus();
      }
    }, 60);
  }

  function closeCampusVideo() {
    if (!videoModal) return;
    videoModal.style.display = 'none';
    if (videoIframe) videoIframe.src = '';
    if (videoNative) {
      try { videoNative.pause(); } catch (e) {}
      videoNative.removeAttribute('src');
      videoNative.load();
    }
    document.body.style.overflow = '';
    if (lastFocusedFacilityCard && typeof lastFocusedFacilityCard.focus === 'function') {
      lastFocusedFacilityCard.focus();
    }
  }

  if (facilityCards.length > 0 && videoModal) {
    facilityCards.forEach(card => {
      card.addEventListener('click', () => openCampusVideo(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCampusVideo(card);
        }
      });
    });

    // Poster Click opens direct video URL in new tab
    if (videoPoster) {
      const handlePosterTrigger = () => {
        const url = videoHeroBtn ? videoHeroBtn.href : '#';
        if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
      };
      videoPoster.addEventListener('click', handlePosterTrigger);
      videoPoster.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePosterTrigger();
        }
      });
    }

    if (closeVideoModal) closeVideoModal.addEventListener('click', closeCampusVideo);
    if (dismissVideoBtn) dismissVideoBtn.addEventListener('click', closeCampusVideo);

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeCampusVideo();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeCampusVideo();
      }
    });

    // Focus trap inside video modal
    videoModal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = videoModal.querySelectorAll('button:not([hidden]):not([disabled]), [href]:not([hidden]):not([disabled]), input:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  console.log('✅ LAMS PSU Surat Thani 2026 - Main Scripts Initialized.');
});
