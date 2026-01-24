import { Component, OnDestroy } from '@angular/core';
import { Email, EmailService } from '../../email/service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  email: Email = { email: '', assunto: '', mensagem: '' };
  message: string = '';
  
  constructor(private emailService: EmailService) { }
  
  send(): void {
    if (!this.validateForm()) {
      this.message = 'Campos inválidos ou não preenchidos!';
      return;
    }
    this.emailService.sendEmail(this.email).subscribe({
      next:() => {
        alert('Email enviado com sucesso!');
        return;
      },
      error: (error) => {
        alert('Erro ao enviar email. Tente novamente.');
        console.error('Erro:', error);
        return;
      }
    });
    this.resetForm();
  }

  private validateForm(): boolean {
    return this.email.email.trim() !== '' && 
            this.isValidEmail(this.email.email) &&
           this.email.assunto.trim() !== '' && 
           this.email.mensagem.trim() !== '';
  }

  private isValidEmail(value: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  private resetForm(): void {
    this.email = { email: '', assunto: '', mensagem: '' };
  }
}