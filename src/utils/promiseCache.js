const LS_KEY = 'wcs::apiCache';
let _cache = JSON.parse(window.localStorage.getItem(LS_KEY) || '{}');

function set(key, value) {
    _cache[key] = value;
    requestIdleCallback(() => {
        window.localStorage.setItem(LS_KEY, JSON.stringify(_cache));
    });
}

export default function promiseCache(getPromise, cacheKey) {
    if (_cache[cacheKey]) {
        return new Promise(resolve => resolve(_cache[cacheKey]));
    } else {
        return getPromise().then(resp => {
            set(cacheKey, resp);
            return resp;
        });
    }
}

export function dropCache() {
    window.localStorage.setItem(LS_KEY, '{}');
    _cache = {};
}
