async function startScan(multiPage) {
    document.getElementById('a11y-results').innerHTML = '<div style="text-align:center;padding:40px;">⏳ Scanning...</div>';
    try {
      if (multiPage) {
        // wait for libguides to load navigatin
        await new Promise(r => setTimeout(r, 500));
        window.scrollBy(0, 100);
        window.scrollBy(0, -100);
        await new Promise(r => setTimeout(r, 300));

        const pages = discoverGuidePages();
        const results = await scanMultiplePages(pages);
        displayMultiPageResults(results);
      } else {
        const container = findLibGuidesContainer();

        // HIDE ADMIN ELEMENTS BEFORE SCANNING
        // const adminElements = container.querySelectorAll('.s-lg-content-edit, .s-lg-box-edit, .s-lib-box-edit, [class*="s-lg-edit"], [class*="s-lib-edit"]');
        const adminElements = container.querySelectorAll('.s-lg-content-edit, .s-lg-box-edit, .s-lib-box-edit, [id*="admin-edit"], .dropdown-toggle');
        adminElements.forEach(el => el.style.display = 'none');

        const axeResults = await axe.run(container, {
            runOnly: ['wcag2a', 'wcag2aa', 'best-practice'], 
            resultTypes: ['violations']});
        
        // RESTORE ADMIN ELEMENTS
        adminElements.forEach(el => el.style.display = '');

        const filteredAxeViolations = axeResults.violations.filter(v => 
            v.id !== 'empty-heading' 
            && v.id !== 'heading-order'
            && v.id !== 'duplicate-id' 
            && v.id !== 'scope-attr-valid'
            && v.id !== 'image-alt'
            && v.id !== 'frame-title'
            && v.id !== 'th-has-data-cells'
            && v.id !== 'label-content-name-mismatch' 
            && v.id !== 'page-has-heading-one'
        );

        displaySinglePageResults({ violations: [...filteredAxeViolations, ...runCustomChecks(container)] });
      }
    } catch (err) {
      document.getElementById('a11y-results').innerHTML = `<div style="color:#dc3545;background:#f8d7da;padding:20px;border-radius:8px;border:1px solid #f5c6cb;"><strong>Error:</strong> ${err.message}<br><br><small>Check browser console for details.</small></div>`;
    }
  }