import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MoviePlayComponent} from './movie-play/movie-play.component';
import {FormsModule} from '@angular/forms';
import {MoviePremiereComponent} from './movie-premiere/movie-premiere.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    MoviePlayComponent,
    MoviePremiereComponent
  ],
    exports: [
        HomeComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule
    ]
})
export class HomeModule { }
