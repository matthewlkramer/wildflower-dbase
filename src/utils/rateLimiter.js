// src/utils/rateLimiter.js

// Simple rate limiter for async functions (e.g., fetch)
// Usage: await rateLimiter.throttle(() => fetch(...))

class RateLimiter {
    constructor({ interval = 200, maxConcurrent = 5 } = {}) {
        this.interval = interval; // ms between requests
        this.maxConcurrent = maxConcurrent;
        this.activeCount = 0;
        this.queue = [];
    }

    async throttle(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this._next();
        });
    }

    _next() {
        if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) return;
        const { fn, resolve, reject } = this.queue.shift();
        this.activeCount++;
        fn()
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.activeCount--;
                setTimeout(() => this._next(), this.interval);
            });
    }
}

export const rateLimiter = new RateLimiter({ interval: 200, maxConcurrent: 3 });
