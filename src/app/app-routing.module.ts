import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { ConfigNotificacaoPage } from './pages/confignotificacao/confignotificacao';
import { EcotresPage } from './pages/ecotres/ecotres';
import { HistoricoPage } from './pages/historico/historico';
import { HistoricoNotificacaoPage } from './pages/historiconotificacao/historiconotificacao';
import { MeusDadosPage } from './pages/meusdados/meusdados';
import { CadastroPage } from './pages/cadastro/cadastro';
import { SuportePage } from './pages/suporte/suporte';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'cadastro', component: CadastroPage },
  { path: 'confignotificacao', component: ConfigNotificacaoPage },
  { path: 'ecotres', component: EcotresPage },
  { path: 'suporte', component: SuportePage },
  { path: 'historico', component: HistoricoPage },
  { path: 'historiconotificacao', component: HistoricoNotificacaoPage },
  { path: 'meudados', component: MeusDadosPage },
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
