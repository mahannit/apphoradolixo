import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../models/usuario';
import { AuthenticationService } from '../services/auth/authentication.service';
import { google } from "google-maps";
import { CaminhaoService } from '../services/caminhao/caminhao.service';
import { webSocket, WebSocketSubjectConfig } from "rxjs/webSocket";
import { WebSocketServer } from '@ionic-native/web-socket-server';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: Usuario;

  caminhoes = [];
  icon = {
  //  path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z", //SVG path of awesomefont marker
    path: "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z",
    fillColor: 'green', //color of the marker
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 0.05, //size of the marker, careful! this scale also affects anchor and labelOrigin
    anchor: new google.maps.Point(200, 510), //position of the icon, careful! this is affected by scale
    labelOrigin: new google.maps.Point(205, 190) //position of the label, careful! this is affected by scale
  };

  markers = [];
  marker: google.maps.Marker;
  lat = -20.672310;
  lng = -43.771140;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14
  };
  @ViewChild('map', { static: false }) gmap: ElementRef;

  constructor(private authenticationService: AuthenticationService,
    private caminhaoService: CaminhaoService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.authenticationService.currentUser
      .subscribe(arg => {
        this.usuario = arg;
        console.log(this.usuario);

      });
  }

  ngAfterViewInit() {
    this.mapInitializer();
    //this.buscarCaminhao();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.listarEnderecoUsuario();
    this.caminhaoStart();
    //this.findMe();
  }

  caminhaoStart() {
    this.caminhaoService.TrackPost().subscribe(datapost => {
      console.log("POST");
      console.log(datapost);


      this.caminhaoService.BuscarDispositivos(null).subscribe(data => {
        this.caminhoes = data;
        console.log("caminhoes");
        console.log(data);
        this.caminhaoService.Server().subscribe(dataServer => {
          console.log("server");
          console.log(dataServer);
          this.caminhaoService.Session().subscribe(dataSession => {

            console.log("sessão");
            console.log(dataSession);
            const DEFAULT_WEBSOCKET_CONFIG: WebSocketSubjectConfig<any> = {
              url: 'ws://horadolixo.ml:8082/api/socket',
              deserializer: (e: MessageEvent) => JSON.parse(e.data),
              serializer: (value: any) => JSON.stringify(value),
            };

            const subject = webSocket(DEFAULT_WEBSOCKET_CONFIG);

            subject.subscribe(
              msg => {
                const data = msg

                if (data.positions) {
                  // console.log(data);
                  for (let i = 0; i < data.positions.length; i++) {
                    var position = data.positions[i];
                    let marker = this.markers[position.deviceId];
                    let color = 'green';
                    let caminhaoItem = this.caminhoes.filter(c => c.id === position.deviceId);
                    if (caminhaoItem.length > 0) {
                      color = caminhaoItem[0]["attributes"]['web.reportColor'];
                      this.icon.fillColor = color;
                    } else {
                      this.icon.fillColor = 'green';
                    }


                    let location = new google.maps.LatLng(position.latitude, position.longitude);
                    // console.log(this.markers);
                    if (!marker) {
                      console.log("novo");



    
                      let m = new google.maps.Marker({
                        position: location,
                        map: this.map,
                        title: position.deviceId.toString(),
                        icon: this.icon,
                        
                        // icon: { url: './assets/imgs/caminhao1.png', rotation: 0 },
                       
                        // label: {
                        //   fontFamily: "'Font Awesome 5 Free'",
                        //   text: '\uf0d1', //icon code
                        //  //text: 'Oi',
                        //   fontWeight: '900', //careful! some icons in FA5 only exist for specific font weights
                        //   color: '#FFFFFF', //color of the text inside marker
                        // }
                      });
                      this.markers[position.deviceId] = m;
                    } else {
                      // console.log("atualizou");
                      // let locationAntiga = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

                      marker.setPosition(location);
                      //  marker.setRotation(10,10);
                      //this.getBearingBetweenTwoPoints1(locationAntiga, location)
                      //  console.log(this.getBearingBetweenTwoPoints1(locationAntiga, location));




                    }
                  }
                }

              },
              err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
              () => console.log('complete') // Called when connection is closed (for whatever reason).
            );


          });

        });
      });

    });
  }

  getBearingBetweenTwoPoints1(latLng1, latLng2) {


    let lat1 = this.degreesToRadians(latLng1.lat());
    let long1 = this.degreesToRadians(latLng1.lng());
    let lat2 = this.degreesToRadians(latLng2.lat());
    let long2 = this.degreesToRadians(latLng2.lng());


    let dLon = (long2 - long1);


    let y = Math.sin(dLon) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
      * Math.cos(lat2) * Math.cos(dLon);

    let radiansBearing = Math.atan2(y, x);


    return this.radiansToDegrees(radiansBearing);
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180.0;
  }

  radiansToDegrees(radians) {
    return radians * 180.0 / Math.PI;
  }

  listarEnderecoUsuario() {
    this.usuarioService.ListarEndereco(this.usuario.user_id).subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let location = new google.maps.LatLng(element.addr_lat, element.addr_long);
        new google.maps.Marker({
          position: location,
          map: this.map,
          title: "Meu Endereço",
          icon: { url: './assets/imgs/green-dot.png', rotation: 0 }
        });
      }
    });
  }


}
