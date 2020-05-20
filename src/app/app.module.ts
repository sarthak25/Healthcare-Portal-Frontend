import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Reactive Form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatRippleModule, MatSelectModule, MatRadioModule, MatIconModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import { MatChipsModule } from '@angular/material';
// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LivechatComponent } from './livechat/livechat.component';
import { UserServiceService } from './user-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FaceAuthenComponent } from './face-authen/face-authen.component';
import {WebcamModule} from 'ngx-webcam';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    UserInfoComponent,
    ChatComponent,
    ChatInfoComponent,
    LivechatComponent,
    NavbarComponent,
    FaceAuthenComponent,
    PatientHistoryComponent,
    ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule,
    WebcamModule,
    MatTooltipModule,
    NgbModule,
  ],
  providers: [AuthService, AuthGuard, UserServiceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
