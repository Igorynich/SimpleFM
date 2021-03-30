import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTES} from '../../constants/routes';

@Component({
  selector: 'app-navigate-to-office',
  templateUrl: './navigate-to-office.component.html',
  styleUrls: ['./navigate-to-office.component.css']
})
export class NavigateToOfficeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToOffice() {
    this.router.navigate([ROUTES.OFFICE]).then(value => {

    }).catch(reason => {
      console.error(reason);
    });
  }

  isDisabled() {
    return this.router.url === `/${ROUTES.OFFICE}`;
  }
}
