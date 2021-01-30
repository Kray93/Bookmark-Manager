window.addEventListener("load", () => {
    chrome.windows.getCurrent({populate:true}, window => {
        const activeTab = window.tabs.filter(tab => tab.active)[0];
        console.log(activeTab);
        document.getElementById("url_input").value = activeTab.url;
        document.getElementById("name_input").value = activeTab.title;
    })
});