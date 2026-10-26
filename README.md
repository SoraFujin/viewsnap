# viewsnap

A Manifest V3 extension for Chromium and Vivaldi. One keyboard shortcut saves the visible viewport of the active tab as a PNG into a subfolder of Downloads, with no Save As dialog. It needs only the `activeTab`, `downloads` and `storage` permissions, makes no network requests and keeps all settings local (`chrome.storage.local`).

## Install (unpacked)
1. Open `chrome://extensions` (Vivaldi: `vivaldi://extensions`) and enable Developer mode.
2. Click "Load unpacked" and select the `extension/` folder of this repo.

## Shortcut
Default: `Alt+Shift+S`. To change it, open `chrome://extensions/shortcuts` (Vivaldi: `vivaldi://extensions` → Keyboard Shortcuts, or Settings → Keyboard) and set the shortcut for "Save the visible viewport as PNG". Browser-reserved keys may not be usable.

## Options
Open the extension's Options page to set:
- **Subfolder** inside Downloads (default `Screenshots`).
- **Filename template** (default `screenshot - %host - %Y-%m-%d %H_%M_%S`). Placeholders: `%host`, `%title`, `%Y`, `%m`, `%d`, `%H`, `%M`, `%S`. Characters not allowed in filenames are removed.

## Development
```
npm install
npm test          # unit tests
npm run lint      # eslint
npm run package   # lint, then zip to dist/viewsnap-<version>.zip
```
Note: the shortcut does not work on pages the browser blocks from capture (e.g. `chrome://` pages, the Web Store).

## License
MIT
