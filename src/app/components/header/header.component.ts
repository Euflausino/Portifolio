import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  darkTheme = false;
  themeIcon = 'ri-moon-line';

  ngOnInit(): void {
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    this.darkTheme = selectedTheme === 'dark';
    document.body.classList.toggle('dark-theme', this.darkTheme);
    this.themeIcon = selectedIcon || (this.darkTheme ? 'ri-sun-line' : 'ri-moon-line');
  }

  toggleMenu() { this.showMenu = !this.showMenu; }
  closeMenu() { this.showMenu = false; }

  onNavLinkClick(event?: Event) {
    this.closeMenu();
    // allow default anchor behavior (smooth scroll via CSS)
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    document.body.classList.toggle('dark-theme', this.darkTheme);
    this.themeIcon = this.darkTheme ? 'ri-sun-line' : 'ri-moon-line';
    localStorage.setItem('selected-theme', this.darkTheme ? 'dark' : 'light');
    localStorage.setItem('selected-icon', this.themeIcon);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
  }
}
