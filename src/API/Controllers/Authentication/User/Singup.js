
const { error } = require('console');
const {getAuth, createUserWithEmailAndPassword } = require('firebase/auth');



const SignUp=async(req,res)=>{
    const {email,password}=req?.body;
    try{
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {       
            const user = userCredential.user;
            res.status(201).send({message:"User Created Successfully",data:user});
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                
                res.send({message:"Password should be at least 6 characters",errorCode})
                
            } else if (errorCode === 'auth/email-already-in-use') {
                  res.send({message:"Email is already in use",errorCode})
                } else {
                  res.send({message:errorMessage,errorCode})
                }  
            })
            
        }
        catch(error){
            
            res.status(500).send({message:"Internal Server Error"});
    }
}




module.exports=SignUp
