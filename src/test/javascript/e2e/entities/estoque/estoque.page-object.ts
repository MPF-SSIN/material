import { element, by, ElementFinder } from 'protractor';

export class EstoqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-estoque div table .btn-danger'));
  title = element.all(by.css('jhi-estoque div h2#page-heading span')).first();
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

export class EstoqueUpdatePage {
  pageTitle = element(by.id('jhi-estoque-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  quantidadeInput = element(by.id('field_quantidade'));
  localizacaoInput = element(by.id('field_localizacao'));

  materialSelect = element(by.id('field_material'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setQuantidadeInput(quantidade: string): Promise<void> {
    await this.quantidadeInput.sendKeys(quantidade);
  }

  async getQuantidadeInput(): Promise<string> {
    return await this.quantidadeInput.getAttribute('value');
  }

  async setLocalizacaoInput(localizacao: string): Promise<void> {
    await this.localizacaoInput.sendKeys(localizacao);
  }

  async getLocalizacaoInput(): Promise<string> {
    return await this.localizacaoInput.getAttribute('value');
  }

  async materialSelectLastOption(): Promise<void> {
    await this.materialSelect.all(by.tagName('option')).last().click();
  }

  async materialSelectOption(option: string): Promise<void> {
    await this.materialSelect.sendKeys(option);
  }

  getMaterialSelect(): ElementFinder {
    return this.materialSelect;
  }

  async getMaterialSelectedOption(): Promise<string> {
    return await this.materialSelect.element(by.css('option:checked')).getText();
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

export class EstoqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-estoque-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-estoque'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
