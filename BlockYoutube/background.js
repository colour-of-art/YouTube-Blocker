chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.url.includes("youtube.com")) {
        return {cancel: true};
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
