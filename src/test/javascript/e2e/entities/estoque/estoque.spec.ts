import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EstoqueComponentsPage, EstoqueDeleteDialog, EstoqueUpdatePage } from './estoque.page-object';

const expect = chai.expect;

describe('Estoque e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estoqueComponentsPage: EstoqueComponentsPage;
  let estoqueUpdatePage: EstoqueUpdatePage;
  let estoqueDeleteDialog: EstoqueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Estoques', async () => {
    await navBarPage.goToEntity('estoque');
    estoqueComponentsPage = new EstoqueComponentsPage();
    await browser.wait(ec.visibilityOf(estoqueComponentsPage.title), 5000);
    expect(await estoqueComponentsPage.getTitle()).to.eq('ssinApp.estoque.home.title');
    await browser.wait(ec.or(ec.visibilityOf(estoqueComponentsPage.entities), ec.visibilityOf(estoqueComponentsPage.noResult)), 1000);
  });

  it('should load create Estoque page', async () => {
    await estoqueComponentsPage.clickOnCreateButton();
    estoqueUpdatePage = new EstoqueUpdatePage();
    expect(await estoqueUpdatePage.getPageTitle()).to.eq('ssinApp.estoque.home.createOrEditLabel');
    await estoqueUpdatePage.cancel();
  });

  it('should create and save Estoques', async () => {
    const nbButtonsBeforeCreate = await estoqueComponentsPage.countDeleteButtons();

    await estoqueComponentsPage.clickOnCreateButton();

    await promise.all([
      estoqueUpdatePage.setQuantidadeInput('5'),
      estoqueUpdatePage.setLocalizacaoInput('localizacao'),
      estoqueUpdatePage.materialSelectLastOption(),
    ]);

    expect(await estoqueUpdatePage.getQuantidadeInput()).to.eq('5', 'Expected quantidade value to be equals to 5');
    expect(await estoqueUpdatePage.getLocalizacaoInput()).to.eq('localizacao', 'Expected Localizacao value to be equals to localizacao');

    await estoqueUpdatePage.save();
    expect(await estoqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await estoqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Estoque', async () => {
    const nbButtonsBeforeDelete = await estoqueComponentsPage.countDeleteButtons();
    await estoqueComponentsPage.clickOnLastDeleteButton();

    estoqueDeleteDialog = new EstoqueDeleteDialog();
    expect(await estoqueDeleteDialog.getDialogTitle()).to.eq('ssinApp.estoque.delete.question');
    await estoqueDeleteDialog.clickOnConfirmButton();

    expect(await estoqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
