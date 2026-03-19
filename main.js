const assert = require('assert');
const findKthLargest = require('./task1');
const LRUCache = require('./task2');

//Task1 tests
assert.strictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
assert.strictEqual(findKthLargest([1], 1), 1);
assert.strictEqual(findKthLargest([5,5,5], 2), 5);
assert.strictEqual(findKthLargest([-1,-2,-3], 1), -1);
assert.strictEqual(findKthLargest([7,6,5,4,3,2,1], 7), 1);

//Task2 tests
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
assert.strictEqual(cache.get(1), 1);
cache.put(3, 3);
assert.strictEqual(cache.get(2), -1);

const cache2 = new LRUCache(1);
cache2.put(1, 1, 100);
setTimeout(() => {
  assert.strictEqual(cache2.get(1), -1);
  console.log("Successfully passed!");
}, 150);