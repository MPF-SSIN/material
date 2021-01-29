import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { TipoMaterialComponent } from 'app/entities/tipo-material/tipo-material.component';
import { TipoMaterialService } from 'app/entities/tipo-material/tipo-material.service';
import { TipoMaterial } from 'app/shared/model/tipo-material.model';

describe('Component Tests', () => {
  describe('TipoMaterial Management Component', () => {
    let comp: TipoMaterialComponent;
    let fixture: ComponentFixture<TipoMaterialComponent>;
    let service: TipoMaterialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoMaterialComponent],
      })
        .overrideTemplate(TipoMaterialComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoMaterialComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoMaterialService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoMaterial(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoMaterials && comp.tipoMaterials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
