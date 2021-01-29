import { element, by, ElementFinder } from 'protractor';

export class AcautelamentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-acautelamento div table .btn-danger'));
  title = element.all(by.css('jhi-acautelamento div h2#page-heading span')).first();
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

export class AcautelamentoUpdatePage {
  pageTitle = element(by.id('jhi-acautelamento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numeroInput = element(by.id('field_numero'));
  dataHoraInput = element(by.id('field_dataHora'));
  dataHoraDevolucaoInput = element(by.id('field_dataHoraDevolucao'));
  obsInput = element(by.id('field_obs'));

  acautelanteSelect = element(by.id('field_acautelante'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setDataHoraInput(dataHora: string): Promise<void> {
    await this.dataHoraInput.sendKeys(dataHora);
  }

  async getDataHoraInput(): Promise<string> {
    return await this.dataHoraInput.getAttribute('value');
  }

  async setDataHoraDevolucaoInput(dataHoraDevolucao: string): Promise<void> {
    await this.dataHoraDevolucaoInput.sendKeys(dataHoraDevolucao);
  }

  async getDataHoraDevolucaoInput(): Promise<string> {
    return await this.dataHoraDevolucaoInput.getAttribute('value');
  }

  async setObsInput(obs: string): Promise<void> {
    await this.obsInput.sendKeys(obs);
  }

  async getObsInput(): Promise<string> {
    return await this.obsInput.getAttribute('value');
  }

  async acautelanteSelectLastOption(): Promise<void> {
    await this.acautelanteSelect.all(by.tagName('option')).last().click();
  }

  async acautelanteSelectOption(option: string): Promise<void> {
    await this.acautelanteSelect.sendKeys(option);
  }

  getAcautelanteSelect(): ElementFinder {
    return this.acautelanteSelect;
  }

  async getAcautelanteSelectedOption(): Promise<string> {
    return await this.acautelanteSelect.element(by.css('option:checked')).getText();
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

export class AcautelamentoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-acautelamento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-acautelamento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
