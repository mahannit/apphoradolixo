import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
    selector: 'page-suporte',
    templateUrl: 'suporte.html',
    styleUrls: ['./suporte.scss']
})
export class SuportePage implements OnInit {
    iframeurl: any;
    constructor(private iab: InAppBrowser,
        private routerComponent: Router) { }





    ngOnInit(): void {
       // const browser = this.iab.create('whatsapp//send?phone=553193567988');
       // this.routerComponent.navigate(['/home']);
    }

    abrirWhats(){
        const browser = this.iab.create('whatsapp//send?phone=553193567988');
    }

   

}
