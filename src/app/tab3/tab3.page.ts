import { Component, Input } from "@angular/core";
import { UpcService } from "../api/upc.service";
import { ApiResponse } from "../model/api_response";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  code: string = "";
  apiData?: ApiResponse;

  paletteToggle = false;

  constructor(private upcService: UpcService) {}

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches),
    );
  }

  fetchData() {
    if (this.code) {
      this.upcService.getData(this.code).subscribe({
        next: (data) => {
          this.apiData = data;
        },
        error: (error) => {
          console.error("Error:", error);
        },
      });
    } else {
      console.warn("Please enter a parameter.");
    }
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  }
}
