const { ref, get, child } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const getAllStudentsRecords = async (req, res) => {
    const {term,stdClass}=req?.body;
  try {
    const notesRef = ref(database, `teacher/${term}/${stdClass}`);
    
    const snapshot = await get(notesRef);
    if (snapshot.exists()) {
      res.status(200).send({ data: snapshot.val(), message: "Students Retrieved Successfully" });
    } else {
      res.status(404).send({ message: "No Students Found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = getAllStudentsRecords;
