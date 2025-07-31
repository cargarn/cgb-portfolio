class WorkingExperienceManager {
  constructor() {
    this.availableLocales = AppConfig.availableLocales;
    this.defaultLanguage = AppConfig.defaultLanguage;
    this.currentLang = AppConfig.getCurrentLanguage();
    this.workingExperience = {};
    this.init();
  }

  setupLanguageListener() {
    document.addEventListener("languageChanged", (event) => {
      if (event.detail.language === this.currentLang) return;

      this.currentLang = event.detail.language;
      this.loadExperienceData(this.currentLang).then(() => {
        this.updateTimeline();
      });
    });
  }

  init() {
    this.setupLanguageListener();
    this.loadExperienceData(this.currentLang).then(() => {
      this.updateTimeline();
    });
  }

  async loadExperienceData(currentLang) {
    if (!this.workingExperience[currentLang]) {
      this.workingExperience[currentLang] = await AppConfig.loadJsonData(
        `./resources/workingExperience/${currentLang}.json`
      );
    }
  }

  updateTimeline() {
    const timeline = document.getElementById("experience-timeline");
    if (!timeline || !this.workingExperience?.[this.currentLang]?.length)
      return;

    timeline.innerHTML = "";

    this.workingExperience[this.currentLang].forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";

      const timelineDate = document.createElement("div");
      timelineDate.className = "timeline-date";
      timelineDate.innerHTML = `<span class="year">${item.dateStart} - ${item.dateEnd}</span>`;

      const timelineContent = document.createElement("div");
      timelineContent.className = "timeline-content";
      timelineContent.innerHTML = `
        <h3>${item.title}</h3>
        <h4>${item.company}</h4>
        <p>${item.description}</p>
        <div class="technologies">
          ${item.technologies
            .map((tech) => `<span class="tech-tag">${tech}</span>`)
            .join("")}
      `;

      timelineItem.appendChild(timelineDate);
      timelineItem.appendChild(timelineContent);
      timeline.appendChild(timelineItem);
    });
  }
}

document.addEventListener("ConfigLoaded", () => {
  new WorkingExperienceManager();
});
