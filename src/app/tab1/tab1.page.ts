import { Component, runInInjectionContext } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint} from '@capacitor/barcode-scanner'

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scanResult = ''

  constructor(private platform: Platform) {}

  async scanBarcode() {
    console.log('scan')

    let scanResult = ''

    if(this.platform.is('android')) {
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

  }

}
