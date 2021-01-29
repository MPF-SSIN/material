import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcautelamento } from 'app/shared/model/acautelamento.model';
import { AcautelamentoService } from './acautelamento.service';

@Component({
  templateUrl: './acautelamento-delete-dialog.component.html',
})
export class AcautelamentoDeleteDialogComponent {
  acautelamento?: IAcautelamento;

  constructor(
    protected acautelamentoService: AcautelamentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.acautelamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('acautelamentoListModification');
      this.activeModal.close();
    });
  }
}
