import { Component, OnDestroy } from '@angular/core';
import { Email, EmailService } from '../email/service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  email: Email = { email: '', assunto: '', mensagem: '' };
  message: string = '';
  
  constructor(private emailService: EmailService) { }
  
  private validateForm(): boolean {
    return this.email.assunto.trim() !== '' && 
          this.email.mensagem.trim() !== '';
  }
  
  send(): void {
    if (!this.validateForm()) {
      this.message = 'Campos inválidos ou não preenchidos!';
      return;
    }
    // launch mail client via mailto link
    this.emailService.sendEmail(this.email);
    alert('Abrindo seu cliente de e‑mail. Complete e envie a mensagem.');
    this.resetForm();
  }

  private isValidEmail(value: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  private resetForm(): void {
    this.email = { email: '', assunto: '', mensagem: '' };
  }

}
