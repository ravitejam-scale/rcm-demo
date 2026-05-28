import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <button class="logout" *ngIf="auth.isAuthenticated()" (click)="logout()">Logout</button>
    <router-outlet />
  `,
  styles: [
    '.logout{position:fixed;top:6px;right:320px;z-index:9999;border:1px solid #d1d5db;background:#f3f4f6;color:#111827;padding:10px 14px;border-radius:10px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px #00000026}'
  ]
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
