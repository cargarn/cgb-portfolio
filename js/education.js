class EducationManager {
  constructor() {
    this.availableLocales = AppConfig.availableLocales;
    this.defaultLanguage = AppConfig.defaultLanguage;
    this.currentLang = AppConfig.getCurrentLanguage();
    this.education = {};
    this.init();
  }

  setupLanguageListener() {
    document.addEventListener("languageChanged", (event) => {
      if (event.detail.language === this.currentLang) return;

      this.currentLang = event.detail.language;
      this.loadEducationData(this.currentLang).then(() => {
        this.updateEducation();
      });
    });
  }

  init() {
    this.setupLanguageListener();
    this.loadEducationData(this.currentLang).then(() => {
      this.updateEducation();
    });
  }

  async loadEducationData(currentLang) {
    if (!this.education[currentLang]) {
      this.education[currentLang] = await AppConfig.loadJsonData(
        `./resources/education/${currentLang}.json`
      );
    }
  }

  updateEducation() {
    const timeline = document.getElementById("education-list");
    if (!timeline || !this.education?.[this.currentLang]?.length) return;

    timeline.innerHTML = "";

    this.education[this.currentLang].forEach((item) => {
      const educationItem = document.createElement("div");
      educationItem.className = "education-content";

      const educationTitle = document.createElement("h3");
      educationTitle.innerText = item.degree;

      const educationInstitution = document.createElement("h4");
      educationInstitution.innerText = item.institution;

      const educationPeriod = document.createElement("p");
      educationPeriod.className = "period";
      educationPeriod.innerText = `${item.dateStart} - ${item.dateEnd}`;

      const educationDescription = document.createElement("p");
      educationDescription.innerText = item.description;

      educationItem.appendChild(educationTitle);
      educationItem.appendChild(educationInstitution);
      educationItem.appendChild(educationPeriod);
      educationItem.appendChild(educationDescription);
      timeline.appendChild(educationItem);
    });
  }
}

document.addEventListener("ConfigLoaded", () => {
  new EducationManager();
});
