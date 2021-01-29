import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAcautelamento, Acautelamento } from 'app/shared/model/acautelamento.model';
import { AcautelamentoService } from './acautelamento.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

@Component({
  selector: 'jhi-acautelamento-update',
  templateUrl: './acautelamento-update.component.html',
})
export class AcautelamentoUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    dataHora: [null, [Validators.required]],
    dataHoraDevolucao: [],
    obs: [],
    acautelante: [],
  });

  constructor(
    protected acautelamentoService: AcautelamentoService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acautelamento }) => {
      if (!acautelamento.id) {
        const today = moment().startOf('day');
        acautelamento.dataHora = today;
        acautelamento.dataHoraDevolucao = today;
      }

      this.updateForm(acautelamento);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
    });
  }

  updateForm(acautelamento: IAcautelamento): void {
    this.editForm.patchValue({
      id: acautelamento.id,
      numero: acautelamento.numero,
      dataHora: acautelamento.dataHora ? acautelamento.dataHora.format(DATE_TIME_FORMAT) : null,
      dataHoraDevolucao: acautelamento.dataHoraDevolucao ? acautelamento.dataHoraDevolucao.format(DATE_TIME_FORMAT) : null,
      obs: acautelamento.obs,
      acautelante: acautelamento.acautelante,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acautelamento = this.createFromForm();
    if (acautelamento.id !== undefined) {
      this.subscribeToSaveResponse(this.acautelamentoService.update(acautelamento));
    } else {
      this.subscribeToSaveResponse(this.acautelamentoService.create(acautelamento));
    }
  }

  private createFromForm(): IAcautelamento {
    return {
      ...new Acautelamento(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value ? moment(this.editForm.get(['dataHora'])!.value, DATE_TIME_FORMAT) : undefined,
      dataHoraDevolucao: this.editForm.get(['dataHoraDevolucao'])!.value
        ? moment(this.editForm.get(['dataHoraDevolucao'])!.value, DATE_TIME_FORMAT)
        : undefined,
      obs: this.editForm.get(['obs'])!.value,
      acautelante: this.editForm.get(['acautelante'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcautelamento>>): void {
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

  trackById(index: number, item: IPessoa): any {
    return item.id;
  }
}
