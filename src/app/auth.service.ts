import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly allowedUser = 'Client123';
  private readonly allowedPassword = 'password25678';

  readonly isAuthenticated = signal(false);

  login(username: string, password: string): boolean {
    const isValid = username === this.allowedUser && password === this.allowedPassword;
    this.isAuthenticated.set(isValid);
    return isValid;
  }

  logout(): void {
    this.isAuthenticated.set(false);
  }
}

