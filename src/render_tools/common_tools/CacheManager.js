
export default class CacheManager {
    constructor() {
    }
    loginCache(){
        // const login = this.getCache("login");
        // if(!login) return {};
        // const data = login.data;
        // const token = login.token;
        // return {data: data, token: token};
    }
    consoleSize() {
        const size = this.size();
        console.log(`Current scene size: ${size}MB`);
    }
    setCache(key, value, isBin=false) {
        let strValue = value;
        if(isBin) {
            const binData = new Uint8Array(value);
            strValue = binData.reduce((str, byte) => str + String.fromCharCode(byte), '');
        }
        else strValue = JSON.stringify(value);
        localStorage.setItem(key, strValue);
    }
    getCache(key, isBin=false) {
        const cache = localStorage.getItem(key);
        if(!cache) return;
        if(isBin) {
            const binaryData = new Uint8Array(cache.length);
            for (let i = 0; i < cache.length; i++) {
                binaryData[i] = cache.charCodeAt(i);
            }
            return new Blob([binaryData], { type: 'application/octet-stream' });
        }
        return JSON.parse(cache);
    }
    contains(key) {
        const count = localStorage.length;
        for (let i = 0; i < count; i++) {
            if (localStorage.key(i) === key) return true;
        }
    }
    size() {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            totalSize += key.length + value.length * 2; // Estimate size in bytes
        }
        const sizeInMB = totalSize / (1024 * 1024); // Convert bytes to megabytes
        return sizeInMB.toFixed(2);
    }
    clear(key) {
        const delIds = [];
        for (let i = 0; i < localStorage.length; i++) {
            const curKey = localStorage.key(i);
            if(curKey === key) delIds.push(key);
        }
        delIds.forEach(key => localStorage.removeItem(key));
    }
    clearAll() {
        localStorage.clear();
    }
    all() {
        const keyList = [];
        const count = localStorage.length;
        for (let i = 0; i < count; i++) {
            keyList.push(localStorage.key(i))
        }
        return keyList;
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}
