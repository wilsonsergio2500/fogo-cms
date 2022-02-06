import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '@customComponents/components.module';
import { SharedModule } from '../../shared.module';
import { FirebaseModule } from '@firebase-module/firebase.module';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { getComponents, getProviders } from './elements';


@NgModule({
  declarations: [
    ...getComponents()
  ],
  providers: [
    ...getProviders()
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    FirebaseModule,
    MaterialComponentsModule,
    StoreRoutingModule,

  ]
})
export class StoreModule { }
