import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, NavbarComponent, ConfirmationComponent, WeatherResultComponent, LoadingComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MATERIAL } from './material';
import { provideClientHydration } from '@angular/platform-browser';


@NgModule({
  declarations: [
    WeatherResultComponent,
    DataTableComponent, ConfirmationComponent, NavbarComponent, LoadingComponent],
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
    WeatherResultComponent,
    LoadingComponent
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class SharedModule { }
