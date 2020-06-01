import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        // checking error of observable to check observable.error
        // if (count > 2) {
        //   observer.complete();
        // }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }

        count++;
      }, 1000);
    });


    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => `Round is ${data + 1}`))
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error);
      }, () => {
        console.log('observable completed');

      });

  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
