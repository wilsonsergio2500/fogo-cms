import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from, of, merge } from 'rxjs';
import { FirebasePaginationStateModel } from '@firebase-module/types/firebase-pagination';
import { ListingFireStore } from './schema/listing.firebase';
import { IListingFirebaseModel } from './schema/listing.schema';
import { IListingStateModel } from './listing.model';
import { ListingSetAsLoadingAction, ListingSetAsDoneAction, ListingRemoveAction, ListingGetByIdAction, ListingLoadFirstPageAction, ListingLoadNextPageAction, ListingLoadPreviousPageAction,  ListingMergeAction, ListingMergeDealsAction, ListingMergeCategoryAction, ListingRemoveDealsAction, ListingSetCategoryAction } from './listing.actions';
import { tap, mergeMap, delay, filter, finalize, catchError } from 'rxjs/operators';
import { Logger } from '@appUtils/logger';


@State<IListingStateModel>({
    name: 'listingState',
    defaults: <IListingStateModel>{
        loading: false,
        paginationState: new FirebasePaginationStateModel<IListingFirebaseModel>(),
        currentId: null,
        current: null,
        selected: null
    }
})
@Injectable()
export class StoreProductListingState {
    
    private schemas: ListingFireStore;
    private subscription: Subscription;
    constructor(
        angularFireStore: AngularFirestore
    ){
      this.schemas = new ListingFireStore(angularFireStore);
    }

  @Selector()
  static IsLoading(state: IListingStateModel) : boolean {
    return state.loading;
  }

  @Selector()
  static getPage(state: IListingStateModel) : IListingFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getPageSize(state: IListingStateModel) : number {
    return state.paginationState.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: IListingStateModel) : number {
    return state.paginationState.items.length;
  }

  @Selector()
  static getNextEnabled(state: IListingStateModel) : boolean {
    return state.paginationState.next;
  }
  @Selector()
  static getPreviousEnabled(state: IListingStateModel) : boolean {
    return state.paginationState.prev;
  }
  @Selector()
  static IsPaginatorEnabled(state: IListingStateModel): boolean {
    return state.paginationState.prev || state.paginationState.next;
  }

  @Selector()
  static getCurrent(state: IListingStateModel) : IListingFirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: IListingStateModel) : IListingFirebaseModel {
    return state.selected;
  }

  @Action(ListingSetAsDoneAction)
 onDone(ctx: StateContext<IListingStateModel>) {
    ctx.patchState({
        loading: false
    });
  }
  @Action(ListingSetAsLoadingAction)
  onLoading(ctx: StateContext<IListingStateModel>) {
    ctx.patchState({
        loading: true
    });
  }

  @Action(ListingMergeAction)
  onMergeToListings(ctx: StateContext<IListingStateModel>, action: ListingMergeAction) {
    return ctx.dispatch(
      [
        new ListingMergeCategoryAction(action.request),
        new ListingMergeDealsAction(action.request)
      ]
    );
  }

  @Action(ListingMergeCategoryAction)
  onMergeCategory(ctx: StateContext<IListingStateModel>, action: ListingMergeCategoryAction) {
    const { category, Id, publish } = action.request;
    if (publish) {
      return from(this.schemas.merge(`categories/${category}/${Id}`, action.request));
    } else {
      return ctx.dispatch(new ListingRemoveAction(action.request));
    }
  }

  @Action(ListingMergeDealsAction)
  onMergeDeals(ctx: StateContext<IListingStateModel>, action: ListingMergeDealsAction) {
    const { category, Id, deal } = action.request;
    if (deal) {
      return merge(
        from(this.schemas.merge(`deals/all/${Id}`, action.request)),
        from(this.schemas.merge(`deals/${category}/${Id}`, action.request))
      );
    }
    else {
      return ctx.dispatch(new ListingRemoveDealsAction(action.request));
    }
  }

  @Action(ListingRemoveDealsAction)
  onRemoveDeals(ctx: StateContext<IListingStateModel>, action: ListingRemoveDealsAction) {
    const { category, Id } = action.request;
    return merge(
      from(this.schemas.delete(`deals/all/${Id}`)),
      from(this.schemas.delete(`deals/${category}/${Id}`))
    );
  }

  @Action(ListingRemoveAction)
  onRemove(ctx: StateContext<IListingStateModel>, action: ListingRemoveAction) {
    const { category, Id, deal } = action.request;
    return from(this.schemas.delete(`categories/${category}/${Id}`)).pipe(
      tap(() => {
        if (deal) {
          ctx.dispatch(new ListingRemoveDealsAction(action.request));
        }
      })
    );
  }

  @Action(ListingSetCategoryAction)
  onSetCategory(ctx: StateContext<IListingStateModel>, action: ListingSetCategoryAction) {
    const { category } = action;
    ctx.patchState({ category });
    return ctx.dispatch(new ListingLoadFirstPageAction());
  }

  @Action(ListingLoadFirstPageAction)
  onGoToFirstPage(ctx: StateContext<IListingStateModel>) {
    const { paginationState, category  } = ctx.getState();
    const { pageSize, orderByField, begining } = paginationState;
    ctx.dispatch(new ListingSetAsLoadingAction());
    return this.schemas.queryPath("categories", category, ref => ref.limit(pageSize).orderBy(orderByField, 'desc'))
      .get().pipe(
        filter(models => !!models.docs?.length),
        tap(models => {
          const currentSize = models.docs.length;
          const next = currentSize === pageSize;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          const pagination_count = 0;
          const prev = pagination_count != 0;
          const prev_start_at = [first];
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Listing[Page:${pagination_count + 1}]`, items);
        }),
        finalize(() => ctx.dispatch(new ListingSetAsDoneAction()))
      )
  }

  @Action(ListingLoadNextPageAction)
  onNextPage(ctx: StateContext<IListingStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
    return this.schemas.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
      .get().pipe(
        tap(models => {
          const currentSize = models.docs.length;
          let next = currentSize === pageSize;
          const prev = true;
          if (!currentSize) {
            next = false;
            return;
          }
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count++;
          const prevStartAt = [...prev_start_at, first];
          const newPaginationState = { ...paginationState, next, first, last, items, pagination_count, prev_start_at: prevStartAt, prev };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Listing[Page:${pagination_count + 1}]`, items);

        })
        , catchError(error => {
          const newPaginationState = { ...paginationState, next: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      );
  }

  @Action(ListingLoadPreviousPageAction)
  onPreviousPage(ctx: StateContext<IListingStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
    return this.schemas.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
      .get().pipe(
        tap(models => {
          const next = true;
          const currentSize = models.docs.length;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count--;
          const prev = pagination_count != 0;
          prev_start_at = prev_start_at.slice(0, prev_start_at.length - 1);
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Listing[Page:${pagination_count + 1}]`, items);
        }),
        catchError(error => {
          const newPaginationState = { ...paginationState, prev: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      )
  }

}
