const { readFileSync } = require("fs")
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');   

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);   

    }
});

const upload = multer({ storage: storage });


const fileToGenerativePath = (path,memType)=>{

    return {
        inlineData:{
            data:Buffer.from(readFileSync(path)).toString("base64"),
            memType
        }
    }
}


module.exports={fileToGenerativePath,upload}