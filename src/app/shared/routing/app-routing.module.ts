import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';

// Import canActivate guard services
// import { SecureInnerPagesGuard } from '../../shared/guard/secure-inner-pages.guard';
import { ChatComponent } from 'src/app/chat/chat.component';
import { AuthGuard } from '../guard/auth.guard';
import { LivechatComponent } from 'src/app/livechat/livechat.component';
import { FaceAuthenComponent } from 'src/app/face-authen/face-authen.component';
import { PatientHistoryComponent } from 'src/app/patient-history/patient-history.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'livechat', component: LivechatComponent, canActivate: [AuthGuard] },
  { path: 'facelogin', component: FaceAuthenComponent },
  { path: 'patient-history', component: PatientHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
