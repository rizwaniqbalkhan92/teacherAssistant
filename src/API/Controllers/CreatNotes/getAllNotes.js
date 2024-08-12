const { ref, get, child } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const getAllNotes = async (req, res) => {
  try {
    const notesRef = ref(database, 'teacher/notes/');
    
    const snapshot = await get(notesRef);
    if (snapshot.exists()) {
      res.status(200).send({ data: snapshot.val(), message: "Notes Retrieved Successfully" });
    } else {
      res.status(404).send({ message: "No notes found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = getAllNotes;
