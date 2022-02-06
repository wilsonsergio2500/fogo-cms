import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCartRoutingModule } from './store-cart.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '@customComponents/components.module';
import { FirebaseModule } from '@firebase-module/firebase.module';
import { SharedModule } from '../../../shared.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { getComponents, getProviders } from './element';

@NgModule({
  declarations:[
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
    StoreCartRoutingModule,
  ]
})
export class StoreCartModule { }
