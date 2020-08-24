import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'page-historico',
    templateUrl: 'historico.html',
    styleUrls: ['./historico.scss']
})
export class HistoricoPage implements OnInit {
    public usuario: Usuario;
    historicos = [];
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        private authenticationService: AuthenticationService,
        public alertController: AlertController) {
    }

    ngOnInit(): void {
        this.historicos = [];



        this.authenticationService.currentUser
            .subscribe(arg => {
                this.usuario = arg;
                this.listar();

            });
    }

    listar() {
        this.usuarioService.ListarHistorico(this.usuario.user_id).subscribe(data => {
            this.historicos = [];
            this.historicos = data;
        });
    }

    excluir(id) {
        this.usuarioService.ExcluirHistorico(id).subscribe(data => {
            this.listar();
            this.presentAlert();
        });

    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Atenção',
            message: 'Excluido com sucesso.',
            buttons: ['OK']
        });

        await alert.present();
    }

}
