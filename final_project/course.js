import {createCourseTable,getCoursesFromLocalStorage} from './localStorageOperation.js';
document.addEventListener("DOMContentLoaded", function() {
    
    // keep course data from json
    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            const coursesData = data.courses; // coursesData olarak yeni bir değişken oluştur
            localStorage.setItem('courses', JSON.stringify(coursesData));
            const coursesLocal = JSON.parse(localStorage.getItem('courses'));
            createCourseTable(coursesLocal);
            console.log(coursesLocal);
            console.log(coursesLocal[0]);
        })
        .catch(error => console.error('Error:', error));
       // const courses = getCoursesFromLocalStorage();
        
       // createCourseTable(courses);




        // add new course
        const courseAddForm = document.getElementById('accept_button');
        
        courseAddForm.addEventListener('click', function(event) {
            
        event.preventDefault(); // Formun normal davranışını engelle

        // Form elemanlarından verileri al
        const courseName = document.getElementById('course_name').value;
        const courseId = document.getElementById('course_id').value;
        const instructorName = document.getElementById('course_instructor').value;
        const midtermFinal = document.getElementById('course_midterm_final').value;
        const acts = document.getElementById('course_acts').value;
        const pointScale = document.getElementById('course_pointScale').value;
        console.log(courseName);
        console.log(typeof(courseId));
        console.log(instructorName);
        console.log(midtermFinal);
        console.log(acts);
        console.log(pointScale);


        // CONTROL STATEMENTS

        if (courseName.trim() === '') {
            alert('Please enter a course name');
            return;
        }
        
        const newCourseId = parseInt(courseId);
        const courses_control = getCoursesFromLocalStorage(); // iki kere yazmak zorunda kaldım.

    // CONTROL THE COURSE ID'S SIMILARITY
       // console.log(courses);
        console.log(courses_control.length);
            for (let i = 0; i < courses_control.length; i++) {
                const existingCourseId = parseInt(courses_control[i].courseId);

                    if (newCourseId === existingCourseId) {
                        alert('Course id must not equal to each other!');
                        return;
                }
            }
    
        // Control the course id numbers
        if(parseInt(courseId.trim())<0){
            alert('Course id must be positive number');
            return;
        }
        else if(courseId.trim() === ''){
            alert('Please enter a course id');
            return;
        }
        // MIDTERM PERCENT AND FINAL PERCENT CONTROL
        const midtermFinalArray = midtermFinal.split(',');
        console.log(midtermFinalArray[0]);
        if (parseInt(midtermFinalArray[0]) > 100 || parseInt(midtermFinalArray[1]) > 100 || parseInt(midtermFinalArray[0]) < 0 || parseInt(midtermFinalArray[1]) < 0) {
            alert("Percents must be between 0-100");
            return;
        }

        // Eğer iki parça elde edilirse ve her ikisi de rakamsa kontrol et
        // if 
        if (midtermFinalArray.length === 2 && !isNaN(midtermFinalArray[0]) && !isNaN(midtermFinalArray[1])) { //midtermfinalarray[0] is midterm percent number midtermfinalarray[1] is final percent number
            const midtermPercent = parseInt(midtermFinalArray[0]);
            const finalPercent = parseInt(midtermFinalArray[1]);

            if (midtermPercent + finalPercent !== 100) {
            alert("Midterm percent and final percent should sum up to 100.");
            return;
           
            }
        } else {
            alert("Please enter the values in 'midterm percent,final percent' format.");
            return;
           
            }


        // create new course list
        const newCourse = {
            courseId: parseInt(courseId),
            courseName: courseName,
            instructorName: instructorName,
            midtermPercent: parseInt(midtermFinal.split(',')[0].trim()),
            finalPercent: parseInt(midtermFinal.split(',')[1].trim()),
            acts: parseInt(acts),
            pointScale: parseInt(pointScale)
        };

        
        // take the courses from localstorage
        const courses = getCoursesFromLocalStorage();

        // add new course
        courses.push(newCourse);
        const selectOptions = document.getElementById("courseSelection"); // yeni eklenen dersi add student kısmına option olarak eklemek için yaptım
        const option = document.createElement('option'); 
            option.value = courseId;
            option.textContent = courseName;
            selectOptions.appendChild(option);

        
        // save the updated course list to localstore
        localStorage.setItem('courses', JSON.stringify(courses));

        // update the course table
        createCourseTable(courses);    
          
    });


 });