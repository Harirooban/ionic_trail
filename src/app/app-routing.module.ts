import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
	{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule	{ }
																		