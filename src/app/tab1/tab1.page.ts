import { Component, runInInjectionContext } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint} from '@capacitor/barcode-scanner'

import { Platform } from '@ionic/angular';
import { AppStorageService } from '../app-storage.service';
import { BARCODE_HISTORY } from '../app.constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scanResult = ''
  barcodeArray: Array<string> = []

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
    this.barcodeArray.unshift(scanResult)

    this.appStorage.set(BARCODE_HISTORY, JSON.stringify(this.barcodeArray))
  }

}
