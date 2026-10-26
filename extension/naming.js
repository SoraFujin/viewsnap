export const DEFAULTS = {
  subfolder: "Screenshots",
  template: "screenshot - %host - %Y-%m-%d %H_%M_%S",
};

const pad = (n) => String(n).padStart(2, "0");

// Removes characters not allowed in filenames and trims trailing dots/spaces.
export function sanitize(text) {
  return String(text)
    // eslint-disable-next-line no-control-regex
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+|[. ]+$/g, "");
}

export function buildFilename(template, { host = "", title = "", date = new Date() } = {}) {
  const values = {
    "%host": host,
    "%title": title,
    "%Y": String(date.getFullYear()),
    "%m": pad(date.getMonth() + 1),
    "%d": pad(date.getDate()),
    "%H": pad(date.getHours()),
    "%M": pad(date.getMinutes()),
    "%S": pad(date.getSeconds()),
  };
  const filled = String(template).replace(/%host|%title|%[YmdHMS]/g, (p) => values[p]);
  return (sanitize(filled) || "screenshot") + ".png";
}

// Keeps the subfolder relative to Downloads: no absolute paths, no "..".
export function sanitizeSubfolder(subfolder) {
  return String(subfolder)
    .split(/[\\/]+/)
    .map(sanitize)
    .filter((part) => part && part !== "..")
    .join("/");
}

export function buildPath(settings, page) {
  const folder = sanitizeSubfolder(settings.subfolder);
  const name = buildFilename(settings.template, page);
  return folder ? `${folder}/${name}` : name;
}
