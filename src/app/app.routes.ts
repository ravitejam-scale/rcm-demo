import { Routes } from '@angular/router';
import { LegacyDemoComponent } from './legacy-demo.component';
import { SlidePageComponent } from './slide-page.component';

export const routes: Routes = [
  { path: '', component: LegacyDemoComponent },
  { path: 'demo', component: LegacyDemoComponent },
  { path: 'how-it-works/:module', component: SlidePageComponent },
  { path: '**', redirectTo: '' }
];
