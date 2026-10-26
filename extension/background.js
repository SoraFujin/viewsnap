import { DEFAULTS, buildPath } from "./naming.js";

chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command !== "capture-viewport") return;
  try {
    tab ??= (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
    const settings = await chrome.storage.local.get(DEFAULTS);
    const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });
    let host = "";
    try {
      host = new URL(tab.url).hostname;
    } catch {
      // non-URL pages leave the host empty
    }
    const filename = buildPath(settings, { host, title: tab.title ?? "" });
    await chrome.downloads.download({ url: dataUrl, filename, saveAs: false, conflictAction: "uniquify" });
  } catch (err) {
    console.error("viewsnap: capture failed", err);
    chrome.action?.setBadgeText?.({ text: "!" });
  }
});
