import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { FullPageComponent } from './views/full.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  <Route>{
    path: '', component: FullPageComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
      <Route>{ path: 'register', component: RegisterComponent },
      <Route>{ path: 'main', loadChildren: () => import('./views/main/main.module').then(m => m.MainViewModule) },
      <Route>{ path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule), ...canActivate(redirectUnauthorizedToLanding) },
      <Route>{ path: 'store', loadChildren: () => import('./views/store/store.module').then(m => m.StoreModule)},
      <Route>{ path: '', loadChildren: () => import('./views/public/public.module').then(m => m.PublicModule) }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
