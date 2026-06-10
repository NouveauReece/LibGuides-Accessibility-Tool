import './components/BookmarkletFrame.js'
(function() { 'use strict';
  if (document.querySelectorAll('accessibility-tool').length == 0 ) {

    const style = document.createElement('style');
    style.textContent = `.a11y-violation-highlight {outline: 4px solid #ffcb05 !important;outline-offset: 2px !important;background: rgba(255, 203, 5, 0.1) !important;scroll-margin: 100px;}`;
    document.head.appendChild(style);

    const tool = document.createElement('accessibility-tool');
    tool.style.zIndex = 2000000000;
    tool.addEventListener('click', () => {
      document.querySelector('accessibility-tool').style.zIndex = 2000000000;
    });
    document.body.appendChild(tool);

    // Setup for dialogs
    const setupDialogs = () => {
      document.querySelectorAll('[role="dialog"].ui-dialog').forEach((el) => {
        el.addEventListener('click', () => {
            document.querySelector('accessibility-tool').style.zIndex = 999;
          });
      });
    };

    // Setup for overlays
    const setupOverlays = () => {
      document.querySelectorAll('.ui-widget-overlay').forEach((el) => {
        el.style = 'z-index: 10!important';
      });
    };

    // Run setup immediately if elements exist
    setupDialogs();
    setupOverlays();

    // Watch for future DOM changes
    const observer = new MutationObserver(() => {
      setupDialogs();
      setupOverlays();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

  }
})();