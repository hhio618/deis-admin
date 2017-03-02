import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/share';
import { environment as env } from '../../environments/environment';

@Injectable()
export class DeisService {

  private apps = [];

  constructor(private http: Http) { }

  private createUrl(api) {
    return `http://deis.${env.deis.cluster}/${env.deis.apiVersion}/apps` + api;
  }

  getApps() {
    let url = this.createUrl(`/`);
    if (this.apps.length) {
      return Observable.of(this.apps);
    }

    let get$ = this.http.get(url).map((res: any) => res.json());
    get$.subscribe((apps) => {
      this.apps = apps;
    });
    return get$;
  }

  getApp(app: string) {
    let url = this.createUrl(`/${app}`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppLogs(app: string) {
    let url = this.createUrl(`/${app}/logs`);
    return this.http.get(url).map((res: any) => res.text());
  }

  getAppConfig(app: string) {
    let url = this.createUrl(`/${app}/config`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppDomains(app: string) {
    let url = this.createUrl(`/${app}/domains`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppBuilds(app: string) {
    let url = this.createUrl(`/${app}/builds`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppReleases(app: string) {
    let url = this.createUrl(`/${app}/releases`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppPermissions(app: string) {
    let url = this.createUrl(`/${app}/perms`);
    return this.http.get(url).map((res: any) => res.json());
  }

  getAppPods(app: string) {
    let url = this.createUrl(`/${app}/pods`);
    return this.http.get(url).map((res: any) => res.json());
  }

  setConfig(app: string, config: {}) {
    let url = this.createUrl(`/${app}/config`);
    return this.http.post(url, config);
  }

  createApp(app: string) {
    let url = this.createUrl(`/`);
    return this.http.post(url, {
      id: app
    });
  }

  getPipelineConfig(app: string, track: string) {
    return {
      values: {
        PIPELINE: app,
        PIPELINE_TRACK: track
      }
    };
  }

  enablePipeline(app: string) {
    let stagingApp = app + '-staging';
    let stagingConfig = this.getPipelineConfig(app, 'staging');
    let config = this.getPipelineConfig(app, 'production');
    let create$ = this.createApp(stagingApp).share();

    create$
      .subscribe(res => {
        return this.setConfig(stagingApp, stagingConfig).subscribe();
      });

    return Observable.zip(
      create$,
      this.setConfig(app, config),
    );
  }

  rollback(app: string) {
    let url = this.createUrl(`/${app}/rollback`);
    return this.http.get(url).map((res: any) => res.json());
  }

  build(app: string) {
    // TODO
    let repository = '';
    let url = this.createUrl(`/${app}/builds`);
    return this.http.post(url, {
      image: '' + app
    });
  }
}
