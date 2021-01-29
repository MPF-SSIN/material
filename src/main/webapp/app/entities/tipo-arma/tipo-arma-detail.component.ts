import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoArma } from 'app/shared/model/tipo-arma.model';

@Component({
  selector: 'jhi-tipo-arma-detail',
  templateUrl: './tipo-arma-detail.component.html',
})
export class TipoArmaDetailComponent implements OnInit {
  tipoArma: ITipoArma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoArma }) => (this.tipoArma = tipoArma));
  }

  previousState(): void {
    window.history.back();
  }
}
