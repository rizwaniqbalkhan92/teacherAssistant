const { ref, update, get } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const editNotes = async (req, res) => {
  const { content, userId, notesId } = req.body;

  try {
    const noteRef = ref(database, 'teacher/notes/' + notesId);
    
    // Check if the note exists
    const snapshot = await get(noteRef);
    if (snapshot.exists()) {
      
      await update(noteRef, {
        content,
        userId,
        notesId
      });

      res.status(200).send({ message: "Notes Edited Successfully" });
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = editNotes;
