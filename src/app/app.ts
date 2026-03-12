import { Component, signal, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header";
import { HomeComponent } from "./home/home";
import { About } from "./about/about";
import { Contact } from "./contact/contact";
import { Project } from "./project/project";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, About, Contact, Project, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('projetoportifo');
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('aos').then(({ default: AOS }) => {
        // if styles imported globally we don't need the css import here
        AOS.init({
          duration: 900,
          once: true,
        });

        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            AOS.refresh();
          }
        });
      });
    }
  }
}
