// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Checkbox,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   Container,
//   Grid,
//   Box
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // Hardcoded sample student data
// const studentsData = [
//   {
//     studentId: 'A001',
//     studentName: 'Student A',
//     teacherId: 'T001',
//     class: 1,
//     teacherName: 'Teacher 1',
//     terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
//   },
//   {
//     studentId: 'B001',
//     studentName: 'Student B',
//     teacherId: 'T002',
//     class: 2,
//     teacherName: 'Teacher 2',
//     terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
//   },
//   {
//     studentId: 'C001',
//     studentName: 'Student C',
//     teacherId: 'T003',
//     class: 3,
//     teacherName: 'Teacher 3',
//     terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
//   }
// ];

// const PredictionScreen = () => {
//   const [filters, setFilters] = useState({
//     class: '',
//     studentId: '',
//     teacherId: '',
//     term: ''
//   });

//   const [selectedData, setSelectedData] = useState([]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const handleCheckboxChange = (studentId, term, checked) => {
//     if (checked) {
//       setSelectedData(prev => [...prev, { studentId, term }]);
//     } else {
//       setSelectedData(prev => prev.filter(item => !(item.studentId === studentId && item.term === term)));
//     }
//   };

//   const handlePredict = () => {
//     console.log('Ready to predict:', selectedData);
//     // Here you can call the API with the selectedData array
//   };

//   const filteredStudents = studentsData.filter(student => {
//     return (
//       (!filters.class || student.class === Number(filters.class)) &&
//       (!filters.studentId || student.studentId === filters.studentId) &&
//       (!filters.teacherId || student.teacherId === filters.teacherId) &&
//       (!filters.term || student.terms.includes(filters.term))
//     );
//   });

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" align="center" gutterBottom>
//         Student Prediction Records
//       </Typography>
      
//       {/* Filters */}
//       <Box sx={{ mb: 4 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel>Class</InputLabel>
//               <Select
//                 name="class"
//                 value={filters.class}
//                 onChange={handleFilterChange}
//               >
//                 <MenuItem value={1}>Class 1</MenuItem>
//                 <MenuItem value={2}>Class 2</MenuItem>
//                 <MenuItem value={3}>Class 3</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel>Student ID</InputLabel>
//               <Select
//                 name="studentId"
//                 value={filters.studentId}
//                 onChange={handleFilterChange}
//               >
//                 <MenuItem value={'A001'}>Student A</MenuItem>
//                 <MenuItem value={'B001'}>Student B</MenuItem>
//                 <MenuItem value={'C001'}>Student C</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel>Teacher ID</InputLabel>
//               <Select
//                 name="teacherId"
//                 value={filters.teacherId}
//                 onChange={handleFilterChange}
//               >
//                 <MenuItem value={'T001'}>Teacher 1</MenuItem>
//                 <MenuItem value={'T002'}>Teacher 2</MenuItem>
//                 <MenuItem value={'T003'}>Teacher 3</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel>Term</InputLabel>
//               <Select
//                 name="term"
//                 value={filters.term}
//                 onChange={handleFilterChange}
//               >
//                 <MenuItem value={'FirstTerm_Summer_2024'}>First Term Summer 2024</MenuItem>
//                 <MenuItem value={'SecondTerm_Winter_2024'}>Second Term Winter 2024</MenuItem>
//                 <MenuItem value={'ThirdTerm_Spring_2024'}>Third Term Spring 2024</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* List of Students */}
//       <Box>
//         {filteredStudents.map(student => (
//           <Accordion key={student.studentId}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography>{student.studentName}</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               {student.terms.map(term => (
//                 <Box key={term} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Checkbox
//                     onChange={(e) => handleCheckboxChange(student.studentId, term, e.target.checked)}
//                   />
//                   <Typography>{term}</Typography>
//                 </Box>
//               ))}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handlePredict}
//               >
//                 Predict Results
//               </Button>
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default PredictionScreen;
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Container,
  Grid,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Hardcoded sample student data
const studentsData = [
  {
    studentId: 'A001',
    studentName: 'Student A',
    teacherId: 'T001',
    class: 1,
    teacherName: 'Teacher 1',
    terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
  },
  {
    studentId: 'B001',
    studentName: 'Student B',
    teacherId: 'T002',
    class: 2,
    teacherName: 'Teacher 2',
    terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
  },
  {
    studentId: 'C001',
    studentName: 'Student C',
    teacherId: 'T003',
    class: 3,
    teacherName: 'Teacher 3',
    terms: ['FirstTerm_Summer_2024', 'SecondTerm_Winter_2024', 'ThirdTerm_Spring_2024']
  }
];

const PredictionScreen = () => {
  const [filters, setFilters] = useState({
    class: 'All',
    studentId: 'All',
    teacherId: 'All',
    term: 'All'
  });

  const [selectedData, setSelectedData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleCheckboxChange = (studentId, term, checked) => {
    if (checked) {
      setSelectedData(prev => [...prev, { studentId, term }]);
    } else {
      setSelectedData(prev => prev.filter(item => !(item.studentId === studentId && item.term === term)));
    }
  };

  const handlePredict = () => {
    console.log('Ready to predict:', selectedData);
    // Here you can call the API with the selectedData array
  };

  const filteredStudents = studentsData.filter(student => {
    return (
      (filters.class === 'All' || student.class === Number(filters.class)) &&
      (filters.studentId === 'All' || student.studentId === filters.studentId) &&
      (filters.teacherId === 'All' || student.teacherId === filters.teacherId) &&
      (filters.term === 'All' || student.terms.includes(filters.term))
    );
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Student Prediction Records
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value={1}>Class 1</MenuItem>
                <MenuItem value={2}>Class 2</MenuItem>
                <MenuItem value={3}>Class 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Student ID</InputLabel>
              <Select
                name="studentId"
                value={filters.studentId}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="A001">Student A</MenuItem>
                <MenuItem value="B001">Student B</MenuItem>
                <MenuItem value="C001">Student C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Teacher ID</InputLabel>
              <Select
                name="teacherId"
                value={filters.teacherId}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="T001">Teacher 1</MenuItem>
                <MenuItem value="T002">Teacher 2</MenuItem>
                <MenuItem value="T003">Teacher 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Term</InputLabel>
              <Select
                name="term"
                value={filters.term}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="FirstTerm_Summer_2024">First Term Summer 2024</MenuItem>
                <MenuItem value="SecondTerm_Winter_2024">Second Term Winter 2024</MenuItem>
                <MenuItem value="ThirdTerm_Spring_2024">Third Term Spring 2024</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* List of Students */}
      <Box>
        {filteredStudents.map(student => (
          <Accordion key={student.studentId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{student.studentName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {student.terms.map(term => (
                <Box key={term} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(student.studentId, term, e.target.checked)}
                  />
                  <Typography>{term}</Typography>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handlePredict}
              >
                Predict Results
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default PredictionScreen;
