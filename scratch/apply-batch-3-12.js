const fs = require('fs');

function refactorIndex() {
  let content = fs.readFileSync('index.html', 'utf8');

  const replacements = [
    // 1. Intro & Quick Access
    {
      target: '<p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">',
      replace: '<p class="section-intro-lead">'
    },
    {
      target: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">',
      replace: '<div class="quick-access-grid">'
    },
    // Brand Icons
    {
      target: '<i class="fa-brands fa-tiktok" style="color: #25F4EE;"></i>',
      replace: '<i class="fa-brands fa-tiktok icon-brand--tiktok"></i>'
    },
    {
      target: '<i class="fa-brands fa-youtube" style="color: #FF0000;"></i>',
      replace: '<i class="fa-brands fa-youtube icon-brand--youtube"></i>'
    },
    // Facility Icon
    {
      target: '<i class="fa-solid fa-building-columns" style="color: var(--theme-success); margin-right: 6px;"></i>',
      replace: '<i class="fa-solid fa-building-columns icon-prefix--success"></i>'
    },
    // Read all news button
    {
      target: '<a href="pages/news.html" class="btn-read-all" style="display: inline-block; text-decoration: none; text-align: center;">',
      replace: '<a href="pages/news.html" class="btn-read-all btn-inline-block-center">'
    },
    // Programs Header Icon
    {
      target: '<i class="fa-solid fa-graduation-cap" style="color: var(--theme-amber); margin-right: 10px;"></i>',
      replace: '<i class="fa-solid fa-graduation-cap icon-prefix--amber-gap"></i>'
    },
    // Drawer Container
    {
      target: '<div id="accordionProgramDrawer" style="display: none; max-width: 920px; margin: -25px auto 40px; background: rgba(0, 0, 0, 0.45); border: 1px solid var(--border-card); border-radius: 16px; padding: 25px 30px; text-align: left; backdrop-filter: blur(10px);">',
      replace: '<div id="accordionProgramDrawer" class="dropdown-info-panel" style="display: none;">'
    },
    // Drawer Grid & Titles
    {
      target: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">',
      replace: '<div class="dropdown-info-grid">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-weight: 800; font-size: 1.05rem; margin-bottom: 12px; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 6px;">',
      replace: '<div class="dropdown-info-col-title">'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 8px;">',
      replace: '<div class="dropdown-info-list">'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">',
      replace: '<div class="dropdown-info-list dropdown-info-list--mb">'
    },
    // Drawer Callout Card
    {
      target: '<div style="background: rgba(220, 38, 38, 0.15); border: 1px solid var(--border-card); border-radius: 10px; padding: 14px;">',
      replace: '<div class="dropdown-callout-card">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">',
      replace: '<div class="dropdown-callout-title">'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.82rem; margin: 0 0 10px;">',
      replace: '<p class="dropdown-callout-desc">'
    },
    {
      target: '<a href="pages/programs.html" class="btn-card-detail" style="font-size: 0.85rem; padding: 6px 14px; display: inline-block;">',
      replace: '<a href="pages/programs.html" class="btn-card-detail dropdown-callout-btn">'
    },
    // External link icons
    {
      target: '<i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--theme-amber); margin-right: 6px; font-size: 0.8rem;"></i>',
      replace: '<i class="fa-solid fa-arrow-up-right-from-square icon-external-amber"></i>'
    },
    // Scholarships Modal
    {
      target: '<button id="closeScholarshipModal" aria-label="ปิดหน้าต่างทุนการศึกษา" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.08); border: none; color: var(--text-primary); width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">',
      replace: '<button id="closeScholarshipModal" aria-label="ปิดหน้าต่างทุนการศึกษา" class="modal-close-btn">'
    },
    {
      target: '<div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">',
      replace: '<div class="modal-hero-header">'
    },
    {
      target: '<div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(220, 38, 38, 0.15); border: 1px solid var(--border-card); display: flex; align-items: center; justify-content: center; color: var(--theme-amber); font-size: 1.5rem;">',
      replace: '<div class="modal-hero-icon">'
    },
    {
      target: '<h3 id="scholarshipTitle" style="color: var(--text-primary); font-size: 1.35rem; font-weight: 700; margin: 0;">',
      replace: '<h3 id="scholarshipTitle" class="modal-hero-title">'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">',
      replace: '<p class="modal-hero-subtitle">'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 25px;">',
      replace: '<div class="modal-features-stack">'
    },
    {
      target: '<div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">',
      replace: '<div class="modal-feature-card">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-weight: 700; font-size: 1rem; margin-bottom: 4px;">',
      replace: '<div class="modal-feature-title">'
    },
    {
      target: '<p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0;">',
      replace: '<p class="modal-feature-desc">'
    },
    {
      target: '<div style="background: rgba(220,38,38,0.1); border-left: 4px solid var(--theme-red-bright); padding: 12px 16px; border-radius: 0 10px 10px 0; margin-bottom: 25px;">',
      replace: '<div class="modal-notice-banner">'
    },
    {
      target: '<div style="color: var(--text-primary); font-size: 0.88rem; font-weight: 600;">',
      replace: '<div class="modal-notice-heading">'
    },
    {
      target: '<p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">',
      replace: '<p class="modal-notice-text">'
    },
    {
      target: '<a href="pages/news-detail.html?id=1" style="color: var(--theme-amber); text-decoration: underline;">',
      replace: '<a href="pages/news-detail.html?id=1" class="link-amber-underline">'
    },
    {
      target: '<div style="display: flex; justify-content: flex-end; gap: 10px;">',
      replace: '<div class="modal-actions-bar">'
    },
    {
      target: '<button id="dismissScholarshipBtn" class="btn-card-detail" style="border: none; cursor: pointer; padding: 10px 24px;">',
      replace: '<button id="dismissScholarshipBtn" class="btn-card-detail modal-action-btn-primary">'
    },
    // Campus Video Modal
    {
      target: '<div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">',
      replace: '<div class="video-modal-header-left">'
    },
    {
      target: '<span style="padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; background: rgba(220, 38, 38, 0.2); color: var(--theme-amber); white-space: nowrap;">',
      replace: '<span class="video-modal-tag">'
    },
    {
      target: '<h3 id="campusVideoTitle" style="color: var(--text-primary); font-size: 1.15rem; font-weight: 700; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">',
      replace: '<h3 id="campusVideoTitle" class="video-modal-title">'
    },
    {
      target: '<button id="closeCampusVideoModal" aria-label="ปิดวิดีโอ" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-primary); width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0;">',
      replace: '<button id="closeCampusVideoModal" aria-label="ปิดวิดีโอ" class="modal-close-btn">'
    },
    {
      target: '<div style="padding: 16px; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden; flex: 1; min-height: 320px;">',
      replace: '<div class="video-player-frame">'
    },
    {
      target: '<video id="campusVideoNative" controls playsinline preload="metadata" hidden style="width: 100%; max-height: 65vh; border-radius: 12px; background: #000;">',
      replace: '<video id="campusVideoNative" class="video-element-native" controls playsinline preload="metadata" hidden>'
    },
    {
      target: '<div id="campusVideoShowcase" style="width: 100%; display: flex; flex-direction: column; align-items: center; border-radius: 14px; overflow: hidden; background: #0a0a0c; border: 1px solid var(--border-subtle); box-shadow: inset 0 0 20px rgba(0,0,0,0.6);">',
      replace: '<div id="campusVideoShowcase" class="video-showcase-box">'
    },
    {
      target: '<div id="campusVideoPoster" role="button" tabindex="0" aria-label="คลิกเพื่อเปิดรับชมวิดีโอ" style="width: 100%; height: 320px; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">',
      replace: '<div id="campusVideoPoster" class="video-showcase-poster" role="button" tabindex="0" aria-label="คลิกเพื่อเปิดรับชมวิดีโอ">'
    },
    {
      target: '<div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,2,4,0.85) 100%);"></div>',
      replace: '<div class="video-showcase-scrim"></div>'
    },
    {
      target: '<div class="showcase-play-btn" style="position: relative; z-index: 2; width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--theme-red-bright), #b91c1c); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.8rem; box-shadow: 0 10px 30px rgba(220, 38, 38, 0.6); padding-left: 4px; transition: transform 0.25s ease;">',
      replace: '<div class="showcase-play-btn video-play-btn-circle">'
    },
    {
      target: '<div style="width: 100%; padding: 20px 24px; background: linear-gradient(180deg, rgba(14, 2, 4, 0.95), rgba(10, 2, 4, 0.98)); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; border-top: 1px solid var(--border-card);">',
      replace: '<div class="video-showcase-bottom-bar">'
    },
    {
      target: '<div id="campusVideoShowcaseTitle" style="color: #fff; font-size: 1.15rem; font-weight: 700; line-height: 1.4;">',
      replace: '<div id="campusVideoShowcaseTitle" class="video-showcase-bottom-title">'
    },
    {
      target: '<a id="campusVideoHeroBtn" href="#" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(135deg, var(--theme-red-bright), #991b1b); color: #fff; font-size: 1rem; font-weight: 700; padding: 12px 28px; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 24px rgba(220, 38, 38, 0.45); transition: transform 0.2s, box-shadow 0.2s;">',
      replace: '<a id="campusVideoHeroBtn" class="video-showcase-cta-btn" href="#" target="_blank" rel="noopener noreferrer">'
    },
    {
      target: '<div style="color: var(--text-muted); font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">',
      replace: '<div class="video-showcase-tip">'
    },
    {
      target: '<i class="fa-solid fa-circle-info" style="color: var(--theme-amber);"></i>',
      replace: '<i class="fa-solid fa-circle-info text-amber"></i>'
    },
    {
      target: 'style="display: none; border: none; border-radius: 12px; width: 100%;"',
      replace: 'class="video-iframe-embed" style="display: none;"'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์</p>',
      replace: '<p class="modal-footer-caption">คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์</p>'
    },
    {
      target: '<div style="display: flex; gap: 10px; align-items: center;">',
      replace: '<div class="modal-footer-controls">'
    },
    {
      target: '<a id="campusVideoDirectLink" href="#" target="_blank" rel="noopener noreferrer" class="btn-card-detail" style="font-size: 0.85rem; padding: 6px 14px; text-decoration: none;">',
      replace: '<a id="campusVideoDirectLink" href="#" target="_blank" rel="noopener noreferrer" class="btn-card-detail btn-card-detail--sm">'
    },
    {
      target: '<i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem; margin-left: 4px;"></i>',
      replace: '<i class="fa-solid fa-arrow-up-right-from-square icon-gap-sm"></i>'
    },
    {
      target: '<button id="dismissCampusVideoBtn" type="button" class="btn-card-detail" style="font-size: 0.85rem; padding: 6px 16px; background: rgba(255,255,255,0.08); border-color: var(--border-card); cursor: pointer;">',
      replace: '<button id="dismissCampusVideoBtn" type="button" class="btn-card-detail btn-card-detail--dimmed">'
    },
    {
      target: '<i class="fa-solid fa-circle-info" style="color: var(--theme-amber); font-size: 1.2rem;"></i>',
      replace: '<i class="fa-solid fa-circle-info toast-icon-amber"></i>'
    }
  ];

  let applied = 0;
  replacements.forEach((r, idx) => {
    if (content.includes(r.target)) {
      content = content.split(r.target).join(r.replace);
      applied++;
    } else {
      console.warn(`[index.html] Target ${idx} not matched: ${r.target.slice(0, 45)}...`);
    }
  });

  fs.writeFileSync('index.html', content, 'utf8');
  console.log(`[index.html] Applied ${applied} / ${replacements.length} replacements.`);
}

function refactorEnIndex() {
  let content = fs.readFileSync('en/index.html', 'utf8');

  const replacements = [
    // 1. Intro & Quick Access
    {
      target: '<p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">',
      replace: '<p class="section-intro-lead">'
    },
    {
      target: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">',
      replace: '<div class="quick-access-grid">'
    },
    // Brand Icons
    {
      target: '<i class="fa-brands fa-tiktok" style="color: #25F4EE;"></i>',
      replace: '<i class="fa-brands fa-tiktok icon-brand--tiktok"></i>'
    },
    {
      target: '<i class="fa-brands fa-youtube" style="color: #FF0000;"></i>',
      replace: '<i class="fa-brands fa-youtube icon-brand--youtube"></i>'
    },
    // Facility Icon
    {
      target: '<i class="fa-solid fa-building-columns" style="color: var(--theme-success); margin-right: 6px;"></i>',
      replace: '<i class="fa-solid fa-building-columns icon-prefix--success"></i>'
    },
    // Read all news button
    {
      target: '<a href="news.html" class="btn-read-all" style="display: inline-block; text-decoration: none; text-align: center;">',
      replace: '<a href="news.html" class="btn-read-all btn-inline-block-center">'
    },
    // Programs Header Icon
    {
      target: '<i class="fa-solid fa-graduation-cap" style="color: var(--theme-amber); margin-right: 10px;"></i>',
      replace: '<i class="fa-solid fa-graduation-cap icon-prefix--amber-gap"></i>'
    },
    // Drawer Container
    {
      target: '<div id="accordionProgramDrawer" style="display: none; max-width: 920px; margin: -25px auto 40px; background: rgba(0, 0, 0, 0.45); border: 1px solid var(--border-card); border-radius: 16px; padding: 25px 30px; text-align: left; backdrop-filter: blur(10px);">',
      replace: '<div id="accordionProgramDrawer" class="dropdown-info-panel" style="display: none;">'
    },
    // Drawer Grid & Titles
    {
      target: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">',
      replace: '<div class="dropdown-info-grid">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-weight: 800; font-size: 1.05rem; margin-bottom: 12px; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 6px;">',
      replace: '<div class="dropdown-info-col-title">'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 8px;">',
      replace: '<div class="dropdown-info-list">'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">',
      replace: '<div class="dropdown-info-list dropdown-info-list--mb">'
    },
    // Drawer Program Links
    {
      target: 'style="color: #fff; text-decoration: none; font-size: 0.9rem; padding: 5px 8px; border-radius: 6px;"',
      replace: 'class="dropdown-program-link"'
    },
    // Drawer Callout Card
    {
      target: '<div style="background: rgba(220, 38, 38, 0.15); border: 1px solid var(--border-card); border-radius: 10px; padding: 14px;">',
      replace: '<div class="dropdown-callout-card">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">',
      replace: '<div class="dropdown-callout-title">'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.82rem; margin: 0 0 10px;">',
      replace: '<p class="dropdown-callout-desc">'
    },
    {
      target: '<a href="programs.html" class="btn-card-detail" style="font-size: 0.85rem; padding: 6px 14px; display: inline-block;">',
      replace: '<a href="programs.html" class="btn-card-detail dropdown-callout-btn">'
    },
    // External link icons
    {
      target: '<i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--theme-amber); margin-right: 6px; font-size: 0.8rem;"></i>',
      replace: '<i class="fa-solid fa-arrow-up-right-from-square icon-external-amber"></i>'
    },
    // Scholarships Modal
    {
      target: '<button id="closeScholarshipModal" aria-label="Close scholarship modal" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.08); border: none; color: var(--text-primary); width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">',
      replace: '<button id="closeScholarshipModal" aria-label="Close scholarship modal" class="modal-close-btn">'
    },
    {
      target: '<div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">',
      replace: '<div class="modal-hero-header">'
    },
    {
      target: '<div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(220, 38, 38, 0.15); border: 1px solid var(--border-card); display: flex; align-items: center; justify-content: center; color: var(--theme-amber); font-size: 1.5rem;">',
      replace: '<div class="modal-hero-icon">'
    },
    {
      target: '<h3 id="scholarshipTitle" style="color: var(--text-primary); font-size: 1.35rem; font-weight: 700; margin: 0;">',
      replace: '<h3 id="scholarshipTitle" class="modal-hero-title">'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Faculty of Liberal Arts and Management Sciences, PSU Surat Thani</p>',
      replace: '<p class="modal-hero-subtitle">Faculty of Liberal Arts and Management Sciences, PSU Surat Thani</p>'
    },
    {
      target: '<div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 25px;">',
      replace: '<div class="modal-features-stack">'
    },
    {
      target: '<div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">',
      replace: '<div class="modal-feature-card">'
    },
    {
      target: '<div style="color: var(--theme-amber); font-weight: 700; font-size: 1rem; margin-bottom: 4px;">',
      replace: '<div class="modal-feature-title">'
    },
    {
      target: '<p style="color: var(--text-muted); font-size: 0.88rem; margin: 0;">',
      replace: '<p class="modal-feature-desc--muted">'
    },
    {
      target: '<div style="text-align: right;">',
      replace: '<div class="text-right">'
    },
    {
      target: '<button id="dismissScholarshipBtn" class="btn-card-detail" style="padding: 10px 22px;">',
      replace: '<button id="dismissScholarshipBtn" class="btn-card-detail btn-card-detail--lg">'
    },
    // Campus Video Modal
    {
      target: '<div style="display: flex; align-items: center; gap: 10px;">',
      replace: '<div class="video-modal-header-left">'
    },
    {
      target: '<span id="campusVideoBadge" style="background: rgba(37, 244, 238, 0.15); color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;">',
      replace: '<span id="campusVideoBadge" class="video-modal-tag--cyan">'
    },
    {
      target: '<h3 id="campusVideoTitle" style="color: var(--text-primary); font-size: 1.05rem; font-weight: 700; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 450px;">',
      replace: '<h3 id="campusVideoTitle" class="video-modal-title">'
    },
    {
      target: '<button id="closeCampusVideoModal" aria-label="Close video player" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-primary); width: 34px; height: 34px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">',
      replace: '<button id="closeCampusVideoModal" aria-label="Close video player" class="modal-close-btn">'
    },
    {
      target: 'style="border: none; width: 100%; aspect-ratio: 16 / 9; display: block;"',
      replace: 'class="video-iframe-responsive"'
    },
    {
      target: '<video id="campusVideoNative" controls playsinline style="display: none; width: 100%; max-height: 65vh;"></video>',
      replace: '<video id="campusVideoNative" class="video-element-native" controls playsinline style="display: none;"></video>'
    },
    {
      target: '<a id="campusVideoDirectLink" href="#" target="_blank" rel="noopener noreferrer" style="color: var(--theme-amber); font-size: 0.88rem; font-weight: 600; text-decoration: none;">',
      replace: '<a id="campusVideoDirectLink" class="video-direct-link" href="#" target="_blank" rel="noopener noreferrer">'
    },
    {
      target: '<button id="dismissCampusVideoBtn" class="btn-card-detail" style="padding: 6px 16px; font-size: 0.85rem;">',
      replace: '<button id="dismissCampusVideoBtn" class="btn-card-detail btn-card-detail--dimmed">'
    }
  ];

  let applied = 0;
  replacements.forEach((r, idx) => {
    if (content.includes(r.target)) {
      content = content.split(r.target).join(r.replace);
      applied++;
    } else {
      console.warn(`[en/index.html] Target ${idx} not matched: ${r.target.slice(0, 45)}...`);
    }
  });

  fs.writeFileSync('en/index.html', content, 'utf8');
  console.log(`[en/index.html] Applied ${applied} / ${replacements.length} replacements.`);
}

refactorIndex();
refactorEnIndex();
