import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { getImageModuleComponents } from './elements';
import { ImagesMangerResolver } from './images-manager/images-manager.resolver';

@NgModule({
  declarations: [
    ...getImageModuleComponents()
  ],
  providers: [
    ImagesMangerResolver
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    FirebaseModule,
    MaterialComponentsModule,
  ]
})
export class ImagesModule { }
