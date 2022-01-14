import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '@customComponents/components.module';
import { SharedModule } from '../../../../shared.module';
import { FirebaseModule } from '../../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../../materialcomponents.module';
import { AdminStoreCategoriesRoutingModule } from './admin-store-categories.routing.module';
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
    AdminStoreCategoriesRoutingModule
  ]
})
export class AdminStoreCategoriesModule { }
