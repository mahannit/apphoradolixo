import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';
import { EsqueceuSenhaModal } from 'src/app/modals/esqueceusenha/esqueceusenha';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
    public usuario: Usuario;
    form;
    constructor(private fb: FormBuilder,
        private auth: AuthenticationService,
        private routerComponent: Router,
        private usuarioService: UsuarioService,
        public modalController: ModalController,
        private firebase: FirebaseX,
        public alertController: AlertController) {
        this.form = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {

    }
 
    login(form) {
        console.log(form);
        let model = {
            login: form.login,
            password: sha512.sha512(form.password)
        };
        console.log(model);
       // alert("começou");
        this.auth.login(model).subscribe(data => {
            if (data.user_id > 0) {
                this.auth.TracarLogin().subscribe(data => {
                    this.usuario = new Usuario();
                    this.usuario = this.auth.currentUserValue;
                    this.auth.updateUser(this.usuario);
                    let modelToken = {
                        app_id: 1,
                        user_id: this.usuario.user_id,
                        token_value: "token",
                        notification_status: 1,
                        notification_status_days: "1,1,1,1,1,1,1"
                    };
                  
                    this.firebase.getToken().then(token => {
                        let modelToken = {
                            app_id: 1,
                            user_id: this.usuario.user_id,
                            token_value: token,
                            notification_status: 1,
                            notification_status_days: "1,1,1,1,1,1,1"
                        };
                        this.usuarioService.CadastrarToken(modelToken).subscribe(data => {

                        });
                    });
                    this.routerComponent.navigate(['/home']);
                });

            } else {
                //swal.fire("Login ou senha incorretos.");
                this.presentAlert("Atenção","Seu login ou senha esta incorretos.");
            }
        });
    }

    async abrirEsqueceuSenha() {
        let modal = await this.modalController.create({
            component: EsqueceuSenhaModal,
            cssClass: 'esqueceusenha'
        });
        modal.onDidDismiss().then(data => {
        });

        return await modal.present();
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
