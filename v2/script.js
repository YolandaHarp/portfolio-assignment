
/* ==========================================
   YAN YIHAN — Personal Portfolio V2 (V0 behaviour retained)
   Vanilla JavaScript
   ========================================== */

(function () {
    "use strict";

    const root = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const yearElement = document.getElementById("current-year");

    const STORAGE_KEY = "yan-yihan-portfolio-theme";

    // Read the visitor's saved preference.
    // Storage may be unavailable in some local browser environments.
    function getSavedTheme() {
        try {
            return window.localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    // Save the selected theme when storage is available.
    function saveTheme(theme) {
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            // Theme switching still works without storage.
        }
    }

    // Detect the operating system's color preference.
    function getSystemTheme() {
        if (
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            return "dark";
        }

        return "light";
    }

    // Apply the theme and update accessible button information.
    function applyTheme(theme) {
        const isDark = theme === "dark";
        const selectedTheme = isDark ? "dark" : "light";

        root.setAttribute("data-theme", selectedTheme);

        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector(".theme-toggle__icon");
        const label = themeToggle.querySelector(".theme-toggle__label");

        themeToggle.setAttribute("aria-pressed", String(isDark));

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        if (icon) {
            icon.textContent = isDark ? "☀" : "☾";
        }

        if (label) {
            label.textContent = isDark ? "Light mode" : "Dark mode";
        }
    }

    // Use a saved preference when valid, or fall back to system settings.
    const savedTheme = getSavedTheme();

    const initialTheme =
        savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : getSystemTheme();

    applyTheme(initialTheme);

    // Theme toggle interaction.
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = root.getAttribute("data-theme");

            const nextTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    // Automatically display the current year.
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }

})();
