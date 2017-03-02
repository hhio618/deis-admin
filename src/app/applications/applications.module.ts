import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationSummaryComponent } from './application-summary/application-summary.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { LaneComponent } from './lane/lane.component';

@NgModule({
  imports: [
    SharedModule,
    ApplicationsRoutingModule,
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationComponent,
    ApplicationSummaryComponent,
    ApplicationListComponent,
    ApplicationViewComponent,
    PipelineComponent,
    LaneComponent,
  ]
})
export class ApplicationsModule { }
