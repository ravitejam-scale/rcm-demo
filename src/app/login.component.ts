import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="login-wrap">
      <section class="login-card">
        <h1>Login</h1>
        <p>Use your client credentials to continue.</p>

        <form (ngSubmit)="submit()">
          <label for="username">Username</label>
          <input id="username" name="username" [(ngModel)]="username" required autocomplete="username" />

          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            [(ngModel)]="password"
            required
            autocomplete="current-password"
          />

          <button type="submit">Login</button>
          <div class="error" *ngIf="error">{{ error }}</div>
        </form>
      </section>
    </main>
  `,
  styles: [
    ':host{display:block;min-height:100vh;background:#0f172a;font-family:Arial,sans-serif}',
    '.login-wrap{min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}',
    '.login-card{width:min(420px,100%);background:#fff;border-radius:14px;padding:26px;box-shadow:0 18px 40px #0000003d}',
    'h1{margin:0 0 8px;font-size:30px;color:#111827}',
    'p{margin:0 0 18px;color:#4b5563}',
    'form{display:flex;flex-direction:column;gap:8px}',
    'label{font-weight:700;font-size:14px;color:#111827}',
    'input{border:1px solid #d1d5db;border-radius:8px;padding:10px 12px;font-size:14px;margin-bottom:8px}',
    'button{margin-top:8px;border:0;border-radius:8px;background:#2563eb;color:white;padding:12px;font-weight:700;cursor:pointer}',
    '.error{margin-top:10px;color:#dc2626;font-size:14px}'
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  submit(): void {
    if (!this.auth.login(this.username, this.password)) {
      this.error = 'Invalid username or password.';
      return;
    }

    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/demo';
    this.error = '';
    this.router.navigateByUrl(redirectTo);
  }
}

