import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { AppComponent } from './app.component';
import { ApiService } from './api/api.service'; // Ajusta la ruta si es necesario

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule // Agrega HttpClientModule a los imports
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }