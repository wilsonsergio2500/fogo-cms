import { AdminPageComponent } from './admin-page.component'
import { AdminPageListComponent } from './list/admin-page-list.component';
import { AdminPageCreateComponent } from './create/admin-page-create.component';

import { AdminPageListResolver } from './list/admin-page-list.resolver'
import { AdminPageCreateResolver } from './create/admin-page-create.resolver';
import { AdminPageEditComponent } from './edit/admin-page-edit.component';
import { AdminPageEditResolver } from './edit/admin-page-edit.resolver';


export function getComponents() {
  return [
    AdminPageComponent,
    AdminPageListComponent,
    AdminPageCreateComponent,
    AdminPageEditComponent

  ];
}

export function getProviders() {
  return [
    AdminPageListResolver,
    AdminPageCreateResolver,
    AdminPageEditResolver
  ]
}
