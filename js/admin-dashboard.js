document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".panel-tab"));
  const sections = Array.from(document.querySelectorAll(".panel-section"));
  if (!tabs.length || !sections.length) {
    return;
  }

  const activatePanel = (panelId) => {
    if (!panelId) {
      return;
    }

    tabs.forEach((tab) => {
      const isActive = tab.dataset.panel === panelId;
      tab.classList.toggle("panel-tab--active", isActive);
      if (isActive) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    sections.forEach((section) => {
      const isActive = section.id === panelId;
      section.classList.toggle("panel-section--active", isActive);
      if (isActive) {
        section.removeAttribute("hidden");
      } else {
        section.setAttribute("hidden", "");
      }
    });
  };

  const initialHash = window.location.hash.replace("#", "");
  const defaultPanel = initialHash || (document.querySelector(".panel-tab.panel-tab--active")?.dataset.panel ?? sections[0]?.id);
  activatePanel(defaultPanel);

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const { panel } = tab.dataset;
      if (!panel) {
        return;
      }

      activatePanel(panel);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `#${panel}`);
      } else {
        window.location.hash = panel;
      }
    });
  });
});
