const { genAI, genModel } = require("../../Constants/Constant")
const {readFileSync}= require('fs');



const textGeneration=async (req,res)=>{


    const prompt = req?.body?.prompt
    const results = await genModel.generateContent(prompt);
    const response =  results?.response;
    const text = response.text();
    console.log("TEXT====>>>",text);
    
    res.status(200).send({data:text});

}

const textGenByImgAndText=async(req, res)=>{
  let imageParts=[];
  // console.log("=======textGenByImgAndText",req?.files)
    try {
        if (!req.files) {
            // console.log("REQ_FILE===>>",req.file);
          return res.status(400).send('No file uploaded');
        }
        console.log("File===>>",req.files)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `please analyze these pictures and give me the optimize results, this is my exam paper, first sperate the attributes names with values  like std name std roll number etc , then check and analyze the paaper and after that give the marks of this question , each question have mention marks and algo give accuracy and I need a seperate object where all student data and exam data present in this object and return it seperately, please add total obtain marks and total marks also calculate grade and write a complete marksheet, response content should be text not like json, please write teacherName, stdId,stdClass, subject and term at start of content 
          `
    
        for(let i=0; i<req?.files?.length; i++){
          imageParts.push(fileToGenerativePart(req?.files[i]?.path,req?.files[i]?.mimetype))
        }
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = result.response;
        const text = response.text();
        res.status(200).send(text)

        console.log("Success====>>>",text);
      
     
      } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file');
      }
   
    }

    function fileToGenerativePart(path, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(readFileSync(path)).toString("base64"),
          mimeType
        },
      };
    }

const generateTextStream=async(req,res)=>{
try{
  const {prompt} = req?.body;

  const result = await genModel.generateContentStream(prompt);

  console.log("Result====>>",result?.stream);
  let streamArr=[];
  for await (const chunk of result.stream) {
    streamArr.push(chunk.text())
  
  }

  return res.status(200).send(streamArr);
  
}
catch(err){

  res.status(500).send({error:err,message:"Internal Server Error"});

}

}




module.exports={textGeneration,textGenByImgAndText,generateTextStream};