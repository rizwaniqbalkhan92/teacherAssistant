
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');


const Login=async(req,res)=>{
const {email,password}=req?.body
    try{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {

            const user = userCredential.user;
            res.status(201).send({message:"User Login Successfully",data:user});
     
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          
            switch (errorCode) {
              case 'auth/invalid-email':
                res.status(400).send({ error: 'Invalid email' });
                break;
              case 'auth/wrong-password':
                res.status(401).send({ error: 'Wrong password' });
                break;
              default:
                res.status(500).send({ error: 'An unexpected error occurred' });
                break;
            }
          });
        
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
}




module.exports=Login
