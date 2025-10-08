import { Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog';
import { HomePage } from './pages/home/home';
import { HowItWorksPage } from './pages/how-it-works/how-it-works';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'catalog', component: CatalogPage },
    { path: 'how-it-works', component: HowItWorksPage },
    { path: 'contact', component: ContactPage },
    { path: '**', redirectTo: '' } // catch-all fallback
];
