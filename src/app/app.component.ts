import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private sections: NodeListOf<HTMLElement> = null;

  ngOnInit(): void {
    this.sections = document.querySelectorAll('section[id]');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollActive();
    this.scrollUp();
  }

  private scrollActive(): void {
    const scrollY = window.pageYOffset;
    if (!this.sections) return;

    this.sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute('id');
      const selector = `.nav__menu a[href*="${sectionId}"]`;
      const link = document.querySelector(selector);
      if (!link) return;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  private scrollUp(): void {
    const scrollUpEl = document.getElementById('scroll-up');
    if (!scrollUpEl) return;
    if (window.scrollY >= 200) scrollUpEl.classList.add('show-scroll'); else scrollUpEl.classList.remove('show-scroll');
  }
}