import { Component, ViewChild, ElementRef, Input, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of, Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'ngx-chips',
  templateUrl: 'ngx-chips.component.html',
  styleUrls: ['ngx-chips.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxChipsComponent),
    multi: true
  }],
})
export class NgxChipsComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() placeholder: string = 'Add elements..';
  @Input() optionLabel: string = null;
  @Input() optionKey: string = null;
  @Input() options: Observable<any[]> = of([]);
  @Input() forceOptionValue: boolean = false;
  @Input() maxItems: number = null;


  _options: any[]
  _disable: boolean = false;
  _array: any[] = [];
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  propagateChange = (_: any) => ({});
  propagateTouched = () => ({});

  @ViewChild('elementInput', { static: false }) elementInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  onOptions$: Subscription;

  constructor() {
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if (!!value) {

        if (!!this.optionLabel && !!this.optionKey) {
          const exist = this._array.find(g => (g[this.optionLabel] as string).toLowerCase() === value.toLowerCase());
          if (!exist) {
            const option = this._options.find(x => (x[this.optionLabel] as string).toLowerCase() === value.toLowerCase());
            if (option) {
              this.addItem(option);
            }
          }

        } else {

          const exist = this._array.find(g => (g as string).toLowerCase() === value.toLowerCase());
          if (!exist) {
            if (this.forceOptionValue) {
              const option = this._options.find(g => (g as string).toLowerCase() === value.toLowerCase());
              if (option) {
                this.addItem(option);
              }
            } else {
              this.addItem(value);
            }
          }

        }
      }

      this.propagateChange(this._array);
      this.propagateTouched();
      this.markInputAsEmpty();

    }

  }

  addItem(item: any) {
    if (this.maxItems) {
      if (this._array.length < +this.maxItems) {
        this._array.push(item);
      }
    } else {
      this._array.push(item);
    }

  }

  markInputAsEmpty() {
    this.elementInput.nativeElement.value = '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    const value = event.option.viewValue;

    if (!!this.optionLabel && !!this.optionKey) {

      const exist = this._array.find(g => (g[this.optionLabel] as string).toLowerCase() === value.toLowerCase());
      if (!exist) {
        const option = this._options.find(x => (x[this.optionLabel] as string).toLowerCase() === value.toLowerCase());
        if (option) {
          this._array.push(option);
        }
      }

    } else {

      const exist = this._array.find(g => (g as string).toLowerCase() === value.toLowerCase());
      if (!exist) {
        if (this.forceOptionValue) {
          const option = this._options.find(g => (g as string).toLowerCase() === value.toLowerCase());
          if (option) {
            this._array.push(option);
          }
        } else {
          this._array.push(value);
        }
      }

    }

    this.propagateChange(this._array);
    this.propagateTouched();
    this.markInputAsEmpty();

  }


  remove(obj: any): void {
    if (!!this.optionKey) {
      const filtered = this._array.filter(g => g[this.optionKey] != obj[this.optionKey]);
      this._array = filtered;
      this.propagateChange(this._array);
      this.propagateTouched();
    } else {
      const filtered = this._array.filter(g => g != obj);
      this._array = filtered;
      this.propagateChange(this._array);
      this.propagateTouched();
    }
  }

  label(obj: any) {
    if (!!this.optionLabel) {
      return obj[this.optionLabel];
    } else {
      return obj;
    }
  }



  writeValue(values: any[]): void {
    if (!!values) {
      this._array = values;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disable = isDisabled;
    this.removable = false;
  }

  ngOnInit() {
    this.onOptions$ = this.options.subscribe(x => this._options = x);
  }
  ngOnDestroy() {
    if (this.onOptions$) {
      this.onOptions$.unsubscribe();
    }
  }
}
