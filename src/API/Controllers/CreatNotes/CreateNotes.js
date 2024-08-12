

const { readFileSync } = require('fs');
const { genAI } = require('../../../Constants/Constant');
const { fileToGenerativePath } = require('../../../Constants/utils');

const createNotes = async (req, res) => {

  try {
    const prompt=`Analyze the content of the provided images and generate structured notes, I want to create a notes for students.
    
` 
      // const prompt = "I want to create a notes for students, please analyze these pictures and give me the notes content, the response content should be in json objects , each heading should be in seperate key values same as normal text"
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded');
        }

        console.log("Files received:", req.files);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const prompt = req.body.prompt || '';

        const imageParts = req.files.map(file => {
            return fileToGenerativePart(file.path, file.mimetype);
        });

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = result.response;

        if (response && typeof response.text === 'function') {
            const text = response.text();
            
            res.status(200).send(text);
        } else {
            throw new Error('Unexpected response format');
        }

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send('Error processing file');
    }
};

function fileToGenerativePart(path, mimeType) {
    try {
        const fileData = readFileSync(path);
        return {
            inlineData: {
                data: Buffer.from(fileData).toString("base64"),
                mimeType
            },
        };
    } catch (error) {
        console.error("Error reading file:", error);
        throw new Error('Error processing file');
    }
}

module.exports = createNotes;
