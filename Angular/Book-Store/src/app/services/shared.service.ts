import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
    
export class SharedService {
  isLoggedIn = new BehaviorSubject(false);

  setLogged(data) {
    this.isLoggedIn.next(data);
  }
}
