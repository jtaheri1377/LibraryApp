import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteLayoutComponent } from "./site-layout/site-layout.component";
import { FooterComponent } from "./site-layout/components/footer/footer.component";
import { HeaderComponent } from "./site-layout/components/header/header.component";
import { MainComponent } from "./site-layout/components/main/main.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    SiteLayoutComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [SiteLayoutComponent],
})
export class LayoutModule {}
