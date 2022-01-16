import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';
import { AdminPostListComponent } from './list/admin-post-list.component';
import { AdminPostEditComponent } from './edit/admin-post-edit.component';


import { AdminPostListResolver } from './list/admin-post-list.resolver';
import { AdminPostCreateResolver } from './create/admin-post-create.resolver';
import { AdminPostEditResolver } from './edit/admin-post-edit.resolver';

export function getComponents() {
  return [
    AdminPostComponent,
    AdminPostCreateComponent,
    AdminPostEditComponent,
    AdminPostListComponent
  ]
}

export function getProviders() {
  return [
    AdminPostListResolver,
    AdminPostCreateResolver,
    AdminPostEditResolver
  ]
}
