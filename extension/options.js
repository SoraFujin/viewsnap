import { DEFAULTS, buildPath } from "./naming.js";

const $ = (id) => document.getElementById(id);

function preview() {
  $("preview").textContent = buildPath(
    { subfolder: $("subfolder").value, template: $("template").value },
    { host: "example.com", title: "Example Domain" },
  );
}

function fill(values) {
  $("subfolder").value = values.subfolder;
  $("template").value = values.template;
  preview();
}

async function save(values) {
  await chrome.storage.local.set(values);
  fill(values);
  $("status").textContent = " Saved.";
  setTimeout(() => ($("status").textContent = ""), 1500);
}

fill(await chrome.storage.local.get(DEFAULTS));
$("form").addEventListener("input", preview);
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  save({ subfolder: $("subfolder").value.trim(), template: $("template").value });
});
$("reset").addEventListener("click", () => save({ ...DEFAULTS }));
