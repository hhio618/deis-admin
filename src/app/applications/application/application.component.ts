import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dp-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  @Input() lane;
  @Input() app;

  constructor() { }

  ngOnInit() {
  }

}
