import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { AcautelamentoDetailComponent } from 'app/entities/acautelamento/acautelamento-detail.component';
import { Acautelamento } from 'app/shared/model/acautelamento.model';

describe('Component Tests', () => {
  describe('Acautelamento Management Detail Component', () => {
    let comp: AcautelamentoDetailComponent;
    let fixture: ComponentFixture<AcautelamentoDetailComponent>;
    const route = ({ data: of({ acautelamento: new Acautelamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [AcautelamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AcautelamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcautelamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load acautelamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.acautelamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
