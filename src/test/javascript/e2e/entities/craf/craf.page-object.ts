import { element, by, ElementFinder } from 'protractor';

export class CrafComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-craf div table .btn-danger'));
  title = element.all(by.css('jhi-craf div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CrafUpdatePage {
  pageTitle = element(by.id('jhi-craf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numeroInput = element(by.id('field_numero'));
  dataEmissaoInput = element(by.id('field_dataEmissao'));
  dataValidadeInput = element(by.id('field_dataValidade'));

  armaSelect = element(by.id('field_arma'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setDataEmissaoInput(dataEmissao: string): Promise<void> {
    await this.dataEmissaoInput.sendKeys(dataEmissao);
  }

  async getDataEmissaoInput(): Promise<string> {
    return await this.dataEmissaoInput.getAttribute('value');
  }

  async setDataValidadeInput(dataValidade: string): Promise<void> {
    await this.dataValidadeInput.sendKeys(dataValidade);
  }

  async getDataValidadeInput(): Promise<string> {
    return await this.dataValidadeInput.getAttribute('value');
  }

  async armaSelectLastOption(): Promise<void> {
    await this.armaSelect.all(by.tagName('option')).last().click();
  }

  async armaSelectOption(option: string): Promise<void> {
    await this.armaSelect.sendKeys(option);
  }

  getArmaSelect(): ElementFinder {
    return this.armaSelect;
  }

  async getArmaSelectedOption(): Promise<string> {
    return await this.armaSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CrafDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-craf-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-craf'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
