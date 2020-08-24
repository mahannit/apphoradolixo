
import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
    selector: 'page-ecotres',
    templateUrl: 'ecotres.html',
    styleUrls: ['./ecotres.scss']
})
export class EcotresPage implements OnInit {
    iframeurl: any;
    constructor(private iab: InAppBrowser,
        private routerComponent: Router) { }





    ngOnInit(): void {
        //this.iframeurl = 'https://google.com/';
        const browser = this.iab.create('https://ecotres.com.br/');
        this.routerComponent.navigate(['/home']);
    }

    abrirSite(){
        const browser = this.iab.create('https://ecotres.com.br/');
    }

   

}
