class Cache {
  constructor() {
    this.cache = {};

    // Cache items name
    this.__flight_list = 'flight_list';
  }

  has(key) {
    return key in this.cache;
  }

  set(key, value) {
    this.cache[key] = value;
  }

  get(key) {
    return this.cache[key];
  }

  flush(key) {
    if (this.get(key)) {
      delete this.cache[key];
    }
  }
}

if ( ! Cache.instance ) {
  Cache.instance = new Cache();
}

export default Cache.instance;