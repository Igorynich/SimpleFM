import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROUTES} from '../../../constants/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  // authProviders = [AuthProvider.Google, AuthProvider.Twitter];
  userName: FormControl;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  }

  submitName() {
    console.log(this.userName.value);
    if (this.userName.valid) {
      this.userService.userName = this.userName.value;
      this.router.navigate([ROUTES.OFFICE]).catch(reason => {
        console.error('Navigation fail by ', reason);
      });
    }
  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }
}
