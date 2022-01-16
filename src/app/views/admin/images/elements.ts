import { ImagesComponent } from "./images.component";
import { ImagesManagerComponent } from "./images-manager/images-manager.component";


import { ImagesMangerResolver } from "./images-manager/images-manager.resolver";


export function getComponents() {
  return [
    ImagesComponent,
    ImagesManagerComponent
  ];
}

export function getProviders() {
  return [
    ImagesMangerResolver
  ];
}
