import { Component, runInInjectionContext } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint} from '@capacitor/barcode-scanner'

import { Platform } from '@ionic/angular';
import { AppStorageService } from '../app-storage.service';
import { BARCODE_HISTORY } from '../app.constants';
import { Barcode } from '../model/barcode';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scanResult = ''
  barcodeArray: Array<Barcode> = []

  constructor(
    private platform: Platform,
    private appStorage: AppStorageService
  ) {}

  async scanBarcode() {
    console.log('scan')

    let scanResult = ''

    if(this.platform.is('android') || this.platform.is('ios')) {
      // native barcode scanner
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      console.log(result);
      scanResult = result.ScanResult
    } else {
      scanResult = Math.floor(10000000 + Math.random() * 90000000).toString()
    }

    // display scan result on UI
    this.scanResult = scanResult
    const now = new Date();
    const myBarcode = new Barcode(now, scanResult);
    this.barcodeArray.unshift(myBarcode)

    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const myBarcodeDayAgo = new Barcode(oneDayAgo, scanResult);
    this.barcodeArray.unshift(myBarcodeDayAgo)

    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const myBarcodeTwoDaysAgo = new Barcode(twoDaysAgo, scanResult);
    this.barcodeArray.unshift(myBarcodeTwoDaysAgo)

    this.appStorage.set(BARCODE_HISTORY, this.barcodeArray)
  }

}
