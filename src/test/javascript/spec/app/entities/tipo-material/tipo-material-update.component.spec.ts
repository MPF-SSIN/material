import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { TipoMaterialUpdateComponent } from 'app/entities/tipo-material/tipo-material-update.component';
import { TipoMaterialService } from 'app/entities/tipo-material/tipo-material.service';
import { TipoMaterial } from 'app/shared/model/tipo-material.model';

describe('Component Tests', () => {
  describe('TipoMaterial Management Update Component', () => {
    let comp: TipoMaterialUpdateComponent;
    let fixture: ComponentFixture<TipoMaterialUpdateComponent>;
    let service: TipoMaterialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoMaterialUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoMaterialUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoMaterialUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoMaterialService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoMaterial(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoMaterial();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
