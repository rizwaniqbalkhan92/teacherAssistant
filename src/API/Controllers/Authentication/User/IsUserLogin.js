
const {getAuth, onAuthStateChanged} = require('firebase/auth');


const IsUserLogin=async()=>{

    try{


const auth = getAuth();
 await onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    res.status().send({message:"Current User Logined" , user})
} else {
    res.status().send({message:"Signout Successfully",})
    // User is signed out
    // ...
}
});

}
catch(error){
    
    res.status().send({message:"Internal Server Error",error})
    }
}




module.exports=IsUserLogin
