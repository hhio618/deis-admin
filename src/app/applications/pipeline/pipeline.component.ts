import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeisService } from '../../shared/deis.service';

@Component({
  selector: 'dp-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {

  app;
  lanes = [
    {
      id: 'review',
      name: 'In Review',
      apps: []
    },
    {
      id: 'staging',
      name: 'Staging',
      apps: []
    },
    {
      id: 'production',
      name: 'Production',
      apps: []
    }
  ];

  constructor(private route: ActivatedRoute, private deisService: DeisService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.deisService.getApp(id).subscribe((data: any) => {
      this.app = data;
    });

    // Get list of applications and find ones with the same pipeline
    this.deisService.getApps()
      .map((value: any) => value.results)
      .subscribe((apps: any) => {

        // Fetch config for each app
        apps.forEach(app => {
          app.config = {};
          this.deisService.getAppConfig(app.id)
            .subscribe((config: any) => {
              app.config.values = config.values;
              if (app.config.values.PIPELINE === id) {

                let lane = this.lanes.find(lane => lane.id === app.config.values.PIPELINE_TRACK);
                lane.apps.push(app);

                // Attach additional info for this app
                this.deisService.getAppBuilds(app.id).subscribe((data: any) => {
                  app.builds = data.results;
                });

              }
            });
        });
      });
  }

}
