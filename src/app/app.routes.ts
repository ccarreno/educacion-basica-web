import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SumarComponent } from './components/sumar/sumar.component';
import { RestarComponent } from './components/restar/restar.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sumas', component: SumarComponent },
  { path: 'sumas/:id', component: SumarComponent },
  { path: 'restas', component: RestarComponent },
  { path: 'restas/:id', component: RestarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
