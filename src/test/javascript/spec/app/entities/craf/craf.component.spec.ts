import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { CrafComponent } from 'app/entities/craf/craf.component';
import { CrafService } from 'app/entities/craf/craf.service';
import { Craf } from 'app/shared/model/craf.model';

describe('Component Tests', () => {
  describe('Craf Management Component', () => {
    let comp: CrafComponent;
    let fixture: ComponentFixture<CrafComponent>;
    let service: CrafService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CrafComponent],
      })
        .overrideTemplate(CrafComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrafComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrafService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Craf(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.crafs && comp.crafs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
