import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {AppConfigService} from "../configuration.service";


//import aa from '!!raw-loader!../assets/sprites/aa.svg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
show = false;
branding;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    this.branding = AppConfigService.webpack.brand ;
    console.log(this.branding);

     this.matIconRegistry.addSvgIconSet(
       this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sprites/aa.svg')
     );

    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sprites/bb.svg')
    );

    //this.matIconRegistry.addSvgIconLiteral(
    //  'thumbsUp', sanitizer.bypassSecurityTrustHtml(thumbsUp));




  }

test(){
  this.show = !this.show;
}
}
