import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTES} from '../../../constants/routes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  cards = new Array(8);
  ROUTES = ROUTES;

  constructor(public userService: UserService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // TODO: hide
  navigateToAdmin() {
    this.router.navigate([this.ROUTES.ADMIN], {relativeTo: this.route}).catch(reason => {
      console.error(reason);
    });
  }

  logOut() {
    this.router.navigate(['../'], {relativeTo: this.route}).then(value => {
      this.userService.logOut();
    }).catch(reason => {
      console.error(reason);
    });
  }
}
