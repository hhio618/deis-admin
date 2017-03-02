import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dp-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {

  @Input() lane;

  constructor() {

  }

  ngOnInit() {
  }

}
