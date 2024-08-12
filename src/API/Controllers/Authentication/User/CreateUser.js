const {getDatabase}=require('firebase/database')
const {getAuth}=require('firebase/auth')


async function createUserAfterSignUp(req,res) {
const {user}= req?.body;
    const db = getDatabase();
    await set(ref(db, 'users/' + user?.uid), {
      username: user?.name,
      email: user?.email,
      displayName: user?.displayName,
      profile_picture : user?.photoURL
    })
    .then((res)=> res.json())
    .then((data)=>{
        res.stat(201).send({data:data,message:"User Created...!!!!"})
    })
    .catch((error)=>{
        res.send(error.code).send({message:error.message})
    })

  }


  module.exports = createUserAfterSignUp