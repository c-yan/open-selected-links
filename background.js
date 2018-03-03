'use strict';
(() => {
    const MENU_ITEM_ID = 'open-selected-links';

    async function openTabs(urls) {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        for (var u of urls) browser.tabs.create({ url: u, openerTabId: tabs[0].id });
    }

    function getSelectedLinksWrapper() {
        return browser.tabs.executeScript({ file: 'get-selected-links.js' });
    }

    async function onOpenSelectedLinks(info, tab) {
        const links = (await getSelectedLinksWrapper())[0];
        openTabs(links);
    }

    browser.menus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == MENU_ITEM_ID) onOpenSelectedLinks(info, tab);
    });

    browser.menus.create({ id: MENU_ITEM_ID, title: browser.i18n.getMessage('menuItemTitle'), contexts: ['selection'] });
})();
