chrome.windows.getCurrent({ populate: true }, ({ tabs }) => {
    const activeTab = tabs.filter(tab => tab.active)[0];
    window.open(`https://bookmark-man.herokuapp.com/?name=${encodeURIComponent(activeTab.title)}&url=${encodeURIComponent(activeTab.url)}`, "_blank");
});