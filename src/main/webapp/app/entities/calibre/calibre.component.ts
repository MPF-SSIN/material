import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICalibre } from 'app/shared/model/calibre.model';
import { CalibreService } from './calibre.service';
import { CalibreDeleteDialogComponent } from './calibre-delete-dialog.component';

@Component({
  selector: 'jhi-calibre',
  templateUrl: './calibre.component.html',
})
export class CalibreComponent implements OnInit, OnDestroy {
  calibres?: ICalibre[];
  eventSubscriber?: Subscription;

  constructor(protected calibreService: CalibreService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.calibreService.query().subscribe((res: HttpResponse<ICalibre[]>) => (this.calibres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCalibres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICalibre): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCalibres(): void {
    this.eventSubscriber = this.eventManager.subscribe('calibreListModification', () => this.loadAll());
  }

  delete(calibre: ICalibre): void {
    const modalRef = this.modalService.open(CalibreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.calibre = calibre;
  }
}
