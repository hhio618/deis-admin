import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeisService } from '../../shared/deis.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'dp-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  apps = [];

  constructor(private deisService: DeisService, private router: Router) { }

  ngOnInit() {
    this.deisService.getApps()
      .mergeMap((value: any) => value.results)
      .mergeMap((app: any) => this.deisService.getAppConfig(app.id).map(config => {
        app.config = config;
        return app;
      }))
      .filter(app => !app.config.values.PIPELINE_TRACK || app.config.values.PIPELINE_TRACK === 'production')
      .scan((state, app) => state.concat([app]), [])
      .subscribe(apps => this.apps = apps);
  }

  goto(app) {
    if (app.config.values.PIPELINE) {
      return this.router.navigate(['pipeline', app.id]);
    }

    this.router.navigate(['apps', app.id]);
  }

}
