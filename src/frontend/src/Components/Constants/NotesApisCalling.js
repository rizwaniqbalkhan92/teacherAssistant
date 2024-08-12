
// // // import Axios from "axios"
// // // import FormData from "form-data";

// // // export const saveNotesToDB = async (dataImg) => {
// // //   try {
// // //     console.log("Data CHECK===>>dataImg", dataImg);

// // //     let data = new FormData();
// // //     dataImg?.forEach((val, index) => {
// // //       data.append(`${index}-${val.slice(0, 5)}`, val);
// // //     });
// // // console.log("Data Values===>>> ",data)
// // // //     let config = {
// // // //       method: "post",
// // // //       maxBodyLength: Infinity,
// // // //       url: "https://testbackend-rho.vercel.app/api/createNotes",
// // // //       headers: {
// // // //         "Content-Type": "multipart/form-data", // Important for FormData
// // // //       },
// // // //       data: data, // Send FormData directly
// // // //     };

// // // //     const response = await Axios.request(config);
// // // //     console.log("before", JSON.stringify(response.data));
// // // //     return JSON.stringify(response.data);
// // //   } catch (error) {
// // //     console.log(error);
// // //     return error;
// // //   }
// // // };




// // // export const editNotesToDB=async()=>{

// // //     try{

// // //         return
// // //     }
// // //     catch(error){
// // //         return error
// // //     }
// // // }



// // // export const getAllNotesFromDB=async()=>{

// // //     try{

// // //         return
// // //     }
// // //     catch(error){
// // //         return error
// // //     }
// // // }



// // // export const deleteNotesFromDB=async()=>{

// // //     try{

// // //         return
// // //     }
// // //     catch(error){
// // //         return error
// // //     }
// // // }

// // // export const getSingleNotesFromDB=async()=>{

// // //     try{

// // //         return
// // //     }
// // //     catch(error){
// // //         return error
// // //     }
// // // }
// // import Axios from "axios";
// // import FormData from "form-data";
// // import { Buffer } from "buffer";
// // export const saveNotesToDB = async (dataImg) => {
// //   try {
// //     console.log("Data CHECK===>>dataImg", dataImg);

// //     // Initialize FormData
// //     let formData = new FormData();

// //     // Append each base64 image string to the formData
// //     dataImg?.forEach((base64String, index) => {
// //       // Extract the image format (jpeg, png, etc.) from the base64 string
// //       const imageFormat = base64String.match(/^data:image\/(.*?);base64,/)[1];

// //       // Convert the base64 string into a binary buffer
// //       const imageBuffer = Buffer.from(
// //         base64String.replace(/^data:image\/\w+;base64,/, ""),
// //         "base64"
// //       );

// //       // Append the binary buffer to formData with a filename
// //       formData.append(
// //         `${index}-image.${imageFormat}`,
// //         imageBuffer,
// //         `image${index}.${imageFormat}`
// //       );
// //     });

// //     console.log("FormData Content: ", formData);

// //     // Sending the FormData using Axios
// //     let config = {
// //       method: "post",
// //       maxBodyLength: Infinity,
// //       url: "https://testbackend-rho.vercel.app/api/createNotes",
// //       headers: {
// //         "Content-Type": "multipart/form-data", // Important for FormData
// //         ...formData.getHeaders(), // This ensures the correct headers are sent
// //       },
// //       data: formData, // Send FormData directly
// //     };

// //     const response = await Axios.request(config);
// //     console.log("Response Data: ", JSON.stringify(response.data));
// //     return JSON.stringify(response.data);
// //   } catch (error) {
// //     console.log("Error: ", error);
// //     return error;
// //   }
// // };
// import Axios from "axios";

// export const saveNotesToDB = async (dataImg) => {
//   try {
//     console.log("Data CHECK===>>dataImg", dataImg);

//     let formData = new FormData();

//     dataImg?.forEach((base64String, index) => {
//       // Extract the content type and base64 encoded data
//       const matches = base64String.match(/^data:(.*?);base64,(.*)$/);
//       if (!matches || matches.length !== 3) {
//         throw new Error("Invalid input string");
//       }

//       const contentType = matches[1];
//       const base64Data = matches[2];

//       // Convert base64 to raw binary data held in a string
//       const byteCharacters = atob(base64Data);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);

//       // Convert to Blob
//       const blob = new Blob([byteArray], { type: contentType });

//       // Append Blob to FormData
//       formData.append(`image-${index}`, blob, `image-${index}.${contentType.split('/')[1]}`);
//     });

//     console.log("FormData Content: ", formData);

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://testbackend-rho.vercel.app/api/createNotes",
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       data: formData,
//     };

//     const response = await Axios.request(config);
//     console.log("Response Data: ", JSON.stringify(response.data));
//     return JSON.stringify(response.data);
//   } catch (error) {
//     console.log("Error: ", error);
//     return error;
//   }
// };
import Axios from "axios";

export const generateNotes = async (dataImg,bool) => {
    try {
        console.log("Data CHECK===>>dataImg", dataImg);
        if(bool){

        
        let data = new FormData();
        dataImg?.forEach((val, index) => {
            const blobData = dataURItoBlob(val);
            data.append(`image_${index}`, blobData);
        });

        // Debug: Log FormData entries
        console.log("FormData entries:");
        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }
        // data.append('prompt',"I want to create a notes for students, please analyze these pictures and give me the notes content, the response content should be in json objects , each heading should be in seperate key values same as normal text")
        // Axios config

        const prompt = "I want to create a notes for students, please analyze these pictures and give me the notes content, the response content should be in json objects , each heading should be in seperate key values same as normal text"
        //  formData.append('prompt', prompt);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url:`https://testbackend-rho.vercel.app/api/createNotes`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };
    
        const response = await Axios.request(config);
        console.log("Response:====>>>", response.data);
        return response.data;
    }
    else{
      
        
    
    
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://testbackend-rho.vercel.app/api/createNotes/",
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


export const saveNotesApi=async(content,userId,notesId)=>{
    try{

let data = JSON.stringify({
  "content": content,
  "userId": userId,
  "notesId": notesId
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://testbackend-rho.vercel.app/api/saveNotes',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

Axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    }
    catch(err){
     return err;   
    }
}