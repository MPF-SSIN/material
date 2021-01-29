import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoMaterialComponentsPage, TipoMaterialDeleteDialog, TipoMaterialUpdatePage } from './tipo-material.page-object';

const expect = chai.expect;

describe('TipoMaterial e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoMaterialComponentsPage: TipoMaterialComponentsPage;
  let tipoMaterialUpdatePage: TipoMaterialUpdatePage;
  let tipoMaterialDeleteDialog: TipoMaterialDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoMaterials', async () => {
    await navBarPage.goToEntity('tipo-material');
    tipoMaterialComponentsPage = new TipoMaterialComponentsPage();
    await browser.wait(ec.visibilityOf(tipoMaterialComponentsPage.title), 5000);
    expect(await tipoMaterialComponentsPage.getTitle()).to.eq('ssinApp.tipoMaterial.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoMaterialComponentsPage.entities), ec.visibilityOf(tipoMaterialComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoMaterial page', async () => {
    await tipoMaterialComponentsPage.clickOnCreateButton();
    tipoMaterialUpdatePage = new TipoMaterialUpdatePage();
    expect(await tipoMaterialUpdatePage.getPageTitle()).to.eq('ssinApp.tipoMaterial.home.createOrEditLabel');
    await tipoMaterialUpdatePage.cancel();
  });

  it('should create and save TipoMaterials', async () => {
    const nbButtonsBeforeCreate = await tipoMaterialComponentsPage.countDeleteButtons();

    await tipoMaterialComponentsPage.clickOnCreateButton();

    await promise.all([tipoMaterialUpdatePage.setNomeInput('nome')]);

    expect(await tipoMaterialUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');

    await tipoMaterialUpdatePage.save();
    expect(await tipoMaterialUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoMaterialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoMaterial', async () => {
    const nbButtonsBeforeDelete = await tipoMaterialComponentsPage.countDeleteButtons();
    await tipoMaterialComponentsPage.clickOnLastDeleteButton();

    tipoMaterialDeleteDialog = new TipoMaterialDeleteDialog();
    expect(await tipoMaterialDeleteDialog.getDialogTitle()).to.eq('ssinApp.tipoMaterial.delete.question');
    await tipoMaterialDeleteDialog.clickOnConfirmButton();

    expect(await tipoMaterialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
