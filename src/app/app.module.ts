import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateBugComponent } from './update-bug/update-bug.component';
import { GetBugComponent } from './get-bug/get-bug.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBugComponent,
    HeaderComponent,
    FooterComponent,
    UpdateBugComponent,
    GetBugComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
