const { ref, remove ,get} = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const deleteStudentRecord = async (req, res) => {

  const { stdId,stdClass,term } = req.body;

  try {

      const noteRef = ref(database, `teacher/${term}/${stdClass}/${stdId}`);
      
      const snapshot = await get(noteRef);

    if (snapshot.exists()) {

        await remove(noteRef);
        res.status(200).send({ message: "Student Record Deleted Successfully" });
    } else {

    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = deleteStudentRecord;
