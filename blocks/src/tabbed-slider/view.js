class NorthCommerceTabbedSliderBlock {
  constructor(slider) {
    this.slider = slider;

    this.init();
  }

  init() {
    this.initEvents();
    this.openFirstTab();
  }

  initEvents() {
    const tabLinks = this.slider.querySelectorAll(".tab-links li");
    for (const tabLink of tabLinks) {
      tabLink.addEventListener("click", (e) => {
        e.preventDefault();
        const tabId = tabLink.dataset.openTab;

        this.openTab(tabId);
      });
    }
  }

  openTab(tabId) {
    const tabContents = this.slider.querySelectorAll(".tab-content .tab");
    for (const tabContent of tabContents) {
      tabContent.classList.remove("active");
    }

    const tabLinks = this.slider.querySelectorAll(".tab-links li");
    for (const tabLink of tabLinks) {
      tabLink.classList.remove("active");
    }

    const tabContent = this.slider.querySelector(`[data-tab=${tabId}]`);
    tabContent.classList.add("active");

    const tabLink = this.slider.querySelector(`[data-open-tab="${tabId}"]`);
    tabLink.classList.add("active");
  }

  openFirstTab() {
    const firstTab = this.slider.querySelector(".tab-links li:first-child");

    const firstTabId = firstTab.dataset.openTab;
    this.openTab(firstTabId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-tabbed-slider-block]");

  if (sliders.length === 0) return;

  for (const slider of sliders) {
    new NorthCommerceTabbedSliderBlock(slider);
  }
});
