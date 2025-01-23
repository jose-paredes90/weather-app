import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, NavbarComponent, ConfirmationComponent, WeatherResultComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MATERIAL } from './material';
import { provideClientHydration } from '@angular/platform-browser';


@NgModule({
  declarations: [
    WeatherResultComponent,
    DataTableComponent, ConfirmationComponent, NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL
  ],
  exports: [
    DataTableComponent,
    ConfirmationComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL,
    WeatherResultComponent
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class SharedModule { }
