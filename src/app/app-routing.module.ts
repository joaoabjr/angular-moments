import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { HomeComponent } from './pages/home/home.component';
import { NewMomentComponent } from './pages/new-moment/new-moment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'moments/new', component: NewMomentComponent},
  {path: 'equipe', component: EquipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
