import './components/BookmarkletFrame.js'
(function() { 'use strict';
  if (document.querySelectorAll('accessibility-tool').length == 0 ) {

    const style = document.createElement('style');
    style.textContent = `.a11y-violation-highlight {outline: 4px solid #ffcb05 !important;outline-offset: 2px !important;background: rgba(255, 203, 5, 0.1) !important;scroll-margin: 100px;}`;
    document.head.appendChild(style);

    const tool = document.createElement('accessibility-tool')
    document.body.appendChild(tool)
  }
})();