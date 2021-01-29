import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { AcautelamentoComponent } from 'app/entities/acautelamento/acautelamento.component';
import { AcautelamentoService } from 'app/entities/acautelamento/acautelamento.service';
import { Acautelamento } from 'app/shared/model/acautelamento.model';

describe('Component Tests', () => {
  describe('Acautelamento Management Component', () => {
    let comp: AcautelamentoComponent;
    let fixture: ComponentFixture<AcautelamentoComponent>;
    let service: AcautelamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [AcautelamentoComponent],
      })
        .overrideTemplate(AcautelamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcautelamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcautelamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Acautelamento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.acautelamentos && comp.acautelamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
