import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
    selector: 'page-confignotificacao',
    templateUrl: 'confignotificacao.html',
    styleUrls: ['./confignotificacao.scss']
})
export class ConfigNotificacaoPage implements OnInit {
    public usuario: Usuario;
    form;
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        private authenticationService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.form = this.fb.group({
            seg: [null],
            ter: [null],
            qua: [null],
            qui: [null],
            sex: [null],
            sab: [null],
            dom: [null],
            receber: [null]
        });

        this.authenticationService.currentUser
            .subscribe(arg => {
                this.usuario = arg;
                this.listar();

            });
    }

    listar() {
        this.usuarioService.ListarConfiguracoes(this.usuario.user_id).subscribe(data => {
            if (data.length >= 0) {
                let dias = [];
                dias = data[0].notification_status_days.split(",");
                let receb = (data[0].notification_status == "1") ? true : false;
                let seg = false;
                let ter = false;
                let qua = false;
                let qui = false;
                let sex = false;
                let sab = false;
                let dom = false;
                if (dias.length > 0) {
                    dom = (dias[0] == 1) ? true : false;
                    seg = (dias[1] == 1) ? true : false;
                    ter = (dias[2] == 1) ? true : false;
                    qua = (dias[3] == 1) ? true : false;
                    qui = (dias[4] == 1) ? true : false;
                    sex = (dias[5] == 1) ? true : false;
                    sab = (dias[6] == 1) ? true : false;


                    //    for (let index = 0; index < dias.length; index++) {
                    //        const element = dias[index];
                    //        console.log(element);

                    //    }
                }

                this.form.patchValue({
                    seg: seg,
                    ter: ter,
                    qua: qua,
                    qui: qui,
                    sex: sex,
                    sab: sab,
                    dom: dom,
                    receber: receb
                });

            }

        });
    }

    alterar(form) {
        let notification_status_days;
        if (form.dom)
            notification_status_days = "1,"
        else
            notification_status_days = "0,"

        if (form.seg)
            notification_status_days += "1,"
        else
            notification_status_days += "0,"


        if (form.ter)
            notification_status_days += "1,"
        else
            notification_status_days += "0,"

        if (form.qua)
            notification_status_days += "1,"
        else
            notification_status_days += "0,"

        if (form.qui)
            notification_status_days += "1,"
        else
            notification_status_days += "0,"

        if (form.sex)
            notification_status_days += "1,"
        else
            notification_status_days += "0,"

        if (form.sab)
            notification_status_days += "1"
        else
            notification_status_days += "0"





        let model = {
            user_id: this.usuario.user_id,
            notification_status: (form.receber == true) ? "1" : "0",
            notification_status_days: notification_status_days
        };
   
        this.usuarioService.AlterarConfiguracoes(model).subscribe(data => {
            this.listar();
        });

    }

  

}
