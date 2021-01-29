import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AcautelamentoService } from 'app/entities/acautelamento/acautelamento.service';
import { IAcautelamento, Acautelamento } from 'app/shared/model/acautelamento.model';

describe('Service Tests', () => {
  describe('Acautelamento Service', () => {
    let injector: TestBed;
    let service: AcautelamentoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAcautelamento;
    let expectedResult: IAcautelamento | IAcautelamento[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AcautelamentoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Acautelamento(0, 'AAAAAAA', currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            dataHoraDevolucao: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Acautelamento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            dataHoraDevolucao: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
            dataHoraDevolucao: currentDate,
          },
          returnedFromService
        );

        service.create(new Acautelamento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Acautelamento', () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            dataHoraDevolucao: currentDate.format(DATE_TIME_FORMAT),
            obs: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
            dataHoraDevolucao: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Acautelamento', () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            dataHoraDevolucao: currentDate.format(DATE_TIME_FORMAT),
            obs: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
            dataHoraDevolucao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Acautelamento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
