import { Routes } from '@angular/router';

// Import components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SheltersComponent } from './shelters/shelters.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path : '', title : 'PARA | Home', component : HomeComponent },
    { path : 'about', title : 'PARA | About', component : AboutComponent },
    { path : 'shelters', title : 'PARA | Shelters', component : SheltersComponent },
    { path : 'contact', title : 'PARA | Contact', component : ContactComponent }
];
