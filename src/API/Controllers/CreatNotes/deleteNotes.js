const { ref, remove ,get} = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const deleteNotes = async (req, res) => {

  const { notesId } = req.params;

  try {

      console.log("existed===>>001",notesId)
      const noteRef = ref(database, 'teacher/notes/' + notesId);
      
      // Check if the note exists
      const snapshot = await get(noteRef);
      console.log("existed===>>111",snapshot)
    if (snapshot.exists()) {
        console.log("existed===>>if",snapshot.exists())
        await remove(noteRef);
        res.status(200).send({ message: "Notes Deleted Successfully" });
    } else {
        console.log("existed===>>else",snapshot.exists())
      res.status(404).send({ message: "Note not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = deleteNotes;
