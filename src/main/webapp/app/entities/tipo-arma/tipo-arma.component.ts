import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoArma } from 'app/shared/model/tipo-arma.model';
import { TipoArmaService } from './tipo-arma.service';
import { TipoArmaDeleteDialogComponent } from './tipo-arma-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-arma',
  templateUrl: './tipo-arma.component.html',
})
export class TipoArmaComponent implements OnInit, OnDestroy {
  tipoArmas?: ITipoArma[];
  eventSubscriber?: Subscription;

  constructor(protected tipoArmaService: TipoArmaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tipoArmaService.query().subscribe((res: HttpResponse<ITipoArma[]>) => (this.tipoArmas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoArmas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoArma): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoArmas(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoArmaListModification', () => this.loadAll());
  }

  delete(tipoArma: ITipoArma): void {
    const modalRef = this.modalService.open(TipoArmaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoArma = tipoArma;
  }
}
