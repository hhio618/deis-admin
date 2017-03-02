import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeisService } from '../../shared/deis.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dp-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})
export class ApplicationViewComponent implements OnInit {

  app = null;
  cluster = environment.deis.cluster;
  rollingBack: boolean = false;
  pipelineCreating: boolean = false;
  logs = '';
  config = {};
  domains = [];
  builds = [];
  releases = [];
  permissions = [];
  pods = [];

  constructor(private route: ActivatedRoute, private deisService: DeisService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.deisService.getApp(id).subscribe((data: any) => {
      this.app = data;
    });

    this.deisService.getAppLogs(id).subscribe((data: any) => {
      this.logs = data;
    });

    this.deisService.getAppConfig(id).subscribe((data: any) => {
      this.config = data;
    });

    this.deisService.getAppDomains(id).subscribe((data: any) => {
      this.domains = data.results;
    });

    this.deisService.getAppBuilds(id).subscribe((data: any) => {
      this.builds = data.results;
    });

    this.deisService.getAppReleases(id).subscribe((data: any) => {
      this.releases = data.results;
    });

    this.deisService.getAppPermissions(id).subscribe((data: any) => {
      this.permissions = data.users;
    });

    this.deisService.getAppPods(id).subscribe((data: any) => {
      this.pods = data.results;
    });
  }

  rollback(app) {
    this.rollingBack = true;
    this.deisService.rollback(app.id)
      .subscribe((data) => {
        this.rollingBack = false;
      });
  }

  createPipeline(app) {
    this.pipelineCreating = true;
    this.deisService.enablePipeline(app.id)
      .subscribe((data) => {
        this.pipelineCreating = false;
      });
  }
}
