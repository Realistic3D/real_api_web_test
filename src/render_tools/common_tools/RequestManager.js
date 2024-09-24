import axios from "axios";
import * as REAL from "real_api_bbl";


export class RequestManager {
    constructor() {
        this.onProgress = undefined;
    }
    setProgress(onProgress) {
        this.onProgress = onProgress;
    }
    async reqNewJob(cred, renderParams) {
        const params = this.apiParams(cred, "new", undefined, renderParams);
        return await this.post(REAL.API, params);
    }
    async uploadJob(uri, contents) {
        return await this.put(uri, contents);
    }
    async reqSubmitJob(cred, jobID) {
        const params = this.apiParams(cred, "render", jobID);
        return await this.post(REAL.API, params);
    }
    async reqJobResult(cred, jobID) {
        const params = this.apiParams(cred, "result", jobID);
        return await this.post(REAL.API, params);
    }
    apiParams(cred, type, jobID = undefined, renderParams = undefined) {
        return  {
            cred: cred,
            type: type,
            api: "rapi",
            jobID: jobID,
            render: renderParams,
        };
    }
    async post(uri, data){
        const info = await axios.post(uri, data);
        if(!info) return {msg: "REQUEST_FAILED", data: undefined};
        return info.data;
    }
    async put(uri, contents){
        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress: this.onUploadProgress.bind(this)
        }
        try {
            const request = await axios.put(uri, contents, headers);
            return (request.status === 200) ? "SUCCESS": "FAILED";
        }
        catch (e) {
            return String(e);
        }
    }
    onUploadProgress(progressEvent) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.onProgress && this.onProgress(percentage);
    }
}
