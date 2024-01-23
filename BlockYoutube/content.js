chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toggleBlocking !== undefined) {
            // Update the UI or perform other actions in the content script based on the blocking state
            console.log('Blocking state in content script: ' + request.toggleBlocking);
            // You can add your UI update logic here
        }
    }
);
