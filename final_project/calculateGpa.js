import {getCoursesFromLocalStorage} from './localStorageOperation.js';
const courses = getCoursesFromLocalStorage();
console.log(courses); // courses dizisinin içeriğini kontrol etmek için

console.log(courses.length);


// calculate the gpa for student
export function calculateGpa(student){
    const coursesForGpa = getCoursesFromLocalStorage();
    var totalActs = 0;
    var totalScore = 0;
  //  console.log(coursesForGpa.length);
    for(var i =0; i<student.courses.length; i++){
        
        for(var j = 0 ;j<coursesForGpa.length; j++){

          //  console.log(student.courses[i].courseName);
          //  console.log(coursesForGpa[j].courseName);
            if(student.courses[i].courseName === coursesForGpa[j].courseName){
                
                    
                if(whichBased(student.courses[i].courseName) === 7){
                    
                    
                    totalScore += coursesForGpa[j].acts * letterScore(pointScaleSeven(calculatedScore(student.courses[i].midtermScore,student.courses[i].finalScore,coursesForGpa[j].midtermPercent,coursesForGpa[j].finalPercent)));
                }
                else{
                    
                    
                    totalScore += coursesForGpa[j].acts * letterScore(pointScaleTen(calculatedScore(student.courses[i].midtermScore,student.courses[i].finalScore,coursesForGpa[j].midtermPercent,coursesForGpa[j].finalPercent)));
                }
                totalActs += coursesForGpa[j].acts;
            }
        }
        
    }
    return totalScore/totalActs;
}


// note scale for course
function whichBased(courseName){
    for(var i=0; i<courses.length;i++){
        if(courseName === courses[i].courseName){
            if(courses[i].pointScale ===7){
                return 7;
            }
            else{
                return 10;
            }  
        }
    }
}

// letter note for seven scale
export function pointScaleSeven(score){
    if (score<=100 && score >=93 ){
        return "AA";
    }else if (score < 93 && score >= 86){
        return "BA";
    }else if (score < 86 && score >= 79){
        return "BB";
    }else if (score <79 && score >= 72){
        return "CB";
    }else if (score <72 && score >=65){
        return "CC";
    }else if (score <65 && score >=58){
        return "DC";
    }else if (score <58 && score >=51){
        return "DD";
    }else{
        return "FF";
    }
}
// letter note for ten scale
export function  pointScaleTen(score){
    if (score<=100 && score >=90 ){
        return "AA";
    }else if (score < 90 && score >= 80){
        return "BA";
    }else if (score < 80 && score >= 70){
        return "BB";
    }else if (score <70 && score >= 60){
        return "CB";
    }else if (score <60 && score >=50){
        return "CC";
    }else if (score <50 && score >=40){
        return "DC";
    }else if (score <40 && score >=30){
        return "DD";
    }else{
        return "FF";
    }
}
 // letter score for passed or failed
function letterScore(letter) {
    if (letter === "AA") {
        return 4.0;
    } else if (letter === "BA") {
        return 3.5;
    } else if (letter === "BB") {
        return 3.0;
    } else if (letter === "CB") {
        return 2.5;
    } else if (letter === "CC") {
        return 2.0;
    } else if (letter === "DC") {
        return 1.5;
    } else if (letter === "DD") {
        return 1.0;
    } else if (letter === "FF") {
        return 0.0;
    }
}
    // average score
export function calculatedScore(midtermScore,finalScore,midtermPercent,finalPercent){
    return (midtermScore*midtermPercent)/100 + (finalScore*finalPercent)/100;
        
}
