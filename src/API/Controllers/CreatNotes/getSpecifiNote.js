const { ref, get } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const getSpecificNote = async (req, res) => {
  const { notesId } = req.body;

  try {
    const noteRef = ref(database, 'teacher/notes/' + notesId);
    const snapshot = await get(noteRef);
    console.log("snapshot===",snapshot.val())
    if (snapshot.exists()) {
      res.status(200).send({ data: snapshot.val(), message: "Note Retrieved Successfully" });
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = getSpecificNote;
