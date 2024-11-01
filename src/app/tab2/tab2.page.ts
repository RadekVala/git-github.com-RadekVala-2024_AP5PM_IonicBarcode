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

  barcodes: Array<Barcode> = []

  groupedBarcodes: { [key: string]: Barcode[] } = {};


  constructor(
    private appStorage: AppStorageService
  ) {}

  async ionViewDidEnter () {
    const data = await this.appStorage.get(BARCODE_HISTORY)

    if (data) {
      this.barcodes = data
      this.groupBarcodesByDate()
    }
  }

  groupBarcodesByDate() {
    this.groupedBarcodes = this.barcodes.reduce((groups: { [key: string]: Barcode[] }, barcode) => {
      const formattedDate = new Date(barcode.date).toLocaleDateString();
      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }
      groups[formattedDate].unshift(barcode); // Add barcode to the beginning of the group
      return groups;
    }, {});

    const groupedEntries: [string, Barcode[]][] = Object.entries(this.groupedBarcodes)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());



  }

  deleteBarcode(dateKey: string, barcode: Barcode) {
    const barcodes = this.groupedBarcodes[dateKey];
    const index = barcodes.indexOf(barcode);

    if (index > -1) {
      barcodes.splice(index, 1); // Remove the barcode from the list

      // If the date group is empty, delete the key to remove the divider
      if (barcodes.length === 0) {
        delete this.groupedBarcodes[dateKey];
      }
    }
  }

}
