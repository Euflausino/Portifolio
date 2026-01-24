import { Component, OnInit, OnDestroy } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';

@Component({
  selector: 'app-root',
  imports: [About, Contact, Footer, Header, Home, Projects],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private navMenu: HTMLElement | null = null;
  private navToggle: HTMLElement | null = null;
  private navClose: HTMLElement | null = null;
  private header: HTMLElement | null = null;
  private themeButton: HTMLElement | null = null;
  private scrollUpBtn: HTMLElement | null = null;

  private readonly darkTheme = 'dark-theme';
  private readonly iconTheme = 'ri-sun-line';

  private scrollHeaderListener!: () => void;
  private scrollActiveListener!: () => void;
  private scrollUpListener!: () => void;
  private themeClickListener!: () => void;

  ngOnInit(): void {
    this.initializeElements();
    this.setupMenuListeners();
    this.setupTheme();
    this.setupScrollListeners();
    this.setupScrollReveal();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  private initializeElements(): void {
    this.navMenu = document.getElementById('nav-menu');
    this.navToggle = document.getElementById('nav-toggle');
    this.navClose = document.getElementById('nav-close');
    this.header = document.getElementById('header');
    this.themeButton = document.getElementById('theme-button');
    this.scrollUpBtn = document.getElementById('scroll-up');
  }

  private setupMenuListeners(): void {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu?.classList.add('show-menu');
      });
    }

    if (this.navClose && this.navMenu) {
      this.navClose.addEventListener('click', () => {
        this.navMenu?.classList.remove('show-menu');
      });
    }

    const navLinks = document.querySelectorAll('.nav__link') as NodeListOf<HTMLElement>;
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu?.classList.remove('show-menu');
      });
    });
  }

  private setupScrollListeners(): void {
    this.scrollHeaderListener = () => this.scrollHeader();
    this.scrollActiveListener = () => this.scrollActive();
    this.scrollUpListener = () => this.scrollUp();

    window.addEventListener('scroll', this.scrollHeaderListener);
    window.addEventListener('scroll', this.scrollActiveListener);
    window.addEventListener('scroll', this.scrollUpListener);
  }

  private scrollHeader(): void {
    if (this.header) {
      if (window.scrollY >= 80) {
        this.header.classList.add('scroll-header');
      } else {
        this.header.classList.remove('scroll-header');
      }
    }
  }

  private scrollActive(): void {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute('id');

      if (sectionId) {
        const selector = `.nav__menu a[href*="${sectionId}"]`;
        const link = document.querySelector(selector) as HTMLElement | null;

        if (link) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link');
          } else {
            link.classList.remove('active-link');
          }
        }
      }
    });
  }

  private scrollUp(): void {
    if (this.scrollUpBtn) {
      if (window.scrollY >= 200) {
        this.scrollUpBtn.classList.add('show-scroll');
      } else {
        this.scrollUpBtn.classList.remove('show-scroll');
      }
    }
  }

  private setupTheme(): void {
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    if (selectedTheme) {
      if (selectedTheme === 'dark') {
        document.body.classList.add(this.darkTheme);
      } else {
        document.body.classList.remove(this.darkTheme);
      }
    }

    if (this.themeButton && selectedIcon) {
      if (selectedIcon === 'ri-moon-line') {
        this.themeButton.classList.add(this.iconTheme);
      } else {
        this.themeButton.classList.remove(this.iconTheme);
      }
    }

    if (this.themeButton) {
      this.themeClickListener = () => this.toggleTheme();
      this.themeButton.addEventListener('click', this.themeClickListener);
    }
  }

  private toggleTheme(): void {
    document.body.classList.toggle(this.darkTheme);
    this.themeButton?.classList.toggle(this.iconTheme);
    localStorage.setItem('selected-theme', this.getCurrentTheme());
    localStorage.setItem('selected-icon', this.getCurrentIcon());
  }

  private getCurrentTheme(): 'dark' | 'light' {
    return document.body.classList.contains(this.darkTheme) ? 'dark' : 'light';
  }

  private getCurrentIcon(): string {
    return this.themeButton?.classList.contains(this.iconTheme) ? 'ri-moon-line' : 'ri-sun-line';
  }

  private setupScrollReveal(): void {
    if (typeof (window as any).ScrollReveal !== 'undefined') {
      const sr = (window as any).ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 700,
        delay: 100,
        reset: true
      });

      sr.reveal('.home__data');
      sr.reveal('.home__img', { delay: 200 });
      sr.reveal('.home__social', { delay: 200 });
      sr.reveal('.about__img, .contact__box', { origin: 'left' });
      sr.reveal('.about__data, .contact__form', { origin: 'right' });
      sr.reveal('.product__card, .questions__group, .footer');
    }
  }

  private removeEventListeners(): void {
    window.removeEventListener('scroll', this.scrollHeaderListener);
    window.removeEventListener('scroll', this.scrollActiveListener);
    window.removeEventListener('scroll', this.scrollUpListener);
    if (this.themeButton) {
      this.themeButton.removeEventListener('click', this.themeClickListener);
    }
  }
}
