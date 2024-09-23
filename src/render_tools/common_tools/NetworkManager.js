import * as REAL from "real_api_bbl";
import {GetHostUrl} from "@/render_tools/common_tools/network_tools";

export default class NetworkManager {
    constructor(config) {
        this.hosts = {};
        this.__init(config);
        this.hosts.render = REAL.API
    }
    __init(config) {
        const hosts = {};
        for (const host of config.hosts) {
            // let endPoint = host.endPoint || "rapi";
            let endPoint = host.endPoint;
            if(endPoint === undefined) endPoint = "rapi";
            hosts[host.name] = {
                "host": host.host,
                "port": host.port,
                "domain": host.domain,
                "endPoint": endPoint,
            }
        }
        const keys = Object.keys(hosts);
        for (const key of keys) {
            this.hosts[key] = GetHostUrl(key, hosts)
        }
    }
    renderUri() {
        return this.hosts.render;
    }
    uriPath(host, reqType) {
        if(reqType) return `${this.hosts[host]}${reqType}`;
        return `${this.hosts[host].url}`;
    }
}
