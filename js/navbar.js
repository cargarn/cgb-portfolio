class NavbarController {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.navbarToggle = document.querySelector(".navbar-toggle");
    this.navbarNav = document.querySelector(".navbar-nav");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleResize();
  }

  setupEventListeners() {
    if (this.navbarToggle) {
      this.navbarToggle.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (!this.navbar.contains(e.target) && this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      this.handleResize();
    });

    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  toggleMobileMenu() {
    const isOpen = this.isMobileMenuOpen();

    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.navbarNav.classList.add("navbar-nav--open");
    this.navbarToggle.classList.add("navbar-toggle--open");
    this.navbarToggle.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
  }

  closeMobileMenu() {
    this.navbarNav.classList.remove("navbar-nav--open");
    this.navbarToggle.classList.remove("navbar-toggle--open");
    this.navbarToggle.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }

  isMobileMenuOpen() {
    return this.navbarNav.classList.contains("navbar-nav--open");
  }

  handleResize() {
    if (window.innerWidth >= 768 && this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add("navbar--scrolled");
    } else {
      this.navbar.classList.remove("navbar--scrolled");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.navbarController = new NavbarController();
});
