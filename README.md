# rxjs-min-max

RxJs Operators for emits minimum/maximum value on each iteration.

[![NPM](https://nodei.co/npm/rxjs-min-max.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rxjs-min-max/)

# Example

  ```javascript
    import { maxStream, maxStream } from 'rxjs-min-max'

    of(1, 1, 2, 2, 2, 0, 1, 2, 3, -1, 4).pipe(
      maxStream(),
    )
    .subscribe(x => console.log(x)); // 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4

    of<Person>(
      { age: 4, name: 'Foo'},
      { age: 7, name: 'Bar'},
      { age: 3, name: 'Foo'},
      { age: 6, name: 'Foo'},
    ).pipe(
      minStream((p: Person, q: Person) => p.age > q.age),
    )
    .subscribe(x => console.log(x));
 
    // displays:
    // { age: 4, name: 'Foo' }
    // { age: 4, name: 'Foo' }
    // { age: 3, name: 'Foo'},
    // { age: 3, name: 'Foo'},
 
  ```