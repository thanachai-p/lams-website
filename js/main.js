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
    function closeMobileMenu() {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          closeMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Reset state on window resize across breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
        closeMobileMenu();
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

      // Mode B: Interactive Video Player via Iframe (TikTok 9:16 vertical & YouTube 16:9 widescreen)
      if (videoShowcase) videoShowcase.style.display = 'none';
      if (videoIframe) {
        videoIframe.style.display = 'block';

        if (provider === 'tiktok') {
          // TikTok official embedded player (plays directly inside website modal)
          videoIframe.style.aspectRatio = '9 / 16';
          videoIframe.style.maxWidth = '360px';
          videoIframe.style.width = '100%';
          videoIframe.style.height = 'min(620px, 72vh)';
          videoIframe.src = `https://www.tiktok.com/player/v1/${videoId}`;
          if (videoDialog) {
            videoDialog.style.maxWidth = '440px';
          }
        } else {
          // YouTube embed player (plays directly inside website modal)
          videoIframe.style.aspectRatio = '16 / 9';
          videoIframe.style.maxWidth = '100%';
          videoIframe.style.width = '100%';
          videoIframe.style.height = 'auto';
          videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
          if (videoDialog) {
            videoDialog.style.maxWidth = '860px';
          }
        }
      }
    }

    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Accessibility: Focus Close button
    setTimeout(() => {
      if (closeVideoModal) {
        closeVideoModal.focus();
      }
    }, 60);
  }

  function closeCampusVideo() {
    if (!videoModal) return;
    videoModal.style.display = 'none';
    if (videoIframe) {
      videoIframe.src = '';
      videoIframe.style.display = 'none';
    }
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

  // 13. Hybrid Social Share System (Native Web Share, In-Page Modal, Centered Popup & Copy Link)
  const btnMainShare = document.getElementById('btnMainShare');
  const btnQuickCopy = document.getElementById('btnQuickCopy');
  const shareNewsModal = document.getElementById('shareNewsModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const btnModalCopyLink = document.getElementById('btnModalCopyLink');
  const shareToast = document.getElementById('shareToast');
  const shareToastText = document.getElementById('shareToastText');

  const currentShareUrl = window.location.href.split('#')[0];
  const currentShareTitle = document.title.split('|')[0].trim() || 'ข่าวสาร LAMS PSU Surat Thani';

  const shareProviders = {
    facebook: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    line: url => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    x: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  };

  let shareToastTimer = null;
  function showShareToast(message) {
    if (!shareToast) return;
    if (shareToastText) shareToastText.textContent = message;
    shareToast.classList.add('show');
    clearTimeout(shareToastTimer);
    shareToastTimer = setTimeout(() => {
      shareToast.classList.remove('show');
    }, 2500);
  }

  function openCenteredShare(platform) {
    const providerFn = shareProviders[platform];
    if (!providerFn) return;
    const targetUrl = providerFn(currentShareUrl, currentShareTitle);
    const width = 600;
    const height = 550;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
    const features = `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`;
    
    // Synchronous execution within user gesture prevents Safari popup blocking
    const popup = window.open(targetUrl, 'lamsSharePopup', features);
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      showShareToast('เบราว์เซอร์บล็อกหน้าต่างแชร์ กรุณาใช้ปุ่มคัดลอกลิงก์แทน');
    } else {
      try { popup.opener = null; } catch (e) {}
    }
  }

  async function copyNewsUrl(buttonElement) {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(currentShareUrl);
        success = true;
      } catch (e) {}
    }
    if (!success) {
      try {
        const tempInput = document.createElement('input');
        tempInput.value = currentShareUrl;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        success = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch (e) {}
    }

    if (success) {
      showShareToast('คัดลอกลิงก์ข่าวสำเร็จแล้ว!');
      if (buttonElement) {
        const originalHtml = buttonElement.innerHTML;
        buttonElement.classList.add('copied');
        buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> คัดลอกแล้ว!';
        setTimeout(() => {
          buttonElement.classList.remove('copied');
          buttonElement.innerHTML = originalHtml;
        }, 2000);
      }
    } else {
      showShareToast('ไม่สามารถคัดลอกได้อัตโนมัติ กรุณากดเลือกในช่องข้อความ');
    }
  }

  let lastFocusedShareElement = null;
  function openShareModal() {
    if (!shareNewsModal) return;
    lastFocusedShareElement = document.activeElement;
    if (shareUrlInput) shareUrlInput.value = currentShareUrl;
    shareNewsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (closeShareModal) closeShareModal.focus();
    }, 60);
  }

  function closeShareModalDialog() {
    if (!shareNewsModal) return;
    shareNewsModal.style.display = 'none';
    document.body.style.overflow = '';
    if (lastFocusedShareElement && typeof lastFocusedShareElement.focus === 'function') {
      lastFocusedShareElement.focus();
    }
  }

  if (btnMainShare) {
    btnMainShare.addEventListener('click', async () => {
      const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
                             (window.innerWidth <= 768 && 'ontouchstart' in window);
      if (isMobileDevice && typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: currentShareTitle,
            text: 'ข่าวสารคณะศิลปศาสตร์และวิทยาการจัดการ ม.อ.สุราษฎร์ธานี',
            url: currentShareUrl
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            openShareModal();
          }
        }
      } else {
        openShareModal();
      }
    });
  }

  if (btnQuickCopy) {
    btnQuickCopy.addEventListener('click', () => copyNewsUrl(btnQuickCopy));
  }

  if (btnModalCopyLink) {
    btnModalCopyLink.addEventListener('click', () => copyNewsUrl(btnModalCopyLink));
  }

  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.getAttribute('data-share');
      openCenteredShare(platform);
    });
  });

  if (closeShareModal) {
    closeShareModal.addEventListener('click', closeShareModalDialog);
  }

  if (shareNewsModal) {
    shareNewsModal.addEventListener('click', (e) => {
      if (e.target === shareNewsModal) {
        closeShareModalDialog();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && shareNewsModal.style.display === 'flex') {
        closeShareModalDialog();
      }
    });

    // Focus trap inside share modal
    shareNewsModal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = shareNewsModal.querySelectorAll('button:not([hidden]):not([disabled]), [href]:not([hidden]):not([disabled]), input:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])');
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
