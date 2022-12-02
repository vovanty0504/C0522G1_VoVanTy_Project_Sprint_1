import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RoomService} from '../../../service/room.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  rooms: any;
  searchForm: FormGroup;
  name: string = '';
  idRoom;

  constructor(private roomService: RoomService, private activite: ActivatedRoute) {
    this.activite.paramMap.subscribe((paramMap: ParamMap) => {
      this.idRoom = paramMap.get('id');
    });
    this.searchForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomService.getAllRooms(this.name).subscribe(value => {
      this.rooms = value;
    });
  }

  searchRoom(name: string) {
    this.roomService.getAllRooms(name).subscribe(value => {
      this.rooms = value;
    });
  }

}
