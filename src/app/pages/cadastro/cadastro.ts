import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { $ } from 'protractor';
import { formatDate } from '@angular/common';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AlertController } from '@ionic/angular';
import * as sha512 from 'js-sha512';


@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
    styleUrls: ['./cadastro.scss']
})
export class CadastroPage implements OnInit {
    public usuario: Usuario;
    form;
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        private firebase: FirebaseX,
        private auth: AuthenticationService,
        public alertController: AlertController) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            telefone: ['', Validators.required],
            email: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    ngOnInit(): void {

    }
 
    cadastrar(form) {
        let myDate = new Date();
        let model = {
            user_name: form.nome,
            user_telephone: form.telefone,
            user_email: form.email,
            user_password: sha512.sha512(form.senha),
            user_registration: formatDate(myDate, 'yyyy-MM-dd', 'en-US')
            
        };
        this.usuarioService.Cadastrar(model).subscribe(data => {
            this.presentAlert("Atenção","Cadastrado com sucesso! agora faça seu login!.");
            this.routerComponent.navigate(['/login']);
   

        });
    }


    async presentAlert(header,text) {
        const alert = await this.alertController.create({
            header: header,
            message: text,
            buttons: ['OK']
        });

        await alert.present();
    }

         // let modelLogin = {
        //     login: form.email,
        //     password: sha512.sha512(form.senha)
        // };
        //  this.auth.login(modelLogin).subscribe(data => {
        //     if (data.user_id > 0) {
        //         this.auth.TracarLogin().subscribe(data => {
        //             this.usuario = new Usuario();
        //             this.usuario = this.auth.currentUserValue;
        //             this.auth.updateUser(this.usuario);
        //             let modelToken = {
        //                 app_id: 1,
        //                 user_id: this.usuario.user_id,
        //                 token_value: "token",
        //                 notification_status: 1,
        //                 notification_status_days: "1,1,1,1,1,1,1"
        //             };
                  
        //             this.firebase.getToken().then(token => {
        //                 let modelToken = {
        //                     app_id: 1,
        //                     user_id: this.usuario.user_id,
        //                     token_value: token,
        //                     notification_status: 1,
        //                     notification_status_days: "1,1,1,1,1,1,1"
        //                 };
        //                 this.usuarioService.CadastrarToken(modelToken).subscribe(data => {

        //                 });
        //             });
          
        //         });

        //     } 
        // });

}
