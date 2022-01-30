import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../materialcomponents.module';

import { getCustomUiElements, getCustomUiElementsEntryComponents, getCustomUiElementsProviders } from './ui-elements/elements';
import { getCustomFormElements, getCustomFormEntryComponents } from './form-elements/elements';
import { getPipes } from './pipes/elements';


@NgModule({
  declarations: [
    ...getCustomUiElements(),
    ...getCustomFormElements(),
    ...getPipes()
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  exports: [
    ...getCustomUiElements(),
    ...getCustomFormElements(),
    ...getPipes()
  ],
  providers: [
    ...getCustomUiElementsProviders()
  ],
  entryComponents: [
      ...getCustomUiElementsEntryComponents(),
      ...getCustomFormEntryComponents()
  ]
})
export class CustomComponentsModule {}
