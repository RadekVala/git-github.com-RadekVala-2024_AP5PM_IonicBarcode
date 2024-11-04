import { Component } from "@angular/core";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";

import { Platform } from "@ionic/angular";
import { AppStorageService } from "../app-storage.service";
import { BARCODE_HISTORY } from "../app.constants";
import { Barcode } from "../model/barcode";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  scanResult = "";
  barcodeArray: Array<Barcode> = [];

  constructor(
    private platform: Platform,
    private appStorage: AppStorageService,
  ) {}

  async ionViewDidEnter() {
    const data = await this.appStorage.get(BARCODE_HISTORY);

    if (data) {
      this.barcodeArray = data;
    } else {
      this.generateSomeMockData();
    }
  }

  async scanBarcode() {
    // log to console to know, click event handler works
    console.log("scan");

    // lets have an empty variable for result of scanning
    let scanResult = "";

    if (this.platform.is("android") || this.platform.is("ios")) {
      // if plarform is Android or iOS - native barcode scanner functionality
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      });
      scanResult = result.ScanResult;
    } else {
      // if we are on web browser, generate some code for testing
      scanResult = this.generateRandomCode();
    }

    // display scan result on UI - set it to class "state" property displayed on UI
    this.scanResult = scanResult;

    // create a Barcode object
    const myBarcode = new Barcode(scanResult);

    // store Barcode
    this.saveToStorage(myBarcode);
  }

  /**
   * Generates mock barcode data and stores it in the application storage.
   * Creates 10 mock barcodes with unique codes and dates, adds them to
   * the barcode array, and saves them in persistent storage.
   */
  private generateSomeMockData() {
    const now = new Date(); // Get current date and time

    // Loop to generate 10 mock barcodes with unique dates
    for (let index = 0; index < 10; index++) {
      const date = new Date(now.getTime() - index * 24 * 60 * 60 * 1000); // Set date for each barcode, moving back one day per loop
      const barcode = new Barcode(this.generateRandomCode(), date); // Generate barcode with random code and unique date
      this.barcodeArray.unshift(barcode); // Add barcode to the beginning of the array
    }

    // Save the barcode array to storage for persistence
    this.appStorage.set(BARCODE_HISTORY, this.barcodeArray);
    console.log("Some mock data generated");
  }

  /**
   * Saves a barcode to storage.
   * Adds the barcode to the beginning of the barcode array and stores the array
   * in persistent storage using the storage service.
   *
   * @param barcode - The barcode object to save
   */
  private saveToStorage(barcode: Barcode) {
    this.barcodeArray.unshift(barcode); // Add barcode to the beginning of the array
    this.appStorage.set(BARCODE_HISTORY, this.barcodeArray); // Save updated array to persistent storage
  }

  /**
   * Generates a random 9-digit code as a string.
   * Used to create unique codes for barcode objects.
   *
   * @returns A string containing an 9-digit random code
   */
  private generateRandomCode(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // Generate and return a random 8-digit number as a string
  }
}
