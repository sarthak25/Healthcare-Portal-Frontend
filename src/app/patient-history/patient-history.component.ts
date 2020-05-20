import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  @Input()
  user_id: string;

  constructor() {
    console.log(this.user_id);
    console.log(213123123);

  }

  ngOnInit() {
  }

}
