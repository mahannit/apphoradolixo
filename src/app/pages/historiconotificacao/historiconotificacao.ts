import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
    selector: 'page-historiconotificacao',
    templateUrl: 'historiconotificacao.html',
    styleUrls: ['./historiconotificacao.scss']
})
export class HistoricoNotificacaoPage implements OnInit {
    public usuario: Usuario;
    notificacoes = [];
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.notificacoes = [];
        this.authenticationService.currentUser
        .subscribe(arg => {
          this.usuario = arg;
          this.listar();
  
        });
    }
 
    listar() {
        this.usuarioService.ListarNotificacao(this.usuario.user_id).subscribe(data => {
            this.notificacoes = [];
            this.notificacoes = data;
        });
    }

    excluir(id){
        this.usuarioService.ExcluirNotificacao(id).subscribe(data => {
            this.listar();
        });
        
    }

}
