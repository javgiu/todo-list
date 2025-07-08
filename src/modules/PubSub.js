class PubSub {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback)
    }

    of(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback) 
        }
    }

    emmit(eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }
}

const pubsub = new PubSub();

export default pubsub;

