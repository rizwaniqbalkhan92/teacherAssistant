const express = require('express');
const {textGeneration, textGenByImgAndText, generateTextStream}  = require('../Controllers/TextGeneration');
// const { upload } = require('../../Constants/utils');
const multer = require('multer');

const os = require('os');
const path = require('path');
const createNotes = require('../Controllers/CreatNotes/CreateNotes');
const saveNotes = require('../Controllers/CreatNotes/saveNotes');
const editNotes = require('../Controllers/CreatNotes/editNotes');
const deleteNotes = require('../Controllers/CreatNotes/deleteNotes');
const getSpecificNote = require('../Controllers/CreatNotes/getSpecifiNote');
const getAllNotes = require('../Controllers/CreatNotes/getAllNotes');
const saveStudentRecords = require('../Controllers/StudentRecords/createRecords');
const updateStudentRecord = require('../Controllers/StudentRecords/updateRecord');
const deleteStudentRecord = require('../Controllers/StudentRecords/deleteRecords');
const getAllStudentsRecords = require('../Controllers/StudentRecords/getAllRecords');
const getSingleStudent = require('../Controllers/StudentRecords/getSingleStudentRecord');
const getAllStudentsUnderTeacher = require('../Controllers/StudentRecords/getAllSchoolStudents');
const getAllStudentsById = require('../Controllers/StudentRecords/getAllStudentsByStdId');
const SignUp = require('../Controllers/Authentication/User/Singup');
const Login = require('../Controllers/Authentication/User/Login');

const router= express.Router();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("FILEEE===>>>",file)
//       cb(null, 'uploads/');   
//    // Specify the upload directory
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
  
//     }
//   });
  
  const upload = multer({ dest: './uploads/'});
router.post('/getText',textGeneration);
router.post('/textGenByImgAndText',upload.any(),textGenByImgAndText);
router.post('/generateTextStream',upload.any(),generateTextStream);
router.post('/createNotes',upload.any(),createNotes);
router.post('/saveNotes',saveNotes);
router.post('/editNotes',editNotes);
router.post('/signUp',SignUp);
router.post('/signIn',Login);
router.delete('/deleteNotes/:notesId',deleteNotes);
router.get('/getAllNotes',getAllNotes);
router.post('/getSpecificNote',getSpecificNote);
router.post('/saveStudentRecords',saveStudentRecords);
router.put('/updateStudentRecord',updateStudentRecord);
router.delete('/deleteStudentRecord',deleteStudentRecord);
router.post('/getAllStudentsRecords',getAllStudentsRecords);
router.post('/getSingleStudent',getSingleStudent);
router.get('/getAllStudentsById/:stdId',getAllStudentsById);




module.exports=router