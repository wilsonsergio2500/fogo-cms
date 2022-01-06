import { AdminStoreComponent } from "./admin-store.component";
import { AdminStoreImagesComponent } from "./images/admin-store-images.component";
import { AdminStoreImagesResolver } from "./images/admin-store-images.resolver";

export function getComponents() {
  return [
    AdminStoreComponent,
    AdminStoreImagesComponent
  ];
}

export function getProviders() {
  return [
    AdminStoreImagesResolver
  ]
}
