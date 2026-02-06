import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class App {
  protected readonly title = signal('projetoportifo');
}
