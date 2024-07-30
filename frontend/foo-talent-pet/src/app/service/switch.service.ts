import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  private visibilitysubject = new BehaviorSubject<boolean>(false);
  visibility$ = this.visibilitysubject.asObservable();

  toggleVisibility(){
    this.visibilitysubject.next(!this.visibilitysubject.value);
  }

  constructor() { }
}

