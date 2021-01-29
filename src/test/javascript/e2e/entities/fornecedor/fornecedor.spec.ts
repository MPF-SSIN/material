import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FornecedorComponentsPage, FornecedorDeleteDialog, FornecedorUpdatePage } from './fornecedor.page-object';

const expect = chai.expect;

describe('Fornecedor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fornecedorComponentsPage: FornecedorComponentsPage;
  let fornecedorUpdatePage: FornecedorUpdatePage;
  let fornecedorDeleteDialog: FornecedorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fornecedors', async () => {
    await navBarPage.goToEntity('fornecedor');
    fornecedorComponentsPage = new FornecedorComponentsPage();
    await browser.wait(ec.visibilityOf(fornecedorComponentsPage.title), 5000);
    expect(await fornecedorComponentsPage.getTitle()).to.eq('ssinApp.fornecedor.home.title');
    await browser.wait(ec.or(ec.visibilityOf(fornecedorComponentsPage.entities), ec.visibilityOf(fornecedorComponentsPage.noResult)), 1000);
  });

  it('should load create Fornecedor page', async () => {
    await fornecedorComponentsPage.clickOnCreateButton();
    fornecedorUpdatePage = new FornecedorUpdatePage();
    expect(await fornecedorUpdatePage.getPageTitle()).to.eq('ssinApp.fornecedor.home.createOrEditLabel');
    await fornecedorUpdatePage.cancel();
  });

  it('should create and save Fornecedors', async () => {
    const nbButtonsBeforeCreate = await fornecedorComponentsPage.countDeleteButtons();

    await fornecedorComponentsPage.clickOnCreateButton();

    await promise.all([fornecedorUpdatePage.setNomeInput('nome'), fornecedorUpdatePage.setCnpjInput('54.6449742542-04')]);

    expect(await fornecedorUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await fornecedorUpdatePage.getCnpjInput()).to.eq('54.6449742542-04', 'Expected Cnpj value to be equals to 54.6449742542-04');

    await fornecedorUpdatePage.save();
    expect(await fornecedorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fornecedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Fornecedor', async () => {
    const nbButtonsBeforeDelete = await fornecedorComponentsPage.countDeleteButtons();
    await fornecedorComponentsPage.clickOnLastDeleteButton();

    fornecedorDeleteDialog = new FornecedorDeleteDialog();
    expect(await fornecedorDeleteDialog.getDialogTitle()).to.eq('ssinApp.fornecedor.delete.question');
    await fornecedorDeleteDialog.clickOnConfirmButton();

    expect(await fornecedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
