import {calculateGpa,calculatedScore,pointScaleSeven,pointScaleTen} from './calculateGpa.js';

// for using student database from local storage
export function getStudentsFromLocalStorage() {
    const studentsLocal = localStorage.getItem('students');
    if (studentsLocal) {
      return JSON.parse(studentsLocal);
    } else {
      return []; 
    }
  }


// for using course database from local storage
export function getCoursesFromLocalStorage(){
    const coursesLocal = localStorage.getItem('courses');
    if(coursesLocal){
        return JSON.parse(coursesLocal);
    }
    else{
        return []; 
    }
}

  // create course table and export for other js files
  export function createCourseTable(courses) {
    const courseTableBody = document.getElementById('courseTableBody');
    courseTableBody.innerHTML = '';

    courses.forEach(course => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${course.courseId}</td>
            <td>${course.courseName}</td>
            <td>${course.instructorName}</td>
            <td>%${course.midtermPercent} and %${course.finalPercent}</td>
            <td>${course.acts}</td>
        `;
        courseTableBody.appendChild(row);
    });

    document.querySelector(".right_section_courses").style.display = "block";
}


  // create student table in that function and export for other js files
  export function createStudentTable(students) {
    const studentTableBody = document.getElementById('studentTableBody');
    console.log(studentTableBody); // kontrol ediyom
    studentTableBody.innerHTML = '';

    students.forEach(student => {
        let row = document.createElement('tr');
        let courseDetails = '';

        student.courses.forEach(course => {
            const midtermGrade = course.midtermScore;
            const finalGrade = course.finalScore;
            var course = getCourseByName(course.courseName);
            const courseStatus = calculateCourseStatus(midtermGrade, finalGrade, course.midtermPercent, course.finalPercent, course);

            courseDetails += `${course.courseName} (Midterm: ${midtermGrade}, Final: ${finalGrade}, Status: ${courseStatus})`;
        });

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name} ${student.surname}</td>
            <td>${calculateGpa(student).toFixed(2)}</td>
            <td>${courseDetails}</td>
            <td><button class="update_button" data-student-id="${student.id}">Update</button></td>
        `;
        studentTableBody.appendChild(row);
    });
    document.querySelector(".right_section_students").style.display = "block";
}

    // helper function that returns the relevant course according to the course name 
function getCourseByName(courseName) {
    const courses = getCoursesFromLocalStorage();
    return courses.find(course => course.courseName === courseName);
}

    // student pass or failed 
function calculateCourseStatus(midtermGrade, finalGrade, midtermPercent, finalPercent, course) {
    var midtermPercent = course.midtermPercent;
    var finalPercent = course.finalPercent;
    var averageGrade = calculatedScore(midtermGrade,finalGrade,midtermPercent, finalPercent);
    if (course.pointScale === 7){
        var letterGrade = pointScaleSeven(averageGrade);
    }else{
        var letterGrade = pointScaleTen(averageGrade);
    }
    console.log(letterGrade);
    return letterGrade === "FF" ? 'FAILED' : 'PASSED';
}