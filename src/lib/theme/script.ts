import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme/types";

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_THEME)};var t=localStorage.getItem(k);if(t!=="dark"&&t!=="light")t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t||d}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)}}})();`;
