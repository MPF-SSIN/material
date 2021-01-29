import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICalibre, Calibre } from 'app/shared/model/calibre.model';
import { CalibreService } from './calibre.service';

@Component({
  selector: 'jhi-calibre-update',
  templateUrl: './calibre-update.component.html',
})
export class CalibreUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
  });

  constructor(protected calibreService: CalibreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calibre }) => {
      this.updateForm(calibre);
    });
  }

  updateForm(calibre: ICalibre): void {
    this.editForm.patchValue({
      id: calibre.id,
      nome: calibre.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const calibre = this.createFromForm();
    if (calibre.id !== undefined) {
      this.subscribeToSaveResponse(this.calibreService.update(calibre));
    } else {
      this.subscribeToSaveResponse(this.calibreService.create(calibre));
    }
  }

  private createFromForm(): ICalibre {
    return {
      ...new Calibre(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalibre>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
