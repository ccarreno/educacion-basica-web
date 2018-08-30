import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { BodyComponent } from './components/layout/body/body.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SumarComponent } from './components/sumar/sumar.component';
import { RestarComponent } from './components/restar/restar.component';
import { MultiplicarComponent } from './components/multiplicar/multiplicar.component';
import { DividirComponent } from './components/dividir/dividir.component';
import { ArticulosComponent } from './components/lenguaje/articulos/articulos.component';
import { AdjetivosComponent } from './components/lenguaje/adjetivos/adjetivos.component';
import { PronombresComponent } from './components/lenguaje/pronombres/pronombres.component';
import { SustantivosComponent } from './components/lenguaje/sustantivos/sustantivos.component';
import { VerbosComponent } from './components/lenguaje/verbos/verbos.component';
import { VertebradosComponent } from './components/ciencias-naturales/vertebrados/vertebrados.component';
import { InvertebradosComponent } from './components/ciencias-naturales/invertebrados/invertebrados.component';

import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    SumarComponent,
    RestarComponent,
    MultiplicarComponent,
    DividirComponent,
    ArticulosComponent,
    AdjetivosComponent,
    PronombresComponent,
    VerbosComponent,
    VertebradosComponent,
    InvertebradosComponent,
    SustantivosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
