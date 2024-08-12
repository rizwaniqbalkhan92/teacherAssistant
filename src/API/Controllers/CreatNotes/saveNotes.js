const { ref, set } = require('firebase/database');
const { database} = require('../../../Constants/firebaseConfig');

const saveNotes = async (req, res) => {
  const { content, userId, notesId } = req.body;

  try {
    await set(ref(database, 'teacher/notes/' + notesId), {
      content,
      userId,
      notesId
    });

    res.status(201).send({ message: "Notes Saved Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = saveNotes;
