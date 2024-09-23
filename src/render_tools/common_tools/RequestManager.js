import axios from "axios";
import {ApiPath} from "@/render_tools/common_tools/network_tools";
import NetworkManager from "@/render_tools/common_tools/NetworkManager";


export class RequestManager {
    constructor(config) {
        this.onProgress = undefined;
        this.network = new NetworkManager(config);
    }
    setProgress(onProgress) {
        this.onProgress = onProgress;
    }
    async reqNewJob(cred, renderParams) {
        const uri = this.network.renderUri();
        const params = this.apiParams(cred, "new", undefined, renderParams);
        return await this.post(uri, params);
    }
    async uploadJob(uri, contents) {
        return await this.put(uri, contents);
    }
    async reqSubmitJob(cred, jobID) {
        const uri = this.network.renderUri();
        const params = this.apiParams(cred, "render", jobID);
        return await this.post(uri, params);
    }
    async reqJobResult(cred, jobID) {
        const uri = this.network.renderUri();
        const params = this.apiParams(cred, "result", jobID);
        return await this.post(uri, params);
    }
    async getIpInfo() {
        const url = `https://ipinfo.io?token=1e525c22fe561a`;
        const response = await axios.get(url);
        if(response.status === 200) {
            const data = response.data;
            if(isDict(data)) return data;
        }
        return {};
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
    async login(data, password, isCred = false) {
        const params = {data: data};
        if(isCred) params.cred = password;
        else params.token = password;
        const uri = this.network.uriPath("dbms", ApiPath.Login);
        return await this.post(uri, params);
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

function isDict(value) {
    try {
        if(typeof value === 'object' && value !== null) return true;
        JSON.stringify(JSON.parse(value));
        return true;
    } catch (error) {
        // console.log(error);
        return false;
    }
}
