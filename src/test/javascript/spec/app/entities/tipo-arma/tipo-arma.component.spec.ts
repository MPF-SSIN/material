import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { TipoArmaComponent } from 'app/entities/tipo-arma/tipo-arma.component';
import { TipoArmaService } from 'app/entities/tipo-arma/tipo-arma.service';
import { TipoArma } from 'app/shared/model/tipo-arma.model';

describe('Component Tests', () => {
  describe('TipoArma Management Component', () => {
    let comp: TipoArmaComponent;
    let fixture: ComponentFixture<TipoArmaComponent>;
    let service: TipoArmaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoArmaComponent],
      })
        .overrideTemplate(TipoArmaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoArmaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoArmaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoArma(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoArmas && comp.tipoArmas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
