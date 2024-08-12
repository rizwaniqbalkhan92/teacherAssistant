const { ref, update, get } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const updateStudentRecord = async (req, res) => {
  const {content,stdId,term,stdClass, userId } = req.body;

  try {
    const noteRef = ref(database, `teacher/${term}/${stdClass}/${stdId}`);
    
    // Check if the note exists
    const snapshot = await get(noteRef);
    if (snapshot.exists()) {
      
      await update(noteRef, {
        stdRecord:content,
        userId,
        stdClass,
        term,
        stdId
      });

      res.status(201).send({ message: "Notes Edited Successfully" });
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = updateStudentRecord;
