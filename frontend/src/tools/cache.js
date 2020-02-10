class Cache {
  constructor() {
    this.cache = {};
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
}


if ( ! Cache.instance ) {
  Cache.instance = new Cache();
}


export default Cache.instance;