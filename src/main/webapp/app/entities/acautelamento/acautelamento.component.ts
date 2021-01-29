import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcautelamento } from 'app/shared/model/acautelamento.model';
import { AcautelamentoService } from './acautelamento.service';
import { AcautelamentoDeleteDialogComponent } from './acautelamento-delete-dialog.component';

@Component({
  selector: 'jhi-acautelamento',
  templateUrl: './acautelamento.component.html',
})
export class AcautelamentoComponent implements OnInit, OnDestroy {
  acautelamentos?: IAcautelamento[];
  eventSubscriber?: Subscription;

  constructor(
    protected acautelamentoService: AcautelamentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.acautelamentoService.query().subscribe((res: HttpResponse<IAcautelamento[]>) => (this.acautelamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAcautelamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAcautelamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAcautelamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('acautelamentoListModification', () => this.loadAll());
  }

  delete(acautelamento: IAcautelamento): void {
    const modalRef = this.modalService.open(AcautelamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.acautelamento = acautelamento;
  }
}
