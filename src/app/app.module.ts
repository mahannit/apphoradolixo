import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPage } from './pages/login/login';
import { CadastroPage } from './pages/cadastro/cadastro';
import { MeusDadosPage } from './pages/meusdados/meusdados';
import { EnderecoModal } from './modals/endereco/endereco';
import { HistoricoNotificacaoPage } from './pages/historiconotificacao/historiconotificacao';
import { HistoricoPage } from './pages/historico/historico';
import { ConfigNotificacaoPage } from './pages/confignotificacao/confignotificacao';
import { EcotresPage } from './pages/ecotres/ecotres';
import { SuportePage } from './pages/suporte/suporte';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EsqueceuSenhaModal } from './modals/esqueceusenha/esqueceusenha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


@NgModule({
  declarations: [
    LoginPage,
    CadastroPage,
    MeusDadosPage,
    EnderecoModal,
    EsqueceuSenhaModal,
    HistoricoNotificacaoPage,
    HistoricoPage,
    ConfigNotificacaoPage,
    EcotresPage,
    SuportePage,
    AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Geolocation,
    FirebaseX,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
