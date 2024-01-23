// background.js

let isBlocking = false;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (isBlocking && details.url.includes("youtube.com")) {
            return {cancel: true};
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({isBlocking: false}, function() {
        console.log('Extension initialized with blocking set to false');
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toggleBlocking !== undefined) {
            isBlocking = request.toggleBlocking;
            chrome.storage.sync.set({isBlocking: isBlocking}, function() {
                console.log('Blocking state set to ' + isBlocking);
            });
        }
    }
);

// Add a browser action
chrome.browserAction.onClicked.addListener(function(tab) {
    isBlocking = !isBlocking;
    chrome.storage.sync.set({isBlocking: isBlocking}, function() {
        console.log('Blocking state toggled to ' + isBlocking);
        // Send a message to the content script (if needed) to update UI
        chrome.tabs.sendMessage(tab.id, {toggleBlocking: isBlocking});
    });
});
