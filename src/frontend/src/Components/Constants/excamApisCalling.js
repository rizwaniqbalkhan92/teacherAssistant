import Axios from "axios";

export const generateExamsResults = async (dataImg,bool) => {
    try {

        if(bool){

        
        let data = new FormData();
        dataImg?.forEach((val, index) => {
            const blobData = dataURItoBlob(val);
            data.append(`image_${index}`, blobData);
        });

   
        console.log("FormData entries:");
        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }
    
     
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url:`https://testbackend-rho.vercel.app/api/textGenByImgAndText`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };
    
        const response = await Axios.request(config);

        return response.data;
    }
    else{
      
        
    
    
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://testbackend-rho.vercel.app/api/textGenByImgAndText/",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: dataImg,
            };
        
            const response = await Axios.request(config);
            console.log("Response:====>>>dataImg", dataImg);
            return response.data;
        
    }
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
};

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}