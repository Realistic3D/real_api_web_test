export const ApiPath = {
    Login: "r3d/login",
};


export function GetHostUrl(key, hosts) {
    const host = hosts[key];
    const cHost = host['host']
    const endPoint = host['endPoint'];
    const protocol = (cHost === "localhost") ? "http" : "https";
    const hosDom = getDomain(host)
    let hostPath = `${protocol}://${hosDom}`
    if (endPoint) hostPath += `/${endPoint}/`
    else hostPath += "/"
    return hostPath
}


function getDomain(host) {
    const cPort = host['port'];
    const cHost = host['host'];
    const domain = host['domain'];
    const hostPath = (cHost === "localhost") ? "localhost" : `${cHost}.${domain}`;
    const port = (cHost === "localhost") ? `:${cPort}` : "";
    return `${hostPath}${port}`;
}
