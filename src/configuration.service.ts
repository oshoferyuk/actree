import { Injectable } from '@angular/core';
declare var webpack: any;

@Injectable()
export class AppConfigService {
  public static webpack: any = webpack;
  constructor() {
  }
}
