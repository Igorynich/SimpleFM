import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // TODO: hide
  navigateToAdmin() {
    this.router.navigate(['admin'], {relativeTo: this.route}).catch(reason => {
      console.error(reason);
    });
  }
}
