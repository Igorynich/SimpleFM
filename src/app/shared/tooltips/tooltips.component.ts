import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.css']
})
export class TooltipsComponent implements OnInit {

  @Input() text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec faucibus nunc. Sed nunc tellus, semper vel tristique at, congue at lorem. Donec mauris felis, tempus pharetra ultrices eget, posuere eu diam. Aenean consectetur venenatis vulputate. Nullam vulputate neque arcu, ac luctus velit sollicitudin vitae. Aliquam blandit justo diam, a rutrum erat euismod sed. Fusce in suscipit ex, efficitur malesuada elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque at eros a nisl luctus auctor id a est. Praesent vestibulum orci et mattis condimentum. Donec eget mi malesuada, mattis est at, vehicula purus. In mattis, orci in venenatis volutpat, sem lectus varius mauris, non dapibus massa enim a justo. Nulla facilisi.'

  constructor() { }

  ngOnInit(): void {
  }

}
