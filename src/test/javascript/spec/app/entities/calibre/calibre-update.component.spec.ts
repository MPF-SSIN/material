import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { CalibreUpdateComponent } from 'app/entities/calibre/calibre-update.component';
import { CalibreService } from 'app/entities/calibre/calibre.service';
import { Calibre } from 'app/shared/model/calibre.model';

describe('Component Tests', () => {
  describe('Calibre Management Update Component', () => {
    let comp: CalibreUpdateComponent;
    let fixture: ComponentFixture<CalibreUpdateComponent>;
    let service: CalibreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CalibreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CalibreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CalibreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CalibreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Calibre(123);
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
        const entity = new Calibre();
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
