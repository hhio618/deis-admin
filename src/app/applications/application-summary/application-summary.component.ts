import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dp-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.scss']
})
export class ApplicationSummaryComponent implements OnInit {

  @Input() app;

  constructor() { }

  ngOnInit() {
  }

}
