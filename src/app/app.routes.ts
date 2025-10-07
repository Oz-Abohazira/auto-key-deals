import { Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog';
import { HomePage } from './pages/home/home';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'catalog', component: CatalogPage },
    { path: '**', redirectTo: '' } // catch-all fallback
];
