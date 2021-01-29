import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICalibre } from 'app/shared/model/calibre.model';

@Component({
  selector: 'jhi-calibre-detail',
  templateUrl: './calibre-detail.component.html',
})
export class CalibreDetailComponent implements OnInit {
  calibre: ICalibre | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calibre }) => (this.calibre = calibre));
  }

  previousState(): void {
    window.history.back();
  }
}
