import { getCoursesFromLocalStorage, getStudentsFromLocalStorage, createStudentTable } from "./localStorageOperation.js";

document.addEventListener("DOMContentLoaded", function() {
    addCoursesToSelect();
});


// eklenen course lar optionlarda çıkacak
function addCoursesToSelect() {
    const courses = getCoursesFromLocalStorage();
    const selectElement = document.getElementById('courseSelection');

    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.courseId;
        option.textContent = course.courseName;
        selectElement.appendChild(option);
    });

    // add EventListener for click the options
    selectElement.addEventListener('change', function() {
        
        addStudentToCourse(); // Seçildiğinde öğrenci ekleme fonksiyonunu çağırma
    });
    
  
}


// add student when the select course 
function addStudentToCourse() {
    const courseSelection = document.getElementById("courseSelection");
    const selectedCourseId = courseSelection.value;
    console.log(selectedCourseId);

    const courses = getCoursesFromLocalStorage();
    console.log(courses); // getCoursesFromLocalStorage() fonksiyonundan dönen kursları kontrol etmek için
    const selectedCourse = courses.find(
        (course) => course.courseId === parseInt(selectedCourseId)
    );
    
    console.log(selectedCourseId);
    console.log(selectedCourse);

   
  
    // create student form
    const addStudentForm = document.createElement("div");
    addStudentForm.classList.add("addStudentForm"); // Class ekleyin
  
    addStudentForm.innerHTML = `
      <h3>Add Student for Course: ${selectedCourse.courseName}</h3>
      <label for="studentId">Student ID:</label>
      <input type="text" id="studentId" required><br><br>
      <label for="studentName">Student Name:</label>
      <input type="text" id="studentName" required><br><br>
      <label for="studentSurname">Student Surname:</label>
      <input type="text" id="studentSurname" required><br><br>
      <label for="studentMidtermFinal">Student Midterm and Final:</label>
      <input type="text" id="studentMidtermFinal" required><br><br>
      <button id="acceptButton">Accept</button>
    `;
    
  
    document.querySelector(".right_section_addStudent").appendChild(addStudentForm);
  
    // accept button
    const acceptButton = document.getElementById("acceptButton");

    acceptButton.addEventListener("click", function () {
      const studentId = document.getElementById("studentId").value;
      const studentName = document.getElementById("studentName").value;
      const studentSurname = document.getElementById("studentSurname").value;
      var studentMidtermFinal = document.getElementById("studentMidtermFinal").value;
      studentMidtermFinal = studentMidtermFinal.split(",");


      // CONTROL STATEMENTS
        // STUDENT ID'S RULES
      if (
        studentId.length !== 9 || isNaN(studentId) || studentId <= 0 
      ) {
        alert("Please enter a 9 digit positive number for Student ID.");
        return;
      }
      const studentsForId = getStudentsFromLocalStorage();
      const newStudentId = parseInt(studentId);
      // STUDENT ID'S CONTROL EACH OTHER
    for (const student of studentsForId) {
      const existingStudentId = parseInt(student.id);

    if (newStudentId === existingStudentId) {
        alert("ID's must not be the same. Please enter a different ID.");
        return;
    }
}
        // SCORE RULES
      if (
        isNaN(studentMidtermFinal[0]) || isNaN(studentMidtermFinal[1]) ||
        studentMidtermFinal[0] < 0 || studentMidtermFinal[0] > 100 ||
        studentMidtermFinal[1] < 0 || studentMidtermFinal[1] > 100
      ) {
        alert("Please enter valid scores between 0 and 100 for Midterm and Final.");
        return;
      }

      const newStudent = {
        id: parseInt(studentId),
        name: studentName,
        surname: studentSurname,
        courses: [
            {
                courseName: selectedCourse.courseName,
                midtermScore: parseInt(studentMidtermFinal[0]),
                finalScore: parseInt(studentMidtermFinal[1])
            }
        ]
      };
  
      let students = getStudentsFromLocalStorage();
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));
  
      // update student table
       createStudentTable(students);
      // acces the student table in html
        const studentTableSection = document.querySelector('.right_section_students');

        // hide the table
        studentTableSection.style.display = 'none';
      // clean the form
      document.getElementById("studentId").value = "";
      document.getElementById("studentName").value = "";
      document.getElementById("studentSurname").value = "";
      document.getElementById("studentMidtermFinal").value = "";
      // burda ekrana bir kez çıkması ve duplicateyi engellemek için sürekli divi kaldırıyorum
      const addStudentForms = document.querySelectorAll(".addStudentForm");
       addStudentForms.forEach(form => {
         form.innerHTML = "";
     });
     const addStudentForm = document.querySelector(".addStudentForm");
     addStudentForm.remove(); 
      
    });
}
