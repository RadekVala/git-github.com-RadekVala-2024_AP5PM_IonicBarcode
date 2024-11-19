import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpcService } from "../api/upc.service";
import { ApiResponse } from "../model/api_response";

@Component({
  selector: "app-code-detail",
  templateUrl: "./code-detail.page.html",
  styleUrls: ["./code-detail.page.scss"],
})
export class CodeDetailPage implements OnInit {
  code: string | null = null;
  apiData?: ApiResponse;

  constructor(
    private route: ActivatedRoute,
    private upcService: UpcService,
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("id");

    if (this.code) {
      let unwrappedCode = this.code;

      this.upcService.getData(unwrappedCode).subscribe({
        next: (data) => {
          this.apiData = data;
          console.log("Cleaned JSON:", data);
        },
        error: (error) => {
          console.error("Error data:", error);
        },
      });
    }
  }
}
