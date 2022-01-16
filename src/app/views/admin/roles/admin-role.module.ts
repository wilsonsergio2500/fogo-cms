import { NgModule } from '@angular/core';
import { getComponents, getProviders } from './elements';
import { AdminRoleRoutingModule } from './admin-role.routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '@customComponents/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '@firebase-module/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';

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
    AdminRoleRoutingModule
  ]
})
export class AdminRoleModule { }
