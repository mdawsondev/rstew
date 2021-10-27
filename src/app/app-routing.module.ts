import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OauthComponent } from './oauth/oauth.component';
import { SandboxComponent } from './sandbox/sandbox.component';

const routes: Routes = [
  { path: '', redirectTo: '/sandbox', pathMatch: 'full' },
  { path: 'oauth', component: OauthComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: '**', redirectTo: '/sandbox' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
