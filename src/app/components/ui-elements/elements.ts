import { CheckAnimationComponent } from './check-animation/check-animation.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { FirebasePaginationComponent } from './firebase-pagination/firebase-pagination.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { getLoadingButtonComponents } from './loading-button/elements';
import { getSnackBarStatusComponents, getSnackBarStatusProviders } from './snackbar-status/elements';
import { getConfirmationDialogEntryComponents, getConfirmationDialogProviders } from './confirmation-dialog/elements';
import { getToolbarNavigationComponents } from './toolbar-navigation/elements';
import { getSideNavigationComponents } from './side-navigation/elements';

export function getCustomUiElements() {
  return [
    CheckAnimationComponent,
    LoadingPanelComponent,
    FirebasePaginationComponent,
    ...getToolbarNavigationComponents(),
    ...getLoadingButtonComponents(),
    ...getSnackBarStatusComponents(),
    ...getConfirmationDialogEntryComponents(),
    ...getSideNavigationComponents(),
    ProductPreviewComponent,
    ProductViewComponent
  ];
}

export function getCustomUiElementsProviders() {
  return [
    ...getSnackBarStatusProviders(),
    ...getConfirmationDialogProviders()
  ];
}

export function getCustomUiElementsEntryComponents() {
  return [
    ...getSnackBarStatusComponents(),
    ...getConfirmationDialogEntryComponents()
  ];
}
