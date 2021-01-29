import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemAcautelamento } from 'app/shared/model/item-acautelamento.model';
import { ItemAcautelamentoService } from './item-acautelamento.service';

@Component({
  templateUrl: './item-acautelamento-delete-dialog.component.html',
})
export class ItemAcautelamentoDeleteDialogComponent {
  itemAcautelamento?: IItemAcautelamento;

  constructor(
    protected itemAcautelamentoService: ItemAcautelamentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemAcautelamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('itemAcautelamentoListModification');
      this.activeModal.close();
    });
  }
}
