import { Component } from '@angular/core';
import { CMS_GALLERY } from '@states/images/gallery.types';

@Component({
  selector: 'admin-store-images',
  templateUrl: 'admin-store-images.component.html',
  styleUrls: [`admin-store-images.component.scss`]
})
export class AdminStoreImagesComponent {
  gallery = CMS_GALLERY.store;
  title = 'Store Image Gallery';
}
