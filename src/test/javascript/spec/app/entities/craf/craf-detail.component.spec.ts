import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { CrafDetailComponent } from 'app/entities/craf/craf-detail.component';
import { Craf } from 'app/shared/model/craf.model';

describe('Component Tests', () => {
  describe('Craf Management Detail Component', () => {
    let comp: CrafDetailComponent;
    let fixture: ComponentFixture<CrafDetailComponent>;
    const route = ({ data: of({ craf: new Craf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CrafDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CrafDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CrafDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load craf on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.craf).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
