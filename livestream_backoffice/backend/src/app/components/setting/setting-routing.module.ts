import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { InformationComponent } from './information/information.component';


const routes: Routes = [
  {
    path: 'information',
    component: InformationComponent,
    data: {
      title: "information",
    }
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate: [AuthGuard], 
    data: {
      title: "register",
      // roles: ['admin']
    }
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
