class AppConfig {
  static availableLocales = ["en", "es"];
  static defaultLanguage = "en";
  static currentLang = this.getCurrentLanguage();

  static getCurrentLanguage() {
    let language = (
      localStorage.getItem("language") ||
      window.navigator.userLanguage ||
      window.navigator.language
    ).substring(0, 2);

    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get("lang");
    if (langFromUrl && this.availableLocales.includes(langFromUrl)) {
      language = langFromUrl;
    }

    return this.availableLocales.includes(language)
      ? language
      : this.defaultLanguage;
  }

  static setupLanguageSelector() {
    const langSelector = document.querySelector(".language-selector");
    if (!langSelector) return;

    this.updateActiveLanguageButton();
    langSelector.addEventListener("click", (e) => {
      const langBtn = e.target.closest(".lang-btn");
      if (langBtn) {
        const lang = langBtn.dataset.lang;
        AppConfig.dispatchLanguageChange(lang);
      }
    });
  }

  static updateActiveLanguageButton() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === this.currentLang);
    });
  }

  static async loadJsonData(path) {
    try {
      const response = await fetch(path);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error loading data from ${path}:`, error);
      return null;
    }
  }

  static updateHtmlLang() {
    document.documentElement.setAttribute("lang", this.currentLang);
  }

  static async switchLanguage(lang) {
    if (lang === this.currentLang) return;

    this.currentLang = lang;
    localStorage.setItem("language", lang);
    this.updateActiveLanguageButton();
    this.updateHtmlLang();
  }

  static dispatchLanguageChange(lang) {
    this.switchLanguage(lang);
    const event = new CustomEvent("languageChanged", {
      detail: { language: lang },
    });
    document.dispatchEvent(event);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  AppConfig.setupLanguageSelector();
  const event = new CustomEvent("ConfigLoaded", {});
  document.dispatchEvent(event);
});
