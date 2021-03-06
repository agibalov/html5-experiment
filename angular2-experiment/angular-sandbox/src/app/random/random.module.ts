import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppIfDirective} from './app-if.directive';
import {AppRepeatDirective} from './app-repeat.directive';
import {ModalService} from './modal.service';
import {ModalComponent} from './modal.component';
import {RandomPageComponent} from './random-page.component';
import {RouterModule} from '@angular/router';
import {DEMO_PAGE, DemoPage} from '../demo-page';

@NgModule({
  declarations: [
    RandomPageComponent,
    AppIfDirective,
    AppRepeatDirective,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'random', component: RandomPageComponent }
    ])
  ],
  providers: [
    ModalService,
    {
      provide: DEMO_PAGE,
      multi: true,
      useValue: <DemoPage>{
        title: 'Random',
        routerLink: 'random'
      }
    }
  ]
})
export class RandomModule { }
