import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemAcautelamento } from 'app/shared/model/item-acautelamento.model';

@Component({
  selector: 'jhi-item-acautelamento-detail',
  templateUrl: './item-acautelamento-detail.component.html',
})
export class ItemAcautelamentoDetailComponent implements OnInit {
  itemAcautelamento: IItemAcautelamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemAcautelamento }) => (this.itemAcautelamento = itemAcautelamento));
  }

  previousState(): void {
    window.history.back();
  }
}
