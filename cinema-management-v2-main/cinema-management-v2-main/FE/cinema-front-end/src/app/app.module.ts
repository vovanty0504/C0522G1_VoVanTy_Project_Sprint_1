import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DecentralizationModule} from './component/decentralization/decentralization.module';
import {EmployeeModule} from './component/employee/employee.module';
import {HomeModule} from './component/home/home.module';
import {MovieModule} from './component/movie/movie.module';
import {PromotionModule} from './component/promotion/promotion.module';
import {RegisterModule} from './component/register/register.module';
import {RoomModule} from './component/room/room.module';
import {TicketModule} from './component/ticket/ticket.module';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {StatementManagementModule} from './component/statement-management/statement-management.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';


const googleLoginOptions = {
  scope: 'profile email',
  plugin_name: 'login'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DecentralizationModule,
    EmployeeModule,
    HomeModule,
    MovieModule,
    PromotionModule,
    RegisterModule,
    RoomModule,
    TicketModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    SocialLoginModule,
    StatementManagementModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '612774287153-uthnsrl25on17doe8413il68ebv9c969.apps.googleusercontent.com',
              googleLoginOptions
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
