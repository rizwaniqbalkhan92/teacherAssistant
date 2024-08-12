const { ref, set } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const saveStudentRecords = async (req, res) => {
  const {subject, stdRecord,stdId,term,stdClass, userId } = req.body;

  console.log("===>>>>createRecords",subject, stdRecord,stdId,term,stdClass, userId)
  try {
    await set(ref(database,`teacher/${term}/${stdClass}/${stdId}/${subject}`), {
      stdRecord,
      userId,
      stdClass,
      term,
      stdId,
      subject


    });

    res.status(201).send({ message: "Student Record Saved Successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
};

module.exports = saveStudentRecords;
