import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { EnderecoModal } from 'src/app/modals/endereco/endereco';
import { ModalController, AlertController } from '@ionic/angular';


@Component({
    selector: 'page-meusdados',
    templateUrl: 'meusdados.html',
    styleUrls: ['./meusdados.scss']
})
export class MeusDadosPage implements OnInit {
    public usuario: Usuario;
    enderecos = [];
    form;
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        public modalController: ModalController,
        private authenticationService: AuthenticationService,
        public alertController: AlertController) {
        this.enderecos = [];
        this.form = this.fb.group({
            nome: [''],
            telefone: [''],
            email: ['']
        });
        this.authenticationService.currentUser
        .subscribe(arg => {
          this.usuario = arg;
          this.form.patchValue({
           nome: this.usuario.user_name,
           telefone: this.usuario.user_telephone,
           email: this.usuario.user_email
          });
          this.listarEndereco();
  
        });
    }




    ngOnInit(): void {

    }

    listarEndereco() {
        this.usuarioService.ListarEndereco(this.usuario.user_id).subscribe(data => {
            this.enderecos = [];
            this.enderecos = data;
        });
    }

    excluirEndereco(id) {
        this.usuarioService.ExcluirEndereco(id).subscribe(data => {
            this.listarEndereco();
            this.presentAlert("Atenção","Excluido com sucesso.");
        });
    }

    alterar(model){

    }

    async abrirModalEndereco() {
        let modal = await this.modalController.create({
            component: EnderecoModal,
            cssClass: 'endereco'
        });
        modal.onDidDismiss().then(data => {
           this.listarEndereco();
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
