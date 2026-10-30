/**
 * LAMS PSU SURAT THANI 2026 - MAIN JAVASCRIPT
 * Modular Component Initializers: Header, Nav, Modals, Filters, Video Showcase & Social Share
 */

// 1. Sticky Header Visual Scroll Effect
function initSiteHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Mobile Menu Toggle
function initSiteNav() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const siteNav = document.querySelector('.site-nav');
  if (!mobileMenuBtn || !siteNav) return;

  function closeMobileMenu() {
    siteNav.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = siteNav.classList.toggle('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when clicking any link
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeMobileMenu();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      siteNav.classList.contains('is-open') &&
      !siteNav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Reset state on window resize across breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && siteNav.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}

// 3. Interactive Accordion Program Drawer Toggle
function initInfoAccordion() {
  const accordionToggle = document.getElementById('accordionProgramToggle') || document.querySelector('.accordion-select-box');
  const programDrawer = document.getElementById('accordionProgramDrawer');
  const accordionChevron = document.getElementById('accordionChevron');

  if (!accordionToggle || !programDrawer) return;

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
function initVideoCampaign() {
  const videoBox = document.querySelector('.video-box-campaign');
  if (!videoBox) return;

  videoBox.addEventListener('click', () => {
    alert('🎬 กำลังเปิดคลิปวิดีโอแนะนำคณะ: "เด็กจบใหม่ LAMS ม.อ.สุราษฎร์ฯ ไม่ อวสาน แน่นอน" (YouTube Player Embed)');
  });
}

// 5. Floating Messenger Quick Chat
function initFloatingMessenger() {
  const messengerBtn = document.querySelector('.fb-messenger-float');
  if (!messengerBtn) return;

  messengerBtn.addEventListener('click', () => {
    alert('💬 เปิดกล่องข้อความ Facebook Messenger คณะ LAMS PSU Surat Thani (หรือเปลี่ยนเป็น LINE Official Account)');
  });
}

// 6. Smooth Scroll for Floating Action Bar Items
function initSmoothScroll() {
  const barItems = document.querySelectorAll('.bar-item');
  barItems.forEach((item) => {
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
}


/**
 * Safe URL validator for external/internal links (mitigates javascript: pseudo-protocol injection)
 */
function isSafeUrl(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  // Strictly block protocol-relative URLs and backslash-based URL normalization hijacking
  if (!trimmed || trimmed.startsWith('//') || trimmed.includes('\\')) return false;

  try {
    const url = new URL(trimmed, window.location.href);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }

    const isRelative = trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../');
    if (isRelative && url.origin !== window.location.origin) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// 7. Interactive Procurement Filter Tabs & Search (Hardened & Scoped)
function initProcurementFilters() {
  const procureList = document.getElementById('procurement-list');
  if (!procureList) return;
  if (procureList.dataset.initialized === 'true') return;
  procureList.dataset.initialized = 'true';

  const procurementItems = procureList.querySelectorAll('.procurement-item');
  const toolbar = procureList.closest('section')?.querySelector('.catalog-toolbar') || document.querySelector('.catalog-toolbar');
  const filterTabs = toolbar ? toolbar.querySelectorAll('.catalog-tab, .filter-pill') : [];
  const searchInput = document.getElementById('procure-search-input');
  const emptyState = document.getElementById('procure-empty-state');

  function filterProcure() {
    const activeTab = toolbar ? toolbar.querySelector('.catalog-tab.active, .filter-pill.active, .catalog-tab.filter-pill--active') : null;
    const cat = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;
    procurementItems.forEach((it) => {
      const itemCat = it.getAttribute('data-category');
      const text = it.textContent.toLowerCase();
      const matchCat = (cat === 'all' || itemCat === cat);
      const matchQ = !q || text.includes(q);
      const show = matchCat && matchQ;

      it.style.display = show ? '' : 'none';
      it.classList.toggle('is-hidden', !show);
      it.hidden = !show;
      it.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
      emptyState.hidden = visibleCount !== 0;
    }
  }

  filterTabs.forEach((t) => {
    t.addEventListener('click', () => {
      filterTabs.forEach((item) => {
        item.classList.remove('active', 'filter-pill--active');
        item.setAttribute('aria-selected', 'false');
      });
      t.classList.add('active', 'filter-pill--active');
      t.setAttribute('aria-selected', 'true');
      filterProcure();
    });
  });

  if (searchInput) {
    let isComposing = false;
    searchInput.addEventListener('compositionstart', () => { isComposing = true; });
    searchInput.addEventListener('compositionend', () => {
      isComposing = false;
      filterProcure();
    });
    searchInput.addEventListener('input', () => {
      if (!isComposing) filterProcure();
    });
    searchInput.addEventListener('search', filterProcure);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterProcure();
      }
    });
  }
}

// 8. Toast Helper Function
let lamsToastTimer = null;
function showToast(message) {
  const toast = document.getElementById('lamsToast');
  const toastText = document.getElementById('lamsToastText');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
    clearTimeout(lamsToastTimer);
    lamsToastTimer = setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
    }, 3500);
  } else {
    alert(message);
  }
}
window.showLamsToast = showToast;

function initToastHelper() {
  // Attached globally as window.showLamsToast
}

// 9. Scholarship Modal Interactive Handlers
function initScholarshipModal() {
  const scholarshipModal = document.getElementById('scholarshipModal');
  if (!scholarshipModal) return;

  const scholarshipTriggers = document.querySelectorAll(
    '#card-scholarships-btn, [data-trigger="scholarship-modal"], #footerScholarshipLink, #footerScholarshipLinkEn'
  );
  const closeScholarshipModal = document.getElementById('closeScholarshipModal');
  const dismissScholarshipBtn = document.getElementById('dismissScholarshipBtn');

  if (scholarshipTriggers.length === 0) return;

  scholarshipTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      scholarshipModal.style.display = 'flex';
    });
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

// 10. Research "Coming Soon" Handler
function initResearchHandlers() {
  const researchBtn = document.getElementById('card-research-btn');
  if (!researchBtn) return;

  researchBtn.addEventListener('click', () => {
    showToast('🔬 ระบบสารสนเทศงานวิจัยและนวัตกรรม คณะ LAMS อยู่ระหว่างการพัฒนาและเชื่อมโยงระบบ (เร็วๆ นี้)');
  });
}

// 11. Interactive Bilingual Switcher (TH | EN) & Dedicated /en/ Router
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-switch-btn');
  if (langBtns.length === 0) return;

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('hreflang') || btn.getAttribute('data-lang') || btn.textContent.trim().toLowerCase();
      if (lang) {
        try {
          localStorage.setItem('lams_lang', lang);
        } catch (err) {}
      }
    });
  });
}

// 12. Campus Facility Video Modal Handlers (YouTube, TikTok & Native MP4 Architecture)
function initCampusVideoModal() {
  const facilityCards = document.querySelectorAll('.campus-facility-card');
  const videoModal = document.getElementById('campusVideoModal');
  const videoDialog = document.getElementById('campusVideoDialog');
  const videoIframe = document.getElementById('campusVideoIframe');
  const videoNative = document.getElementById('campusVideoNative');
  const videoShowcase = document.getElementById('campusVideoShowcase');
  const videoPoster = document.getElementById('campusVideoPoster');
  const videoShowcaseTitle = document.getElementById('campusVideoShowcaseTitle');
  const videoHeroBtn = document.getElementById('campusVideoHeroBtn');
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
    const mp4Url = card.getAttribute('data-video-mp4');

    if (videoTitle) videoTitle.textContent = title;
    if (videoShowcaseTitle) videoShowcaseTitle.textContent = title;

    if (videoDirectLink && isSafeUrl(directUrl)) {
      videoDirectLink.href = directUrl;
      videoDirectLink.replaceChildren();
      const directIcon = document.createElement('i');
      directIcon.className = provider === 'tiktok' ? 'fa-brands fa-tiktok' : 'fa-brands fa-youtube';
      directIcon.style.color = provider === 'tiktok' ? 'var(--brand-tiktok-cyan)' : 'var(--brand-youtube)';
      directIcon.style.marginRight = '6px';
      const directSpan = document.createElement('span');
      directSpan.textContent = provider === 'tiktok' ? 'เปิดดูบน TikTok ➔' : 'เปิดดูบน YouTube ➔';
      videoDirectLink.append(directIcon, directSpan);
    }

    if (videoBadge) {
      videoBadge.replaceChildren();
      const badgeIcon = document.createElement('i');
      badgeIcon.className = provider === 'tiktok' ? 'fa-brands fa-tiktok' : 'fa-brands fa-youtube';
      badgeIcon.style.color = provider === 'tiktok' ? 'var(--brand-tiktok-cyan)' : 'var(--brand-youtube)';
      badgeIcon.style.marginRight = '6px';
      const badgeSpan = document.createElement('span');
      badgeSpan.textContent = provider === 'tiktok' ? 'TikTok Clip' : 'YouTube Video';
      videoBadge.style.background = provider === 'tiktok' ? 'rgba(37, 244, 238, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      videoBadge.style.color = 'var(--surface-white)';
      videoBadge.append(badgeIcon, badgeSpan);
    }

    if (mp4Url && videoNative && isSafeUrl(mp4Url)) {
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
      if (videoNative) {
        try { videoNative.pause(); } catch (e) {}
        videoNative.removeAttribute('src');
        videoNative.load();
        videoNative.hidden = true;
        videoNative.style.display = 'none';
      }

      if (videoShowcase) videoShowcase.style.display = 'none';
      if (videoIframe) {
        videoIframe.style.display = 'block';
        if (provider === 'tiktok') {
          videoIframe.style.aspectRatio = '9 / 16';
          videoIframe.style.maxWidth = '360px';
          videoIframe.style.width = '100%';
          videoIframe.style.height = 'min(620px, 72vh)';
          videoIframe.src = 'https://www.tiktok.com/player/v1/' + encodeURIComponent(videoId);
          if (videoDialog) videoDialog.style.maxWidth = '440px';
        } else {
          videoIframe.style.aspectRatio = '16 / 9';
          videoIframe.style.maxWidth = '100%';
          videoIframe.style.width = '100%';
          videoIframe.style.height = 'auto';
          videoIframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0';
          if (videoDialog) videoDialog.style.maxWidth = '860px';
        }
      }
    }

    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (closeVideoModal) closeVideoModal.focus();
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
    facilityCards.forEach((card) => {
      card.addEventListener('click', () => openCampusVideo(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCampusVideo(card);
        }
      });
    });

    if (videoPoster) {
      const handlePosterTrigger = () => {
        const url = videoHeroBtn ? videoHeroBtn.href : '#';
        if (url && url !== '#' && isSafeUrl(url)) window.open(url, '_blank', 'noopener,noreferrer');
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

    videoModal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = videoModal.querySelectorAll(
          'button:not([hidden]):not([disabled]), [href]:not([hidden]):not([disabled]), input:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])'
        );
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
}

// 13. Hybrid Social Share System
function initSocialShareSystem() {
  const btnMainShare = document.getElementById('btnMainShare');
  const btnQuickCopy = document.getElementById('btnQuickCopy');
  const shareNewsModal = document.getElementById('shareNewsModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const btnModalCopyLink = document.getElementById('btnModalCopyLink');
  const btnShareNative = document.getElementById('btnShareNative');
  const shareToast = document.getElementById('shareToast');
  const shareToastText = document.getElementById('shareToastText');

  const currentShareUrl = window.location.href.split('#')[0];
  const currentShareTitle = document.title.split('|')[0].trim() || 'ข่าวสาร LAMS PSU Surat Thani';

  const shareProviders = {
    facebook: (url) => 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
    line: (url) => 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url)
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

  function openCenteredShare(platform, fallbackHref) {
    const providerFn = shareProviders[platform];
    const targetUrl = providerFn ? providerFn(currentShareUrl, currentShareTitle) : (fallbackHref || currentShareUrl);

    const width = 600;
    const height = 550;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
    const features = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes,noopener,noreferrer';

    const popup = window.open(targetUrl, 'lamsSharePopup', features);
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      try { popup.opener = null; } catch (e) {}
    }
  }

  async function copyNewsUrl(buttonElement) {
    let success = false;
    const url = currentShareUrl;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch (e) {}
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, url.length);
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (e) {}
    }

    if (success) {
      showShareToast('คัดลอกลิงก์ข่าวสำเร็จแล้ว!');
      if (buttonElement) {
        buttonElement.classList.add('copied');
        const origText = buttonElement.textContent;
        buttonElement.textContent = ' คัดลอกแล้ว!';
        setTimeout(() => {
          buttonElement.classList.remove('copied');
          buttonElement.textContent = origText;
        }, 2000);
      }
    } else {
      openShareModal();
      if (shareUrlInput) {
        shareUrlInput.focus();
        shareUrlInput.select();
      }
      showShareToast('กรุณากดคัดลอกจากกล่องข้อความ');
    }
  }

  let lastFocusedShareElement = null;
  function openShareModal() {
    if (!shareNewsModal) return;
    lastFocusedShareElement = document.activeElement;
    if (shareUrlInput) shareUrlInput.value = currentShareUrl;

    if (btnShareNative && typeof navigator.share === 'function') {
      btnShareNative.style.display = 'flex';
    }

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

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
  }

  if (btnMainShare) {
    btnMainShare.addEventListener('click', (e) => {
      e.preventDefault();
      openShareModal();
    });
  }

  if (btnQuickCopy) {
    btnQuickCopy.addEventListener('click', (e) => {
      e.preventDefault();
      copyNewsUrl(btnQuickCopy);
    });
  }

  if (btnModalCopyLink) {
    btnModalCopyLink.addEventListener('click', (e) => {
      e.preventDefault();
      copyNewsUrl(btnModalCopyLink);
    });
  }

  document.querySelectorAll('[data-share]').forEach((btn) => {
    const platform = btn.getAttribute('data-share');
    const providerFn = shareProviders[platform];
    if (providerFn && btn.tagName === 'A') {
      btn.href = providerFn(currentShareUrl, currentShareTitle);
    }

    btn.addEventListener('click', async (e) => {
      if (isMobileDevice()) {
        if (platform === 'facebook') {
          if (typeof navigator.share === 'function') {
            e.preventDefault();
            try {
              await navigator.share({
                title: currentShareTitle,
                text: currentShareTitle,
                url: currentShareUrl
              });
              closeShareModalDialog();
              return;
            } catch (err) {
              if (err?.name === 'AbortError') return;
              copyNewsUrl(btn);
              showShareToast('คัดลอกลิงก์แล้ว! เปิดแอป Facebook เพื่อวางโพสต์ได้ทันที');
              return;
            }
          } else {
            e.preventDefault();
            copyNewsUrl(btn);
            showShareToast('คัดลอกลิงก์แล้ว! เปิดแอป Facebook เพื่อวางโพสต์ได้ทันที');
            return;
          }
        }

        if (providerFn && btn.tagName === 'A') {
          btn.href = providerFn(currentShareUrl, currentShareTitle);
        }
        return;
      }

      e.preventDefault();
      openCenteredShare(platform, btn.href);
    });
  });

  if (btnShareNative) {
    btnShareNative.addEventListener('click', async (e) => {
      e.preventDefault();
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: currentShareTitle,
            text: currentShareTitle,
            url: currentShareUrl
          });
          closeShareModalDialog();
        } catch (err) {
          if (err?.name === 'AbortError') return;
          copyNewsUrl(btnShareNative);
          showShareToast('คัดลอกลิงก์แล้ว! เปิดแอปเพื่อวางโพสต์ได้ทันที');
        }
      } else {
        copyNewsUrl(btnShareNative);
        showShareToast('คัดลอกลิงก์แล้ว! เปิดแอปเพื่อวางโพสต์ได้ทันที');
      }
    });
  }

  if (closeShareModal) closeShareModal.addEventListener('click', closeShareModalDialog);

  if (shareNewsModal) {
    shareNewsModal.addEventListener('click', (e) => {
      if (e.target === shareNewsModal) closeShareModalDialog();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && shareNewsModal.style.display === 'flex') {
        closeShareModalDialog();
      }
    });

    shareNewsModal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = shareNewsModal.querySelectorAll(
          'button:not([hidden]):not([disabled]), [href]:not([hidden]):not([disabled]), input:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])'
        );
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
}

// 14. News Filter System (Hardened, Scoped, IME-Aware & Popstate Supported)
function initNewsFilter() {
  const newsGrid = document.getElementById('news-grid') || document.querySelector('.news-grid-page');
  if (!newsGrid) return;
  if (newsGrid.dataset.initialized === 'true') return;
  newsGrid.dataset.initialized = 'true';

  const toolbar = newsGrid.closest('section')?.querySelector('.catalog-toolbar') || 
                  newsGrid.closest('main')?.previousElementSibling || 
                  document.querySelector('.catalog-toolbar');
  const tabs = toolbar ? Array.from(toolbar.querySelectorAll('.catalog-tab')) : [];
  const searchInput = document.getElementById('news-search-input');
  const emptyState = document.getElementById('news-empty-state');
  const cards = Array.from(newsGrid.querySelectorAll('.program-card-item, .news-card-item'));

  let currentCategory = 'all';
  let searchQuery = '';
  let isComposing = false;

  const normalize = (val) => (val || '').trim().toLowerCase().replace(/\s+/g, ' ');

  function updateNewsUrl(cat, pushState = false) {
    if (typeof window === 'undefined' || !window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      if (cat && cat !== 'all') {
        url.searchParams.set('category', cat);
      } else {
        url.searchParams.delete('category');
      }
      const targetUrl = url.pathname + url.search + url.hash;
      if (pushState && window.history.pushState) {
        window.history.pushState(null, '', targetUrl);
      } else if (window.history.replaceState) {
        window.history.replaceState(null, '', targetUrl);
      }
    } catch (e) {}
  }

  function filterNews() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const cardCat = card.getAttribute('data-category') || '';
      const text = normalize(card.textContent);
      const matchCat = (currentCategory === 'all' || cardCat === currentCategory);
      const matchQ = !searchQuery || text.includes(searchQuery);
      const show = matchCat && matchQ;

      card.style.display = show ? '' : 'none';
      card.classList.toggle('is-hidden', !show);
      card.hidden = !show;
      card.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
      emptyState.hidden = visibleCount !== 0;
    }
  }

  function setCategory(cat, syncUrl = true, pushState = false) {
    currentCategory = cat || 'all';
    tabs.forEach((tab) => {
      const isMatch = (tab.getAttribute('data-filter') || 'all') === currentCategory;
      tab.classList.toggle('active', isMatch);
      tab.classList.toggle('filter-pill--active', isMatch);
      tab.setAttribute('aria-selected', isMatch.toString());
    });
    filterNews();
    if (syncUrl) updateNewsUrl(currentCategory, pushState);
  }

  // Restore from URL parameter (?category=)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const initialCat = urlParams.get('category');
    if (initialCat) {
      const valid = tabs.some((t) => t.getAttribute('data-filter') === initialCat);
      if (valid) currentCategory = initialCat;
    }
  } catch (e) {}

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-filter') || 'all';
      setCategory(cat, true, true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('compositionstart', () => { isComposing = true; });
    searchInput.addEventListener('compositionend', () => {
      isComposing = false;
      searchQuery = normalize(searchInput.value);
      filterNews();
    });
    searchInput.addEventListener('input', (e) => {
      if (isComposing) return;
      searchQuery = normalize(e.target.value);
      filterNews();
    });
    searchInput.addEventListener('search', () => {
      searchQuery = normalize(searchInput.value);
      filterNews();
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        filterNews();
      }
    });
  }

  // Browser Back/Forward support
  window.addEventListener('popstate', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') || 'all';
      setCategory(cat, false);
    } catch (e) {}
  });

  // Initial Filter Application
  setCategory(currentCategory, false);
}

// 15. Directory & Faculty People Filter (Hardened, IME-Aware, Popstate & Deep-Link Enabled)
function initPeopleFilter() {
  const peopleContainer = document.getElementById('peopleContainer') || document.getElementById('peopleGrid');
  if (!peopleContainer) return;
  if (peopleContainer.dataset.initialized === 'true') return;
  peopleContainer.dataset.initialized = 'true';

  const filterContainer = document.getElementById('peopleFilters');
  const tabs = filterContainer ? Array.from(filterContainer.querySelectorAll('.catalog-tab')) : [];
  const searchInput = document.getElementById('peopleSearchInput');
  const emptyState = document.getElementById('peopleEmptyState');
  const cards = Array.from(peopleContainer.querySelectorAll('.people-card'));
  const zones = Array.from(peopleContainer.querySelectorAll('.curriculum-zone'));

  const VALID_FILTERS = new Set(['all', 'executive', 'faculty', 'staff']);
  let currentFilter = 'all';
  let searchQuery = '';
  let isComposing = false;

  const normalize = (val) => (val || '').trim().toLowerCase().replace(/\s+/g, ' ');

  function updatePeopleUrl(filter, pushState = false) {
    if (typeof window === 'undefined' || !window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      if (filter && filter !== 'all') {
        url.searchParams.set('category', filter);
      } else {
        url.searchParams.delete('category');
        url.searchParams.delete('filter');
      }
      const targetUrl = url.pathname + url.search + url.hash;
      if (pushState && window.history.pushState) {
        window.history.pushState(null, '', targetUrl);
      } else if (window.history.replaceState) {
        window.history.replaceState(null, '', targetUrl);
      }
    } catch (e) {}
  }

  function filterDirectory() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const keywords = normalize(card.getAttribute('data-keywords'));
      const text = normalize(card.textContent);

      const matchesCategory = (currentFilter === 'all') || (cardCategory === currentFilter);
      const matchesSearch = !searchQuery || keywords.includes(searchQuery) || text.includes(searchQuery);
      const show = matchesCategory && matchesSearch;

      card.style.display = show ? '' : 'none';
      card.classList.toggle('is-hidden', !show);
      card.hidden = !show;
      card.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    // Update visibility of curriculum zones
    zones.forEach((zone) => {
      const zoneCategory = zone.getAttribute('data-category') || 'faculty';
      const visibleCardsInZone = zone.querySelectorAll('.people-card:not([hidden])');
      const matchesCat = (currentFilter === 'all') || (currentFilter === zoneCategory);
      const hasVisible = matchesCat && visibleCardsInZone.length > 0;
      
      zone.style.display = hasVisible ? '' : 'none';
      zone.classList.toggle('is-hidden', !hasVisible);
      zone.hidden = !hasVisible;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
      emptyState.hidden = visibleCount !== 0;
    }
  }

  function setDirectoryFilter(filter, syncUrl = true, pushState = false) {
    currentFilter = VALID_FILTERS.has(filter) ? filter : 'all';
    tabs.forEach((tab) => {
      const isMatch = (tab.getAttribute('data-filter') || 'all') === currentFilter;
      tab.classList.toggle('active', isMatch);
      tab.classList.toggle('filter-pill--active', isMatch);
      tab.setAttribute('aria-selected', isMatch.toString());
    });
    filterDirectory();
    if (syncUrl) updatePeopleUrl(currentFilter, pushState);
  }

  // Restore filter from URL parameters (?category= or ?filter=)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('category') || urlParams.get('filter');
    if (initialFilter && VALID_FILTERS.has(initialFilter)) {
      currentFilter = initialFilter;
    }
  } catch (e) {}

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter') || 'all';
      setDirectoryFilter(filter, true, true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('compositionstart', () => { isComposing = true; });
    searchInput.addEventListener('compositionend', () => {
      isComposing = false;
      searchQuery = normalize(searchInput.value);
      filterDirectory();
    });

    let debounceTimer;
    searchInput.addEventListener('input', () => {
      if (isComposing) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = normalize(searchInput.value);
        filterDirectory();
      }, 150);
    });
  }

  window.addEventListener('popstate', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const popFilter = params.get('category') || params.get('filter') || 'all';
      setDirectoryFilter(popFilter, false, false);
    } catch (e) {}
  });

  setDirectoryFilter(currentFilter, false, false);
}

// 16. Academic Degree Programs Catalog Filter & URL Sync (Hardened, IME-Aware & Popstate Supported)
function initProgramCatalog() {
  const programsGrid = document.getElementById('programs-grid');
  if (!programsGrid) return;
  if (programsGrid.dataset.initialized === 'true') return;
  programsGrid.dataset.initialized = 'true';

  const programSearch = document.getElementById('program-search-input');
  const emptyState = document.getElementById('catalog-empty-state');
  const programCards = Array.from(programsGrid.querySelectorAll('.program-card-item'));
  const toolbar = programsGrid.closest('main')?.previousElementSibling || document.querySelector('.catalog-toolbar');
  const tabs = toolbar ? Array.from(toolbar.querySelectorAll('.catalog-tab')) : [];

  let currentLevel = 'all';
  let searchQuery = '';
  let isComposing = false;

  const normalize = (val) => (val || '').trim().toLowerCase().replace(/\s+/g, ' ');

  function updateProgramUrl(level, pushState = false) {
    if (typeof window === 'undefined' || !window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      if (level && level !== 'all') {
        url.searchParams.set('level', level);
      } else {
        url.searchParams.delete('level');
      }
      const targetUrl = url.pathname + url.search + url.hash;
      if (pushState && window.history.pushState) {
        window.history.pushState(null, '', targetUrl);
      } else if (window.history.replaceState) {
        window.history.replaceState(null, '', targetUrl);
      }
    } catch (e) {}
  }

  function filterPrograms() {
    let visibleCount = 0;
    programCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const text = normalize(card.textContent);

      const matchesCategory = (currentLevel === 'all' || cardCategory === currentLevel);
      const matchesQuery = !searchQuery || text.includes(searchQuery);
      const show = matchesCategory && matchesQuery;

      card.style.display = show ? '' : 'none';
      card.classList.toggle('is-hidden', !show);
      card.hidden = !show;
      card.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
      emptyState.hidden = visibleCount !== 0;
    }
  }

  function setProgramLevel(level, syncUrl = true, pushState = false) {
    currentLevel = level || 'all';
    tabs.forEach((tab) => {
      const isMatch = (tab.getAttribute('data-filter') || 'all') === currentLevel;
      tab.classList.toggle('active', isMatch);
      tab.classList.toggle('filter-pill--active', isMatch);
      tab.setAttribute('aria-selected', isMatch.toString());
    });
    filterPrograms();
    if (syncUrl) updateProgramUrl(currentLevel, pushState);
  }

  // Restore level from URL parameter (?level=)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const initialLevel = urlParams.get('level');
    if (initialLevel) {
      const valid = tabs.some((t) => t.getAttribute('data-filter') === initialLevel);
      if (valid) currentLevel = initialLevel;
    }
  } catch (e) {}

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const level = tab.getAttribute('data-filter') || 'all';
      setProgramLevel(level, true, true);
    });
  });

  if (programSearch) {
    programSearch.addEventListener('compositionstart', () => { isComposing = true; });
    programSearch.addEventListener('compositionend', () => {
      isComposing = false;
      searchQuery = normalize(programSearch.value);
      filterPrograms();
    });
    programSearch.addEventListener('input', (e) => {
      if (isComposing) return;
      searchQuery = normalize(e.target.value);
      filterPrograms();
    });
    programSearch.addEventListener('search', () => {
      searchQuery = normalize(programSearch.value);
      filterPrograms();
    });
    programSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        programSearch.value = '';
        searchQuery = '';
        filterPrograms();
      }
    });
  }

  // Browser Back/Forward support
  window.addEventListener('popstate', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const lvl = params.get('level') || 'all';
      setProgramLevel(lvl, false);
    } catch (e) {}
  });

  // Initial Filter Application
  setProgramLevel(currentLevel, false);
}

// 17. Program Detail Page Renderer (Hardened, Zero-innerHTML & Safe URL)
function initProgramDetail() {
  const detailHero = document.getElementById('detail-hero');
  if (!detailHero) return;
  if (detailHero.dataset.initialized === 'true') return;
  detailHero.dataset.initialized = 'true';

  const crumbName = document.getElementById('crumb-program-name');
  const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');
  const urlParams = new URLSearchParams(window.location.search);
  const programId = urlParams.get('id') || 'bba-mgmt';

  const thSwitch = document.getElementById('lang-switch-th-link');
  const enSwitch = document.getElementById('lang-switch-en-link');
  if (thSwitch) thSwitch.href = isEn ? '../pages/program-detail.html?id=' + encodeURIComponent(programId) : 'program-detail.html?id=' + encodeURIComponent(programId);
  if (enSwitch) enSwitch.href = isEn ? 'program-detail.html?id=' + encodeURIComponent(programId) : '../en/program-detail.html?id=' + encodeURIComponent(programId);

  if (typeof window.getLamsProgramById !== 'function') return;

  const exactProgram = window.getLamsProgramById(programId);
  const program = exactProgram || (window.LAMS_PROGRAMS_DATA && window.LAMS_PROGRAMS_DATA[0]);

  if (!exactProgram && program && detailHero) {
    const alertBox = document.createElement('div');
    alertBox.className = 'program-detail-alert';
    const alertIcon = document.createElement('i');
    alertIcon.className = 'fa-solid fa-circle-exclamation';
    alertIcon.setAttribute('aria-hidden', 'true');
    const alertMsg = document.createElement('span');
    alertMsg.textContent = isEn
      ? 'Notice: The specified curriculum ID was not found. Displaying default featured program.'
      : 'ไม่พบรหัสหลักสูตรที่ระบุ ระบบกำลังแสดงผลหลักสูตรแนะนำเริ่มต้น';
    alertBox.append(alertIcon, alertMsg);
    const subHeroContainer = detailHero.querySelector('.subpage-hero-container');
    if (subHeroContainer) subHeroContainer.prepend(alertBox);
  }

  if (!program) return;

  const shortTitle = isEn ? (program.shortNameEn || program.nameEn) : program.shortName;
  document.title = isEn
    ? shortTitle + ' | Faculty of Liberal Arts and Management Sciences, PSU'
    : program.shortName + ' | คณะศิลปศาสตร์และวิทยาการจัดการ ม.อ.สุราษฎร์ธานี';

  if (crumbName) crumbName.textContent = shortTitle;

  const badgeText = document.getElementById('detail-badge-text');
  if (badgeText) {
    badgeText.textContent = isEn
      ? (program.levelNameEn || program.levelName) + ' • ' + (program.durationEn || program.duration)
      : program.levelName + ' • ' + program.duration;
  }

  // Safe Degree Code DOM construction (Zero innerHTML)
  const degreeCode = document.getElementById('detail-degree-code');
  if (degreeCode) {
    degreeCode.replaceChildren();
    const icon = document.createElement('i');
    const rawIcon = program.icon || 'fa-solid fa-graduation-cap';
    icon.className = /^[a-z0-9-\s]+$/i.test(rawIcon) ? rawIcon : 'fa-solid fa-graduation-cap';
    icon.setAttribute('aria-hidden', 'true');
    icon.style.marginRight = '8px';
    const textNode = document.createTextNode(
      isEn
        ? (program.degreeCodeEn || program.degreeCode)
        : program.degreeCode + ' (' + program.shortName + ')'
    );
    degreeCode.append(icon, textNode);
  }

  const titleEn = document.getElementById('detail-title-en');
  if (titleEn) titleEn.textContent = program.nameEn || '';

  const titleTh = document.getElementById('detail-title-th');
  if (titleTh) titleTh.textContent = program.nameTh || '';

  const philosophy = document.getElementById('detail-philosophy');
  if (philosophy) {
    philosophy.textContent = isEn ? (program.philosophyEn || program.philosophy) : program.philosophy;
  }

  // Safe Tracks DOM construction (Zero innerHTML)
  const tracksContainer = document.getElementById('detail-tracks-container');
  const tracks = isEn ? (program.tracksEn || program.tracks) : program.tracks;
  if (tracksContainer) {
    tracksContainer.replaceChildren();
    if (tracks && tracks.length > 0) {
      tracks.forEach((t) => {
        const box = document.createElement('div');
        box.className = 'track-box';
        const h4 = document.createElement('h4');
        h4.textContent = t.title || '';
        const p = document.createElement('p');
        p.textContent = t.desc || '';
        box.append(h4, p);
        tracksContainer.appendChild(box);
      });
    }
  }

  // Safe Careers DOM construction (Zero innerHTML)
  const careersContainer = document.getElementById('detail-careers-container');
  const careers = isEn ? (program.careersEn || program.careers) : program.careers;
  if (careersContainer) {
    careersContainer.replaceChildren();
    if (careers && careers.length > 0) {
      careers.forEach((c) => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle-check';
        icon.setAttribute('aria-hidden', 'true');
        icon.style.marginRight = '8px';
        const span = document.createElement('span');
        span.textContent = c;
        li.append(icon, span);
        careersContainer.appendChild(li);
      });
    }
  }

  // Sidebar Quick Facts
  const factLevel = document.getElementById('detail-fact-level');
  if (factLevel) factLevel.textContent = isEn ? (program.levelNameEn || program.levelName) : program.levelName;

  const factDuration = document.getElementById('detail-fact-duration');
  if (factDuration) factDuration.textContent = isEn ? (program.durationEn || program.duration) : program.duration;

  const factCredits = document.getElementById('detail-fact-credits');
  if (factCredits) factCredits.textContent = isEn ? (program.creditsEn || program.credits) : program.credits;

  const factPdfYear = document.getElementById('detail-fact-pdfyear');
  if (factPdfYear) {
    factPdfYear.textContent = isEn
      ? (program.pdfYearEn || program.pdfYear || '2026 (Latest)')
      : (program.pdfYear || 'รหัส 69 (ล่าสุด)');
  }

  // Safe PDF Link (Protocol Sanitized)
  const pdfBtn = document.getElementById('detail-pdf-btn');
  if (pdfBtn && isSafeUrl(program.pdfCurriculum)) {
    pdfBtn.href = program.pdfCurriculum;
  }

  // Safe Admission Outbound Link (Zero innerHTML)
  const applyBtn = document.getElementById('detail-apply-btn') || document.querySelector('.btn-sidebar-tcas');
  if (applyBtn) {
    const isMba = program.id === 'mba';
    const targetUrl = isMba ? 'https://grad.surat.psu.ac.th/' : 'https://entrance.surat.psu.ac.th/';
    applyBtn.href = targetUrl;
    applyBtn.replaceChildren();

    const btnText = document.createTextNode(
      isEn
        ? (isMba ? 'Apply MBA ' : 'Apply TCAS ')
        : (isMba ? 'สมัครเรียน ป.โท MBA ' : 'สมัครเรียน TCAS ม.อ. ')
    );
    const arrowIcon = document.createElement('i');
    arrowIcon.className = 'fa-solid fa-arrow-up-right-from-square';
    arrowIcon.setAttribute('aria-hidden', 'true');
    arrowIcon.style.fontSize = '0.8rem';
    arrowIcon.style.marginLeft = '6px';
    applyBtn.append(btnText, arrowIcon);
  }

  const feeNote = document.getElementById('detail-fee-note');
  if (feeNote) {
    feeNote.textContent = isEn
      ? (program.tuitionFeeEstimateEn || program.tuitionFeeEstimate)
      : program.tuitionFeeEstimate;
  }
}

// Master DOM Initialization Chain (Defensive, Safe Bootstrap)
function runMasterInit() {
  const initializers = [
    initSiteHeader,
    initSiteNav,
    initInfoAccordion,
    initVideoCampaign,
    initFloatingMessenger,
    initSmoothScroll,
    initProcurementFilters,
    initToastHelper,
    initScholarshipModal,
    initResearchHandlers,
    initLanguageSwitcher,
    initCampusVideoModal,
    initSocialShareSystem,
    initNewsFilter,
    initPeopleFilter,
    initProgramCatalog,
    initProgramDetail
  ];

  initializers.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      // Graceful error isolation
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runMasterInit, { once: true });
} else {
  runMasterInit();
}
