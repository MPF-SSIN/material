import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.SsinPessoaModule),
      },
      {
        path: 'lotacao',
        loadChildren: () => import('./lotacao/lotacao.module').then(m => m.SsinLotacaoModule),
      },
      {
        path: 'tipo-material',
        loadChildren: () => import('./tipo-material/tipo-material.module').then(m => m.SsinTipoMaterialModule),
      },
      {
        path: 'tipo-arma',
        loadChildren: () => import('./tipo-arma/tipo-arma.module').then(m => m.SsinTipoArmaModule),
      },
      {
        path: 'calibre',
        loadChildren: () => import('./calibre/calibre.module').then(m => m.SsinCalibreModule),
      },
      {
        path: 'fornecedor',
        loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.SsinFornecedorModule),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.SsinMaterialModule),
      },
      {
        path: 'craf',
        loadChildren: () => import('./craf/craf.module').then(m => m.SsinCrafModule),
      },
      {
        path: 'acautelamento',
        loadChildren: () => import('./acautelamento/acautelamento.module').then(m => m.SsinAcautelamentoModule),
      },
      {
        path: 'item-acautelamento',
        loadChildren: () => import('./item-acautelamento/item-acautelamento.module').then(m => m.SsinItemAcautelamentoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SsinEntityModule {}
