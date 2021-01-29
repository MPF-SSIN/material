import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MaterialComponentsPage, MaterialDeleteDialog, MaterialUpdatePage } from './material.page-object';

const expect = chai.expect;

describe('Material e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materialComponentsPage: MaterialComponentsPage;
  let materialUpdatePage: MaterialUpdatePage;
  let materialDeleteDialog: MaterialDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Materials', async () => {
    await navBarPage.goToEntity('material');
    materialComponentsPage = new MaterialComponentsPage();
    await browser.wait(ec.visibilityOf(materialComponentsPage.title), 5000);
    expect(await materialComponentsPage.getTitle()).to.eq('ssinApp.material.home.title');
    await browser.wait(ec.or(ec.visibilityOf(materialComponentsPage.entities), ec.visibilityOf(materialComponentsPage.noResult)), 1000);
  });

  it('should load create Material page', async () => {
    await materialComponentsPage.clickOnCreateButton();
    materialUpdatePage = new MaterialUpdatePage();
    expect(await materialUpdatePage.getPageTitle()).to.eq('ssinApp.material.home.createOrEditLabel');
    await materialUpdatePage.cancel();
  });

  it('should create and save Materials', async () => {
    const nbButtonsBeforeCreate = await materialComponentsPage.countDeleteButtons();

    await materialComponentsPage.clickOnCreateButton();

    await promise.all([
      materialUpdatePage.setNomeInput('nome'),
      materialUpdatePage.setDescricaoInput('descricao'),
      materialUpdatePage.setMarcaInput('marca'),
      materialUpdatePage.setValorInput('5'),
      materialUpdatePage.situacaoSelectLastOption(),
      materialUpdatePage.setSerieInput('serie'),
      materialUpdatePage.setLoteInput('lote'),
      materialUpdatePage.setTamanhoInput('tamanho'),
      materialUpdatePage.tipoMaterialSelectLastOption(),
      materialUpdatePage.tipoArmaSelectLastOption(),
      materialUpdatePage.calibreSelectLastOption(),
      materialUpdatePage.fornecedorSelectLastOption(),
    ]);

    expect(await materialUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await materialUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');
    expect(await materialUpdatePage.getMarcaInput()).to.eq('marca', 'Expected Marca value to be equals to marca');
    expect(await materialUpdatePage.getValorInput()).to.eq('5', 'Expected valor value to be equals to 5');
    expect(await materialUpdatePage.getSerieInput()).to.eq('serie', 'Expected Serie value to be equals to serie');
    expect(await materialUpdatePage.getLoteInput()).to.eq('lote', 'Expected Lote value to be equals to lote');
    expect(await materialUpdatePage.getTamanhoInput()).to.eq('tamanho', 'Expected Tamanho value to be equals to tamanho');

    await materialUpdatePage.save();
    expect(await materialUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await materialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Material', async () => {
    const nbButtonsBeforeDelete = await materialComponentsPage.countDeleteButtons();
    await materialComponentsPage.clickOnLastDeleteButton();

    materialDeleteDialog = new MaterialDeleteDialog();
    expect(await materialDeleteDialog.getDialogTitle()).to.eq('ssinApp.material.delete.question');
    await materialDeleteDialog.clickOnConfirmButton();

    expect(await materialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
