
const { ref, get } = require('firebase/database');
const { database } = require('../../../Constants/firebaseConfig');

const getAllStudentsById = async (req, res) => {
    const { stdId } = req.params;
    console.log("stdId===>>", stdId);
    try {
        const notesRef = ref(database, `teacher`);
        const snapshot = await get(notesRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const filteredData = filterDataByUserId(data, stdId);
            res.status(200).send({ data: filteredData, message: "Students Retrieved Successfully" });
        } else {
            res.status(404).send({ message: "No Students Found" });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error", err });
    }
};

const filterDataByUserId = (data, stdId) => {
    const result = {};
    for (const term in data) {
      console.log("data===>>",term)
      for (const grade in data[term]) {
          console.log("grade===>>",grade)
          for (const studentId in data[term][grade]) {
              console.log("studentId===>>",studentId)
                if (data[term][grade][studentId].stdId === stdId) {
                    if (!result[term]) {
                        result[term] = {};
                    }
                    if (!result[term][grade]) {
                        result[term][grade] = {};
                    }

                    result[term][grade][studentId] = data[term][grade][studentId];
                }
            }
        }
    }
    return result;
};

module.exports = getAllStudentsById;
