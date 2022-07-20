import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // loas children pour le lazy loading
  {path: "social-media", loadChildren:() => import ('./social-media/social-media.module').then(m =>m.SocialMediaModule)},
  // Toutes les routes inconnues redirige vers social média pour l'instant
  {path: '**', redirectTo:'social-media'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
