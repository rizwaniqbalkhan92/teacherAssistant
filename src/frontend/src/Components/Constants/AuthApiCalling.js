
import Axios from 'axios';
export const signInAccount=async(data2)=>{

   
  try{
    let data = JSON.stringify({
        "email": data2.email,
        "password":data2.password
    });
    console.log("API_CALLING===>>>",data)

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://testbackend-rho.vercel.app/api/signIn',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

  const response = await Axios.request(config)
  // console.log("JSON.stringify(response.data)",response)
  return response !== null ?? response 
  }
  catch(error){
    return error
  }
// .then((response) => {
//     console.log('RESPONSE===>>>0001',response)
//     console.log('RESPONSE===>>>0002',JSON.stringify(response.data))
// //   navigate('/dashboard')
// })
// .catch((error) => {
//   console.log(error);
//  
// });

}
export const createAccount=async(data2)=>{

   
  try{
    let data = JSON.stringify({
        "email": data2.email,
        "password":data2.password
    });
    console.log("API_CALLING===>>>",data)

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://testbackend-rho.vercel.app/api/signUp',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

  const response = await Axios.request(config)
  return  JSON.stringify(response.data) 
  }
  catch(error){
    return error
  }
// .then((response) => {
//     console.log('RESPONSE===>>>0001',response)
//     console.log('RESPONSE===>>>0002',JSON.stringify(response.data))
// //   navigate('/dashboard')
// })
// .catch((error) => {
//   console.log(error);
//  
// });

}