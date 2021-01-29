import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICraf } from 'app/shared/model/craf.model';
import { CrafService } from './craf.service';
import { CrafDeleteDialogComponent } from './craf-delete-dialog.component';

@Component({
  selector: 'jhi-craf',
  templateUrl: './craf.component.html',
})
export class CrafComponent implements OnInit, OnDestroy {
  crafs?: ICraf[];
  eventSubscriber?: Subscription;

  constructor(protected crafService: CrafService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.crafService.query().subscribe((res: HttpResponse<ICraf[]>) => (this.crafs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCrafs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICraf): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCrafs(): void {
    this.eventSubscriber = this.eventManager.subscribe('crafListModification', () => this.loadAll());
  }

  delete(craf: ICraf): void {
    const modalRef = this.modalService.open(CrafDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.craf = craf;
  }
}
