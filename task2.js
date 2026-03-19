class Node {
  constructor(key, value, expiry = null) {
    this.key = key;
    this.value = value;
    this.expiry = expiry;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (capacity < 0) throw new Error("Invalid capacity");

    this.capacity = capacity;
    this.map = new Map();

    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _move(node) {
    this._remove(node);
    this._add(node);
  }

  _expired(node) {
    return node.expiry !== null && Date.now() > node.expiry;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;

    if (this._expired(node)) {
      this._remove(node);
      this.map.delete(key);
      return -1;
    }

    this._move(node);
    return node.value;
  }

  put(key, value, ttl) {
    if (this.capacity === 0) return;

    const expiry = (ttl !== undefined && ttl >= 0)
      ? Date.now() + ttl
      : null;

    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      node.expiry = expiry;
      this._move(node);
      return;
    }

    if (this.map.size >= this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }

    const node = new Node(key, value, expiry);
    this.map.set(key, node);
    this._add(node);
  }
}

module.exports = LRUCache;
