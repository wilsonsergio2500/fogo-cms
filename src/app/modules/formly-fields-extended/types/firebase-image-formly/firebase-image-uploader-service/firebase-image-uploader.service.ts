import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { FirebaseImageUploaderDialogComponent } from '../firebase-image-uploader-dialog/firebase-image-uploader-dialog.component';

export interface IFirebaseImageUploaderDialogParam {
  gallery: string;
}

@Injectable()
export class FirebaseImageUploaderService {

  constructor(
    private matDialog: MatDialog
  ) {}

  OnOpen(params: IFirebaseImageUploaderDialogParam = {gallery: 'images'}) {
    const dialogRef = this.matDialog.open(FirebaseImageUploaderDialogComponent, { panelClass: 'dialog-responsive', disableClose: true, data: params });
    return dialogRef.afterClosed().pipe(filter(path => !!path))
  }

}
