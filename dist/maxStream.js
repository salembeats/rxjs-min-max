"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/**
 * Returns an Observable that emits maximum value on each iteration.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * ## Example
 * A simple example with numbers
 * ```javascript
 * of(1, 1, 2, 2, 2, 0, 1, 2, 3, -1, 4).pipe(
 *     maxStream(),
 *   )
 *   .subscribe(x => console.log(x)); // 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4
 * ```
 *
 * An example using a compare function
 * ```typescript
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 3, name: 'Foo'},
 *     { age: 6, name: 'Foo'},
 *   ).pipe(
 *     maxStream((p: Person, q: Person) => p.age < q.age),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 7, name: 'Bar'},
 * // { age: 7, name: 'Bar'},
 * ```
 *
 *
 * @param {function} [comparer] Optional comparison function called to test if an item on iteration
 * @return {Observable} An Observable that emits maximum value on each iteration.
 * @method maxStream
 * @owner Observable
 */
function maxStream(comparer) {
    return (source) => source.lift(new MaxStreamOperator(comparer));
}
exports.maxStream = maxStream;
class MaxStreamOperator {
    constructor(comparer) {
        this.comparer = comparer;
    }
    call(subscriber, source) {
        return source.subscribe(new MaxStreamSubscriber(subscriber, this.comparer));
    }
}
class MaxStreamSubscriber extends rxjs_1.Subscriber {
    constructor(destination, comparer) {
        super(destination);
        this.hasValue = false;
        if (typeof comparer === 'function') {
            this.comparer = comparer;
        }
    }
    comparer(x, y) {
        return x < y ? true : false;
    }
    _next(value) {
        if (!this.hasValue) {
            this.value = value;
            this.hasValue = true;
        }
        else {
            if (this.comparer(this.value, value)) {
                this.value = value;
            }
        }
        this.destination.next(this.value);
    }
}
