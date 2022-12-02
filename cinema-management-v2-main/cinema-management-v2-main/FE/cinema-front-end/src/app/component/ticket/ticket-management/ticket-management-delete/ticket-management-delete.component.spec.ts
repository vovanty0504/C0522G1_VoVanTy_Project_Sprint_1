import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagementDeleteComponent } from './ticket-management-delete.component';

describe('TicketManagementDeleteComponent', () => {
  let component: TicketManagementDeleteComponent;
  let fixture: ComponentFixture<TicketManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
