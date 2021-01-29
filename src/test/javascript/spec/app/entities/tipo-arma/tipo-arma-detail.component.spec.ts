import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { TipoArmaDetailComponent } from 'app/entities/tipo-arma/tipo-arma-detail.component';
import { TipoArma } from 'app/shared/model/tipo-arma.model';

describe('Component Tests', () => {
  describe('TipoArma Management Detail Component', () => {
    let comp: TipoArmaDetailComponent;
    let fixture: ComponentFixture<TipoArmaDetailComponent>;
    const route = ({ data: of({ tipoArma: new TipoArma(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoArmaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoArmaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoArmaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoArma on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoArma).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
