import {createStudentTable,getStudentsFromLocalStorage} from './localStorageOperation.js';
document.addEventListener("DOMContentLoaded", function() {
    
    
    // getting data from json
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            const studentsData = data.students; 
            localStorage.setItem('students', JSON.stringify(studentsData));
            const studentsLocal = JSON.parse(localStorage.getItem('students'));
            createStudentTable(studentsLocal);
            console.log(studentsLocal);
            console.log(studentsLocal[0]);
        })
        .catch(error => console.error('Error:', error));


        
        

    

        // SEARCH METHOD
    document.querySelector('.search_button').addEventListener('click', function() {
        const searchInput = document.querySelector('.search_student input').value.toLowerCase();
         if(searchInput.length<3){
            alert('Please make sure the name you enter is at least 3 letters long.');
            
        }
        const students = Array.from(document.querySelectorAll('#studentTableBody tr'));
        let found = false; 
        students.forEach(student => {
            const name = student.querySelectorAll('td')[1].textContent.toLowerCase(); // name column
            const surname = student.querySelectorAll('td')[2].textContent.toLowerCase(); // surname column
            student.style.display = 'none'; // all the students are hiden
            // input include name and surname
            if (name.includes(searchInput) || surname.includes(searchInput)) {
                 
                student.style.display = 'table-row';
                found = true; // student has been founded
            }  
        });

        // if the student couldn't found
        if (!found) {
            alert('Student not found!');
            return;
        }
    });
     // DELETE METHOD
    document.querySelector('.delete_button').addEventListener('click', function () {
        const deleteInput = parseInt(document.querySelector('.delete_student input').value);
        let students = getStudentsFromLocalStorage();

        const studentToDelete = students.find(student => student.id === deleteInput); // find the student by id
        console.log('Delete Input:', deleteInput);
        console.log('student id: ', students.id);
        if (!studentToDelete) {
            alert('Student not found!');
            return;
        }

        students = students.filter(student => student.id !== deleteInput); // filter the student by id

        localStorage.setItem('students', JSON.stringify(students)); // updated student write the local storage

        const studentTableBody = document.getElementById('studentTableBody');
        studentTableBody.innerHTML = ''; // clean the table

        createStudentTable(students); // add the table updated student
    });
      
    
// UPDATE METHOD
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("update_button")) {
        const studentId = event.target.getAttribute("data-student-id");
        handleUpdate(studentId);
    }
});

function handleUpdate(studentId) {
    console.log('update tuşuna basabildim');
    const students = getStudentsFromLocalStorage();
    const studentToUpdate = students.find(student => student.id === parseInt(studentId));

    const updateForm = createUpdateForm(studentToUpdate);

    const rightSection = document.querySelector(".right_section");
    const right_section_students = document.querySelector(".right_section_students");
    right_section_students.style.display = "none";

    rightSection.appendChild(updateForm);
}

function createUpdateForm(studentToUpdate) {
    const updateForm = document.createElement("div");
    updateForm.classList.add("updateForm");

    updateForm.innerHTML = `
        <h3>Update Student</h3>
        <label for="updateId">Student Id:</label>
        <input type="number" id="updateId" value="${studentToUpdate.id}" required><br>
        <label for="updateName">Student Name:</label>
        <input type="text" id="updateName" value="${studentToUpdate.name}" required><br>
        <label for="updateSurname">Student Surname:</label>
        <input type="text" id="updateSurname" value="${studentToUpdate.surname}" required><br>
        <h4>Courses:</h4>
    `;

    studentToUpdate.courses.forEach(course => {
        updateForm.innerHTML += `
            <label for="${course.courseName}_midterm">${course.courseName} Midterm And Final:</label>
            <input type="number" id="${course.courseName}_midterm" value="${course.midtermScore}" min="0" max="100" required>
            <input type="number" id="${course.courseName}_final" value="${course.finalScore}" min="0" max="100" required><br><br>
        `;
    });

    updateForm.innerHTML += `<button id="saveButton">Save</button>`;

    return updateForm;
}

document.addEventListener("click", function(event) {
    if (event.target.id === "saveButton") {
        handleSaveButton();
    }
});
    // handle save button
function handleSaveButton() {
    const students = getStudentsFromLocalStorage();
    const studentId = parseInt(document.getElementById("updateId").value);
    const updatedName = document.getElementById("updateName").value;
    const updatedSurname = document.getElementById("updateSurname").value;

    const updatedStudents = students.map(student => {
        if (student.id === studentId) {
            student.name = updatedName;
            student.surname = updatedSurname;

            student.courses.forEach(course => {
                const midtermScore = document.getElementById(`${course.courseName}_midterm`).value;
                const finalScore = document.getElementById(`${course.courseName}_final`).value;
                if (isNaN(midtermScore) || isNaN(finalScore) ||
                    midtermScore < 0 || midtermScore > 100 ||
                    finalScore < 0 || finalScore > 100) {
                    alert("Please enter valid scores between 0 and 100 for Midterm and Final.");
                    return; 
                }

                course.midtermScore = parseInt(midtermScore);
                course.finalScore = parseInt(finalScore);
            });
        }
        return student;
    });

    localStorage.setItem('students', JSON.stringify(updatedStudents));

    createStudentTable(updatedStudents);
    // yeni bir update form ekleyeceğimiz için güncellediğimiz update form div ini kaldırmak için
    const updateForm = document.querySelector(".updateForm");
    updateForm.remove(); 

}  


});


