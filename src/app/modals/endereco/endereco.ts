import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import * as sha512 from 'js-sha512';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';
import { google } from "google-maps";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'modal-endereco',
    templateUrl: 'endereco.html',
    styleUrls: ['./endereco.scss']
})
export class EnderecoModal {
    public usuario: Usuario;
    geocoder = new google.maps.Geocoder();
    form;
    constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private routerComponent: Router,
        public modalController: ModalController,
        private authenticationService: AuthenticationService,
        private geolocation: Geolocation,
        public alertController: AlertController) {
        this.form = this.fb.group({
            nome: [''],
            cep: ['']
        });
    }

    ngOnInit(): void {

        this.authenticationService.currentUser
            .subscribe(arg => {
                this.usuario = arg;
            });

    }

    cadastrarEndereco(form) {
        let lat = 0;
        let lng = 0;
        this.usuarioService.ConsultarCEP(form.cep).subscribe(data => {

            let model = {
                user_id: this.usuario.user_id,
                addr_zipcode: form.cep,
                addr_name: form.nome,
                addr_street: data.logradouro,
                addr_number: 0,
                addr_district: data.bairro,
                addr_city: data.localidade,
                addr_state: data.uf,
                addr_lat: 0,
                addr_long: 0
            };

            this.geocoder.geocode({ 'address': form.cep }, (results, status) => {
                if (status == 'OK') {
                    model.addr_lat = results[0].geometry.location.lat();
                    model.addr_long = results[0].geometry.location.lng();
                }
                this.usuarioService.CadastrarEndereco(model).subscribe(data => {
                    this.presentAlert("Cadastrado com sucesso.");
                    this.dismissModal();
                });



            });





        });


    }



    dismissModal() {
        this.modalController.dismiss();
        // this.modalController.dismiss({
        //   'dismissed': true
        // });
    }

    getLocation() {

        this.geolocation.getCurrentPosition().then((resp) => {
            let latlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            this.geocoder.geocode({ location: latlng }, (results, status) => {
                console.log(results);
                if (status === "OK") {
                    let model = {
                        user_id: this.usuario.user_id,
                        addr_zipcode: results[0].address_components[6].long_name,
                        addr_name: "Localização Atual",
                        addr_street: results[0].address_components[1].long_name,
                        addr_number: results[0].address_components[0].long_name,
                        addr_district: results[0].address_components[2].long_name,
                        addr_city: results[0].address_components[3].long_name,
                        addr_state: results[0].address_components[4].short_name,
                        addr_lat: resp.coords.latitude,
                        addr_long: resp.coords.longitude
                    };
                    this.usuarioService.CadastrarEndereco(model).subscribe(data => {
                        this.presentAlert("Cadastrado com sucesso.");
                        this.dismissModal();
                    });
                    //console.log(results[0].formatted_address);
                } else {
                    this.presentAlert("Não econtramos seu endereço digite seu cep.");
                }

            });





        }).catch((error) => {
            this.presentAlert("Erro : " + error);
        });
    }

    async presentAlert(text) {
        const alert = await this.alertController.create({
            header: 'Atenção',
            message: text,
            buttons: ['OK']
        });

        await alert.present();
    }

}
