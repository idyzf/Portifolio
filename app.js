// ========== DARK MODE TOGGLE ==========
let darkmode= localStorage.getItem("dark-mode");
const themeToggle = document.getElementById("theme-toggle");

const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "active");
}

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "inactive");
}

if (darkmode === "active") {
    enableDarkMode();
} else {
    disableDarkMode();
}


themeToggle.addEventListener("click", () => {
    darkmode = localStorage.getItem("dark-mode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();

}
)


// ========== MOBILE MENU LOGIC ==========

function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuButton = document.getElementById("menu-toggle");

    mobileMenu.classList.toggle("hidden");

    menuButton.innerHTML = "";
    const icon = document.createElement("i");
    icon.setAttribute(
        "data-lucide",
        mobileMenu.classList.contains("hidden") ? "menu" : "x"
    );
    icon.style.width = "24px";
    icon.style.height = "24px";
    menuButton.appendChild(icon);

    if (window.createIcons) createIcons();
}

document.getElementById("menu-toggle").addEventListener("click", toggleMenu);


// ========== YEAR AUTO-UPDATE ==========

document.getElementById("current-year").textContent = new Date().getFullYear();
