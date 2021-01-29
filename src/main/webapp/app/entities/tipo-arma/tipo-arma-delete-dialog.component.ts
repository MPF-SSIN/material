import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoArma } from 'app/shared/model/tipo-arma.model';
import { TipoArmaService } from './tipo-arma.service';

@Component({
  templateUrl: './tipo-arma-delete-dialog.component.html',
})
export class TipoArmaDeleteDialogComponent {
  tipoArma?: ITipoArma;

  constructor(protected tipoArmaService: TipoArmaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoArmaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoArmaListModification');
      this.activeModal.close();
    });
  }
}
