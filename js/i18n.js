class LanguageManager {
  constructor() {
    this.availableLocales = AppConfig.availableLocales;
    this.defaultLanguage = AppConfig.defaultLanguage;
    this.currentLang = AppConfig.getCurrentLanguage();
    this.translations = {};
    this.init();
  }

  async init() {
    this.setupLanguageListener();
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateMetaTags();
  }

  setupLanguageListener() {
    document.addEventListener("languageChanged", (event) => {
      if (event.detail.language === this.currentLang) return;

      this.currentLang = event.detail.language;
      this.loadTranslations(this.currentLang).then(() => {
        this.applyTranslations();
        this.updateMetaTags();
      });
    });
  }

  async loadTranslations(currentLang) {
    if (!this.translations[currentLang]) {
      this.translations[currentLang] = await AppConfig.loadJsonData(
        `./resources/lang/${currentLang}.json`
      );
    }
  }

  applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");

    const json = this.translations[this.currentLang];

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      let text = key.split(".").reduce((obj, i) => (obj ? obj[i] : null), json);

      const variables = text ? text.match(/{(.*?)}/g) : null;
      if (variables) {
        variables.forEach((variable) => {
          Object.entries(element.dataset).filter(([key, value]) => {
            if (`{${key}}` === variable) {
              try {
                text = text.replace(
                  `${variable}`,
                  new Function(`return (${value})`)()
                );
              } catch (error) {
                text = text.replace(`${variable}`, value);
              }
            }
          });
        });
      }

      element.innerHTML = text || "";
    });
  }

  updateMetaTags() {
    const t = this.translations[this.currentLang];
    if (!t) return;

    // Update title
    document.title = t.meta.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t.meta.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", t.meta.keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const ogLocale = document.querySelector('meta[property="og:locale"]');

    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);
    if (ogDescription)
      ogDescription.setAttribute("content", t.meta.description);
    if (ogLocale)
      ogLocale.setAttribute(
        "content",
        this.currentLang === "es" ? "es_ES" : "en_US"
      );

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );

    if (twitterTitle) twitterTitle.setAttribute("content", t.meta.title);
    if (twitterDescription)
      twitterDescription.setAttribute("content", t.meta.description);

    // Update Schema.org data
    const schemaScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (schemaScript) {
      const schemaData = JSON.parse(schemaScript.textContent);
      schemaData.jobTitle = t.header.title;
      schemaData.description = t.meta.description;
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    }
  }
}

document.addEventListener("ConfigLoaded", () => {
  new LanguageManager();
});
