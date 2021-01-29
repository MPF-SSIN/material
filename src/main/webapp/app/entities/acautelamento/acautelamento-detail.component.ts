import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcautelamento } from 'app/shared/model/acautelamento.model';

@Component({
  selector: 'jhi-acautelamento-detail',
  templateUrl: './acautelamento-detail.component.html',
})
export class AcautelamentoDetailComponent implements OnInit {
  acautelamento: IAcautelamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acautelamento }) => (this.acautelamento = acautelamento));
  }

  previousState(): void {
    window.history.back();
  }
}
