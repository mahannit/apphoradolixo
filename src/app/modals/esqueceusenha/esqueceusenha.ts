import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
    selector: 'modal-esqueceusenha',
    templateUrl: 'esqueceusenha.html',
    styleUrls: ['./esqueceusenha.scss']
})
export class EsqueceuSenhaModal {
    form;
    constructor(private fb: FormBuilder,
        public modalController: ModalController,
        private authenticationService: AuthenticationService,
        public alertController: AlertController) {
        this.form = this.fb.group({
            email: ['', Validators.required],
        });
    }

    ngOnInit(): void {


    }

    esqueceuSenha(form) {
        this.authenticationService.EsqueceuSenha(form.email).subscribe(data => {
            this.presentAlert("Atenção","Senha enviada para seu e-mail.");
            this.dismissModal();
        });


    }



    dismissModal() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss();
        // this.modalController.dismiss({
        //   'dismissed': true
        // });
    }

    async presentAlert(header,text) {
        const alert = await this.alertController.create({
            header: header,
            message: text,
            buttons: ['OK']
        });

        await alert.present();
    }




}
