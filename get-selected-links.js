'use strict';
(() => {
    const selection = document.getSelection();
    return Array.from(document.links).filter(e => selection.containsNode(e, true) && e.href.match(/^https?:/i)).map(e => e.href);
})();
