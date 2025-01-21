import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'labs', component: LabsComponent},
    {path:'**', component: NotfoundComponent},

];
