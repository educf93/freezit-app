import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';

const routes: Routes = [
    {
      path:'',
      component: BoardComponent
    },
    {
      path:'login',
      component: LoginViewComponent
    },
    {
      path:'register',
      component: RegisterViewComponent 
    },
    {
      path:'board',
      component: BoardComponent
    },
    {
      path:'**',
      pathMatch:'full',
      redirectTo:'login'

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
