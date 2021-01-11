import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROUTES} from '../../../constants/routes';
import {FirebaseService} from '../../../services/firebase.service';
import {User} from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  // authProviders = [AuthProvider.Google, AuthProvider.Twitter];
  // googleForm: FormGroup;
  isGoogleLogin = false;
  userName: FormControl;

  constructor(private router: Router, private userService: UserService, private fs: FirebaseService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    /*this.googleForm = this.fb.group({
      email: ['', Validators.email],
      password: ['']
    });*/
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

  login() {
    if (1) {
      this.fs.login().subscribe(value => {
        console.log('GOOGLE LOGIN', value);
        const token = value.credential.accessToken;
        const user: User = value.user;
        this.userService.userName = user.displayName;
        this.router.navigate([ROUTES.OFFICE]).catch(reason => {
          console.error('Navigation fail by ', reason);
        });
      }, error => {
        console.error('GOOGLE LOGIN ERROR', error);
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
