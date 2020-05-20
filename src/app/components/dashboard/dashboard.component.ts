import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userChoice = 1;
  toAdd = 0;
  doctorMode = false;
  userData;
  details = {
    designation: '',
    aadhar: '',
    age: '',
    weight: ''
  };
  editMode = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public us: UserServiceService,
    public snackbar: MatSnackBar,
  ) {
    this.authService.getUser().then(data => {
      console.log(data);
      this.userData = data;
      this.doctorMode = this.userData.doctorMode;
      this.assignValues(this.userData.uid);
    });


  }

  setAmount(value) {
    this.us.updateUserBalance(this.userData.uid, this.userData.balance + Number(value));
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  assignValues(user_id) {
    this.us.getUserDetails(user_id).subscribe(result => {
      if (result['designation']) {
        this.details.designation = result['designation'];
      }
      if (result['aadhar']) {
        this.details.aadhar = result['aadhar'];
      }
      if (result['age']) {
        this.details.age = result['age'];
      }
      if (result['weight']) {
        this.details.weight = result['weight'];
      }
    });
  }

  updateDetails() {
    this.us.updateUserDetails(this.userData.uid, this.details);
    this.toggleEdit();
    this.snackbar.open('User details updated!', 'Close', {
      duration: 2000,
    });
  }

  viewProfile() {
    this.userChoice = 1;
  }
  viewPatientHistory() {
    this.userChoice = 2;
  }

  findLiveChat() {
    this.userChoice = 3;
  }



  ngOnInit() {
  }

  refreshPage() {
    window.location.reload();
  }

}
