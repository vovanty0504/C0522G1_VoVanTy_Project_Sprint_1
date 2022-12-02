import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailRoomComponent} from './detail-room/detail-room.component';
import {ListRoomComponent} from './list-room/list-room.component';

const routes: Routes = [
  {path: "listRoom", component: ListRoomComponent},
  {path:"listDetailRoom/:id",component:DetailRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
