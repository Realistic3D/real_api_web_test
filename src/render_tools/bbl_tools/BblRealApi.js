import * as REAL from "real_api_bbl";

export async function BblRealApi(bblScene, request, camera){
    const scene = bblScene.scene;
    const blob = await REAL.Scene(scene, camera, onProgress, onError);

    let response = await request.reqNewJob();
    if(response.msg !== "SUCCESS") return alert(response.msg);
    const jobData = response.data;
    const jobID = jobData.jobID;
    const jobURI = jobData.url;

    response = await request.uploadJob(jobURI, blob);
    if(response !== "SUCCESS") return alert(response.msg);

    response = await request.reqSubmitJob(jobID);
    if(response.msg !== "SUCCESS") return alert(response.msg);

    let jobStatus;
    do {
        response = await request.reqJobResult(jobID);
        if (response.msg !== "SUCCESS") {
            return alert(response.msg);
        }
        jobStatus = response.data.status;
        if (jobStatus === "COMPLETED") {
            console.log("COMPLETED");
            console.log(response.data.result);
            viewImage(response.data.result);
        } else {
            console.error(jobStatus);
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay
        }
    } while (jobStatus !== "COMPLETED");

    return response
}

function viewImage(imageUrl) {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
                <html>
                <head><title>Image</title></head>
                <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background-color:#000;">
                    <img src="${imageUrl}" alt="Rendered Image" style="max-width:100%; max-height:100%;">
                </body>
                </html>
            `);
    newWindow.document.close();
}

function onProgress(progress) {
    console.log(progress)
}

function onError(error) {
    console.error(error)
}