import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoMaterial } from 'app/shared/model/tipo-material.model';

@Component({
  selector: 'jhi-tipo-material-detail',
  templateUrl: './tipo-material-detail.component.html',
})
export class TipoMaterialDetailComponent implements OnInit {
  tipoMaterial: ITipoMaterial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoMaterial }) => (this.tipoMaterial = tipoMaterial));
  }

  previousState(): void {
    window.history.back();
  }
}
