const { ref, get, child } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const getSingleStudent = async (req, res) => {
    const {term,stdId,stdClass}=req?.body;
  try {
    const notesRef = ref(database, `teacher/${term}/${stdClass}/${stdId}`);
    
    const snapshot = await get(notesRef);
    if (snapshot.exists()) {
      res.status(200).send({ data: snapshot.val(), message: "Student Retrieved Successfully" });
    } else {
      res.status(404).send({ message: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = getSingleStudent;
