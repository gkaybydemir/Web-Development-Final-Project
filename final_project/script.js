import {createCourseTable, getCoursesFromLocalStorage,getStudentsFromLocalStorage} from './localStorageOperation.js';
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM Loaded!");
  // variable definitions of the tabs in the right section
  const rightSection = document.querySelector(".right_section");
  rightSection.style.display = 'none';
  const infoSection = document.querySelector('.right_section_info');
  const rightSectionStudents = document.querySelector(".right_section_students");
  const rightSectionCourses = document.querySelector(".right_section_courses");
  const rightSectionAddStudent = document.querySelector(".right_section_addStudent");
  
  
  // function used to display the information tab
  function displayInfo() {
    infoSection.style.display = 'block';
    rightSectionStudents.style.display = "none";
    rightSectionCourses.style.display = "none";
    rightSectionAddStudent.style.display = "none";
  }
  // function used to display add student selected course
  function displayAddStudent() {
    rightSectionAddStudent.style.display = "block";
    rightSectionStudents.style.display = "none";
    infoSection.style.display = 'none';
    rightSectionCourses.style.display = "none";

  }
  // function used to display courses(aslında courses olması lazım fakat ismini değiştirmeye zamanım kalmadı özür dilerim)
  function displaySelectCourse() {
    rightSectionCourses.style.display = "block";
    infoSection.style.display = 'none';
    rightSectionStudents.style.display = "none";
    rightSectionAddStudent.style.display = "none";
  }
  
  // function used to display students and some buttons(update,delete,search)
  function displayStudents() {
    rightSectionStudents.style.display = "block";
    infoSection.style.display = 'none';
    rightSectionCourses.style.display = "none";
    rightSectionAddStudent.style.display = "none";
  }

// function that manages the click action of menu links
  function handleLinkClicks(event) {
    event.preventDefault();
    const links = document.querySelectorAll('.left_section a');
    links.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    

    const rightSection = document.querySelector(".right_section");
    const linkText = this.innerText.trim().split("\n")[0];
    if (linkText === "Info") {
      displayInfo();
    } else if (linkText === "Add Student") {
      displayAddStudent();
    } else if (linkText === "Courses") {
      
      displaySelectCourse();
    } else if (linkText === "Students") {
      
      displayStudents();
    } 
      
  }
// function that listens for each menu link click event
  const links = document.querySelectorAll('.left_section a');
  links.forEach((link, index) => {
    link.addEventListener('click', function(event) {
      handleLinkClicks.call(this, event, index);
      rightSection.style.display = 'block';
    });
  });
});
