import { Component } from '@angular/core';
import { AppStorageService } from '../app-storage.service';
import { BARCODE_HISTORY } from '../app.constants';
import { Barcode } from '../model/barcode';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  barcodeArray: Barcode[] = []

  constructor(
    private appStorage: AppStorageService
  ) {}

  async ionViewDidEnter () {
    const data = await this.appStorage.get(BARCODE_HISTORY)

    if (data) {
      this.barcodeArray = data
    }
  }

  deleteBarcode(barcode: Barcode){
    const index = this.barcodeArray.indexOf(barcode)

    if( index > -1) {
      this.barcodeArray.splice(index, 1)
      this.appStorage.set(BARCODE_HISTORY, this.barcodeArray)
    }
  }

}
