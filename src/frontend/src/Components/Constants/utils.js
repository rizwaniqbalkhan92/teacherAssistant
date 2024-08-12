
import jsPDF from "jspdf";
export const getUserId=async()=>{
try{
   const userId=  await localStorage.setItem('userId');
        return userId

}
catch(err){
return err
}
}
export const setItem=async(token,userId)=>{
try{

    await localStorage.setItem('userId',userId)
    
}
catch(err){
return err
}
 
}


export const generatePDF = (content) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const marginTop = 10;
    const lineHeight = 10;
    let y = marginTop;

   

    const splitContent = doc.splitTextToSize(content, 180);

    splitContent.forEach((line) => {
      if (y + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        y = marginTop;
      }
      doc.text(line, marginTop, y);
      y += lineHeight;
    });

    doc.save('long-content.pdf');
  };

//   export function extractStudentDetails(content) {
//     const teacherNameMatch = content.match(/TeacherName:\s*(.*)/);
//     const stdIdMatch = content.match(/stdId:\s*(\d+)/);
//     const stdClassMatch = content.match(/stdClass:\s*(.*)/);
//     const termMatch = content.match(/term:\s*(.*)/);
//     const subjectmMatch = content.match(/term:\s*(.*)/);
//     const userIdMatch = content.match(/term:\s*(.*)/);

//     const teacherName = teacherNameMatch ? teacherNameMatch[1].trim() : null;
//     const stdId = stdIdMatch ? stdIdMatch[1].trim() : null;
//     const stdClass = stdClassMatch ? stdClassMatch[1].trim() : null;
//     const term = termMatch ? termMatch[1].trim() : null;
//     const subject = subjectmMatch ? subjectmMatch[1].trim() : null;
//     const userId = userIdMatch ? userIdMatch[1].trim() : null;

//     return {
//         teacherName,
//         stdId,
//         stdClass,
//         term,
//         subject,
//         userId
//     };
// }

export function extractStudentDetails(content) {
    const teacherNameMatch = content.match(/TeacherName:\s*(.*)/);
    const stdIdMatch = content.match(/stdId:\s*(\d+)/);
    const stdClassMatch = content.match(/stdClass:\s*(.*)/);
    const termMatch = content.match(/term:\s*(.*)/);
    const subjectMatch = content.match(/subject:\s*(.*)/); // Corrected to 'subject'
    const userIdMatch = content.match(/userId:\s*(.*)/); // Corrected to 'userId'

    const teacherName = teacherNameMatch ? teacherNameMatch[1].trim() : null;
    const stdId = stdIdMatch ? stdIdMatch[1].trim() : null;
    const stdClass = stdClassMatch ? stdClassMatch[1].trim() : null;
    const term = termMatch ? termMatch[1].trim() : null;
    const subject = subjectMatch ? subjectMatch[1].trim() : null;
    const userId = userIdMatch ? userIdMatch[1].trim() : null;

    return {
        teacherName,
        stdId,
        stdClass,
        term,
        subject,
        userId
    };
}

