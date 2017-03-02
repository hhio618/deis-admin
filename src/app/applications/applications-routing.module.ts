import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { AuthGuardService } from '../shared/auth-guard.service';

export const routes: Routes = [
  {
    path: 'apps',
    component: ApplicationsComponent,
    canActivate: [AuthGuardService],
    // loadChildren: 'app/applications/applications.module#applicationsModule',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ApplicationListComponent
      },
      {
        path: ':id',
        component: ApplicationViewComponent
      },
    ]
  },
  {
    path: 'pipeline',
    component: ApplicationsComponent,
    canActivate: [AuthGuardService],
    // loadChildren: 'app/applications/applications.module#applicationsModule',
    children: [
      {
        path: ':id',
        component: PipelineComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ApplicationsRoutingModule { }
