btnBionic.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: enableBionicReader,
  });
});


function enableBionicReader() {
  const pNodes = document.getElementsByTagName("p");
  for (var pNode of pNodes) {
    let text = pNode.innerHTML;
    const textArray = text.split(/ (?=[^>]*(?:<|$))/);
    var test = "";
    for (let str of textArray) {
      if (str.length > 0 && str.match(/^[A-Z]/i)) {
        var mod = Math.ceil(str.length / 2);
        test += str.replace(str.substring(0, mod), "<strong>" + str.substring(0, mod) + "</strong>") + " ";
      } else {
        test += str + " ";
      }
    }

    pNode.innerHTML = test;
  }
}


function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}