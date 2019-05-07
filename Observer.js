export class ObserverElement {
  constructor() {
    this.observer = [];
  }

  subscribe(el) {
    this.observer.push(el);
  }

  unsubscribe(el) {
    this.observer.filter(sub => sub !== el);
  }

  notify(data) {
    this.observer.forEach(obs => obs(data));
  }
}