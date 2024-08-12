const { GoogleGenerativeAI } = require("@google/generative-ai") ;

// Access your API key as an environment variable.
 const genAI = new GoogleGenerativeAI(`AIzaSyAywNFYxt4-EdPGvXwBe_Wa490Oyjc2cG8`);
//  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
 const genModel = genAI.getGenerativeModel({model:'gemini-1.5-flash'})
 module.exports={genAI,genModel};

