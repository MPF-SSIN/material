import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMaterial, Material } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { ITipoMaterial } from 'app/shared/model/tipo-material.model';
import { TipoMaterialService } from 'app/entities/tipo-material/tipo-material.service';
import { ITipoArma } from 'app/shared/model/tipo-arma.model';
import { TipoArmaService } from 'app/entities/tipo-arma/tipo-arma.service';
import { ICalibre } from 'app/shared/model/calibre.model';
import { CalibreService } from 'app/entities/calibre/calibre.service';
import { IFornecedor } from 'app/shared/model/fornecedor.model';
import { FornecedorService } from 'app/entities/fornecedor/fornecedor.service';

type SelectableEntity = ITipoMaterial | ITipoArma | ICalibre | IFornecedor;

@Component({
  selector: 'jhi-material-update',
  templateUrl: './material-update.component.html',
})
export class MaterialUpdateComponent implements OnInit {
  isSaving = false;
  tipomaterials: ITipoMaterial[] = [];
  tipoarmas: ITipoArma[] = [];
  calibres: ICalibre[] = [];
  fornecedors: IFornecedor[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    marca: [null, [Validators.required]],
    valor: [null, [Validators.required]],
    situacao: [],
    serie: [],
    lote: [],
    tamanho: [],
    tipoMaterial: [],
    tipoArma: [],
    calibre: [],
    fornecedor: [],
  });

  constructor(
    protected materialService: MaterialService,
    protected tipoMaterialService: TipoMaterialService,
    protected tipoArmaService: TipoArmaService,
    protected calibreService: CalibreService,
    protected fornecedorService: FornecedorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.updateForm(material);

      this.tipoMaterialService.query().subscribe((res: HttpResponse<ITipoMaterial[]>) => (this.tipomaterials = res.body || []));

      this.tipoArmaService.query().subscribe((res: HttpResponse<ITipoArma[]>) => (this.tipoarmas = res.body || []));

      this.calibreService.query().subscribe((res: HttpResponse<ICalibre[]>) => (this.calibres = res.body || []));

      this.fornecedorService.query().subscribe((res: HttpResponse<IFornecedor[]>) => (this.fornecedors = res.body || []));
    });
  }

  updateForm(material: IMaterial): void {
    this.editForm.patchValue({
      id: material.id,
      nome: material.nome,
      descricao: material.descricao,
      marca: material.marca,
      valor: material.valor,
      situacao: material.situacao,
      serie: material.serie,
      lote: material.lote,
      tamanho: material.tamanho,
      tipoMaterial: material.tipoMaterial,
      tipoArma: material.tipoArma,
      calibre: material.calibre,
      fornecedor: material.fornecedor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const material = this.createFromForm();
    if (material.id !== undefined) {
      this.subscribeToSaveResponse(this.materialService.update(material));
    } else {
      this.subscribeToSaveResponse(this.materialService.create(material));
    }
  }

  private createFromForm(): IMaterial {
    return {
      ...new Material(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
      serie: this.editForm.get(['serie'])!.value,
      lote: this.editForm.get(['lote'])!.value,
      tamanho: this.editForm.get(['tamanho'])!.value,
      tipoMaterial: this.editForm.get(['tipoMaterial'])!.value,
      tipoArma: this.editForm.get(['tipoArma'])!.value,
      calibre: this.editForm.get(['calibre'])!.value,
      fornecedor: this.editForm.get(['fornecedor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterial>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
