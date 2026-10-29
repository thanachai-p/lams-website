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

// 7. Interactive Procurement Filter Tabs & Search
function initProcurementFilters() {
  const procurementItems = document.querySelectorAll('.procurement-item');
  if (procurementItems.length === 0) return;

  const filterTabs = document.querySelectorAll('.catalog-filters .catalog-tab, .filter-pill');
  const searchInput = document.getElementById('procure-search-input');
  const emptyState = document.getElementById('procure-empty-state');

  function filterProcure() {
    const activeTab = document.querySelector('.catalog-filters .catalog-tab.active, .filter-pill.active, .catalog-filters .catalog-tab.filter-pill--active');
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
      it.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
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
    searchInput.addEventListener('input', filterProcure);
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
  const scholarshipBtn = document.getElementById('card-scholarships-btn');
  const scholarshipModal = document.getElementById('scholarshipModal');
  const closeScholarshipModal = document.getElementById('closeScholarshipModal');
  const dismissScholarshipBtn = document.getElementById('dismissScholarshipBtn');

  if (!scholarshipBtn || !scholarshipModal) return;

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

    if (videoDirectLink) {
      videoDirectLink.href = directUrl;
      videoDirectLink.innerHTML = provider === 'tiktok'
        ? '<i class="fa-brands fa-tiktok" style="color: var(--brand-tiktok-cyan); margin-right: 6px;"></i> เปิดดูบน TikTok ➔'
        : '<i class="fa-brands fa-youtube" style="color: #FF0000; margin-right: 6px;"></i> เปิดดูบน YouTube ➔';
    }

    if (videoBadge) {
      if (provider === 'tiktok') {
        videoBadge.innerHTML = '<i class="fa-brands fa-tiktok" style="color: var(--brand-tiktok-cyan);"></i> TikTok Clip';
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
          videoIframe.style.aspectRatio = '9 / 16';
          videoIframe.style.maxWidth = '360px';
          videoIframe.style.width = '100%';
          videoIframe.style.height = 'min(620px, 72vh)';
          videoIframe.src = `https://www.tiktok.com/player/v1/${videoId}`;
          if (videoDialog) {
            videoDialog.style.maxWidth = '440px';
          }
        } else {
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
    facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    line: (url) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`
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
    const features = `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,noopener,noreferrer`;

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
        const originalHtml = buttonElement.innerHTML;
        buttonElement.classList.add('copied');
        buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> คัดลอกแล้ว!';
        setTimeout(() => {
          buttonElement.classList.remove('copied');
          buttonElement.innerHTML = originalHtml;
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


// 14. News Filter System (Bilingual & Safe State)
function initNewsFilter() {
  const searchInput = document.getElementById('news-search-input');
  const newsContainer = document.querySelector('.news-grid-page');
  if (!newsContainer && !searchInput) return;

  const tabs = document.querySelectorAll('.catalog-tab');
  const cards = document.querySelectorAll('.news-grid-page .program-card-item');

  function filterNews() {
    const activeTab = document.querySelector('.catalog-tab.active, .catalog-tab.filter-pill--active');
    const cat = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach((c) => {
      const cardCat = c.getAttribute('data-category');
      const text = c.textContent.toLowerCase();
      const matchCat = (cat === 'all' || cardCat === cat);
      const matchQ = !q || text.includes(q);
      const show = matchCat && matchQ;

      c.style.display = show ? '' : 'none';
      c.classList.toggle('is-hidden', !show);
      c.setAttribute('aria-hidden', (!show).toString());
    });
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('active', 'filter-pill--active');
        item.setAttribute('aria-selected', 'false');
      });
      t.classList.add('active', 'filter-pill--active');
      t.setAttribute('aria-selected', 'true');
      filterNews();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterNews);
  }
}

// 15. Directory & Faculty People Filter
function initPeopleFilter() {
  const peopleGrid = document.getElementById('peopleGrid');
  if (!peopleGrid) return;

  const tabs = document.querySelectorAll('#peopleFilters .catalog-tab');
  const searchInput = document.getElementById('peopleSearchInput');
  const cards = document.querySelectorAll('#peopleGrid .people-card');
  const emptyState = document.getElementById('peopleEmptyState');

  let currentFilter = 'all';
  let currentQuery = '';

  function filterDirectory() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (currentFilter === 'all') || (cardCategory === currentFilter);
      const matchesSearch = !currentQuery || keywords.includes(currentQuery) || cardText.includes(currentQuery);
      const show = matchesCategory && matchesSearch;

      card.style.display = show ? '' : 'none';
      card.classList.toggle('is-hidden', !show);
      card.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active', 'filter-pill--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active', 'filter-pill--active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-filter') || 'all';
      filterDirectory();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.trim().toLowerCase();
      filterDirectory();
    });
  }
}

// 16. Academic Degree Programs Catalog Filter & URL Sync
function initProgramCatalog() {
  const programSearch = document.getElementById('program-search-input');
  const emptyState = document.getElementById('catalog-empty-state');
  const programCards = document.querySelectorAll('.program-catalog-grid .program-card-item, .program-card-item');

  // Guard: Run only on pages that have the program search or empty state and aren't news
  if (!programSearch && !emptyState) return;
  if (document.querySelector('.news-grid-page')) return; // Avoid colliding with news catalog

  const tabs = document.querySelectorAll('.catalog-tab');

  // Check URL query parameters (e.g. ?level=bachelor or ?level=master)
  const urlParams = new URLSearchParams(window.location.search);
  const initialLevel = urlParams.get('level');
  if (initialLevel) {
    tabs.forEach((tab) => {
      if (tab.getAttribute('data-filter') === initialLevel) {
        tabs.forEach((t) => {
          t.classList.remove('active', 'filter-pill--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active', 'filter-pill--active');
        tab.setAttribute('aria-selected', 'true');
      }
    });
  }

  function filterPrograms() {
    const activeTab = document.querySelector('.catalog-tab.active, .catalog-tab.filter-pill--active');
    const filterCategory = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const query = programSearch ? programSearch.value.toLowerCase().trim() : '';

    let visibleCount = 0;

    programCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (filterCategory === 'all' || cardCategory === filterCategory);
      const matchesQuery = !query || cardText.includes(query);
      const show = matchesCategory && matchesQuery;

      card.style.display = show ? '' : 'none';
      card.classList.toggle('is-hidden', !show);
      card.setAttribute('aria-hidden', (!show).toString());

      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      emptyState.classList.toggle('is-hidden', visibleCount !== 0);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active', 'filter-pill--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active', 'filter-pill--active');
      tab.setAttribute('aria-selected', 'true');
      filterPrograms();
    });
  });

  if (programSearch) {
    programSearch.addEventListener('input', filterPrograms);
  }

  // Initial filter run
  filterPrograms();
}

// 17. Program Detail Page Renderer (Bilingual TH / EN)
function initProgramDetail() {
  const detailHero = document.getElementById('detail-hero');
  const crumbName = document.getElementById('crumb-program-name');
  if (!detailHero && !crumbName) return;

  const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');
  const urlParams = new URLSearchParams(window.location.search);
  const programId = urlParams.get('id') || 'bba-mgmt';

  // Synchronize Language Switcher Links
  const thSwitch = document.getElementById('lang-switch-th-link');
  const enSwitch = document.getElementById('lang-switch-en-link');
  if (thSwitch) thSwitch.href = isEn ? `../pages/program-detail.html?id=${encodeURIComponent(programId)}` : `program-detail.html?id=${encodeURIComponent(programId)}`;
  if (enSwitch) enSwitch.href = isEn ? `program-detail.html?id=${encodeURIComponent(programId)}` : `../en/program-detail.html?id=${encodeURIComponent(programId)}`;

  if (typeof window.getLamsProgramById !== 'function') return;

  const exactProgram = window.getLamsProgramById(programId);
  const program = exactProgram || (window.LAMS_PROGRAMS_DATA && window.LAMS_PROGRAMS_DATA[0]);

  if (!exactProgram && program && detailHero) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = 'background: rgba(245, 158, 11, 0.15); border: 1px solid var(--theme-amber); color: #fff; padding: 12px 18px; border-radius: 10px; margin-bottom: 20px; font-size: 0.9rem; max-width: 800px;';
    alertBox.innerHTML = isEn
      ? '<i class="fa-solid fa-circle-exclamation" style="color: var(--theme-amber); margin-right: 8px;"></i> Notice: The specified curriculum ID was not found. Displaying default featured program.'
      : '<i class="fa-solid fa-circle-exclamation" style="color: var(--theme-amber); margin-right: 8px;"></i> ไม่พบรหัสหลักสูตรที่ระบุ ระบบกำลังแสดงผลหลักสูตรแนะนำเริ่มต้น';
    const subHeroContainer = detailHero.querySelector('.subpage-hero-container');
    if (subHeroContainer) subHeroContainer.prepend(alertBox);
  }

  if (!program) return;

  // Page Title & Breadcrumb
  const shortTitle = isEn ? (program.shortNameEn || program.nameEn) : program.shortName;
  document.title = isEn
    ? `${shortTitle} | Faculty of Liberal Arts and Management Sciences, PSU`
    : `${program.shortName} | คณะศิลปศาสตร์และวิทยาการจัดการ ม.อ.สุราษฎร์ธานี`;

  if (crumbName) crumbName.textContent = shortTitle;

  // Hero Fields
  const badgeText = document.getElementById('detail-badge-text');
  if (badgeText) {
    badgeText.textContent = isEn
      ? `${program.levelNameEn || program.levelName} • ${program.durationEn || program.duration}`
      : `${program.levelName} • ${program.duration}`;
  }

  const degreeCode = document.getElementById('detail-degree-code');
  if (degreeCode) {
    const icon = program.icon || 'fa-solid fa-graduation-cap';
    degreeCode.innerHTML = isEn
      ? `<i class="${icon}"></i> ${program.degreeCodeEn || program.degreeCode}`
      : `<i class="${program.icon}"></i> ${program.degreeCode} (${program.shortName})`;
  }

  const titleEn = document.getElementById('detail-title-en');
  if (titleEn) titleEn.textContent = program.nameEn;

  const titleTh = document.getElementById('detail-title-th');
  if (titleTh) titleTh.textContent = program.nameTh;

  // Philosophy
  const philosophy = document.getElementById('detail-philosophy');
  if (philosophy) {
    philosophy.textContent = isEn ? (program.philosophyEn || program.philosophy) : program.philosophy;
  }

  // Tracks
  const tracksContainer = document.getElementById('detail-tracks-container');
  const tracks = isEn ? (program.tracksEn || program.tracks) : program.tracks;
  if (tracksContainer && tracks && tracks.length > 0) {
    tracksContainer.innerHTML = tracks.map((t) => `
      <div class="track-box">
        <h4>${t.title}</h4>
        <p>${t.desc}</p>
      </div>
    `).join('');
  }

  // Careers
  const careersContainer = document.getElementById('detail-careers-container');
  const careers = isEn ? (program.careersEn || program.careers) : program.careers;
  if (careersContainer && careers && careers.length > 0) {
    careersContainer.innerHTML = careers.map((c) => `
      <li><i class="fa-solid fa-circle-check"></i> ${c}</li>
    `).join('');
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

  const pdfBtn = document.getElementById('detail-pdf-btn');
  if (pdfBtn && program.pdfCurriculum) {
    pdfBtn.href = program.pdfCurriculum;
  }

  // Admission Link Routing
  const applyBtn = document.getElementById('detail-apply-btn') || document.querySelector('.btn-sidebar-tcas');
  if (applyBtn) {
    if (program.id === 'mba') {
      applyBtn.href = 'https://grad.surat.psu.ac.th/';
      applyBtn.innerHTML = isEn
        ? 'Apply MBA <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 6px;"></i>'
        : 'สมัครเรียน ป.โท MBA <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 6px;"></i>';
    } else {
      applyBtn.href = 'https://entrance.surat.psu.ac.th/';
      applyBtn.innerHTML = isEn
        ? 'Apply TCAS <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 6px;"></i>'
        : 'สมัครเรียน TCAS ม.อ. <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem; margin-left: 6px;"></i>';
    }
  }

  // Tuition Note
  const feeNote = document.getElementById('detail-fee-note');
  if (feeNote) {
    feeNote.textContent = isEn
      ? (program.tuitionFeeEstimateEn || program.tuitionFeeEstimate)
      : program.tuitionFeeEstimate;
  }
}

// Master DOM Initialization Chain
document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initSiteNav();
  initInfoAccordion();
  initVideoCampaign();
  initFloatingMessenger();
  initSmoothScroll();
  initProcurementFilters();
  initToastHelper();
  initScholarshipModal();
  initResearchHandlers();
  initLanguageSwitcher();
  initCampusVideoModal();
  initSocialShareSystem();
});
