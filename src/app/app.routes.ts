import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LegacyDemoComponent } from './legacy-demo.component';
import { LoginComponent } from './login.component';
import { SlidePageComponent } from './slide-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'demo' },
  { path: 'demo', component: LegacyDemoComponent, canActivate: [authGuard] },
  { path: 'how-it-works/:module', component: SlidePageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
