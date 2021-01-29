import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICraf } from 'app/shared/model/craf.model';

@Component({
  selector: 'jhi-craf-detail',
  templateUrl: './craf-detail.component.html',
})
export class CrafDetailComponent implements OnInit {
  craf: ICraf | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ craf }) => (this.craf = craf));
  }

  previousState(): void {
    window.history.back();
  }
}
