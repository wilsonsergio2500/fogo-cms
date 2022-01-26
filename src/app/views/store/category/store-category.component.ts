import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
    selector: 'store-category',
    templateUrl: 'store-category.component.html',
    styleUrls: [`store-category.component.scss`]
  })
  export class StoreCategoryComponent {
   

    constructor(private store: Store) {}
  
   
  
  } 
