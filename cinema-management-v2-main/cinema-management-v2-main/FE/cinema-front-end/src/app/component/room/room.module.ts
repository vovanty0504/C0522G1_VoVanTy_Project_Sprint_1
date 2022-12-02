import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { ListRoomComponent } from './list-room/list-room.component';
import { DetailRoomComponent } from './detail-room/detail-room.component';


@NgModule({
  declarations: [ListRoomComponent, DetailRoomComponent],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
