// Variables
const inputs = document.getElementById('inputs');
const inputWrapper = document.getElementById('inputWrapper');
const addCourse = document.getElementById('add-course');
const calculate = document.getElementById('calc');
const courseCode = document.querySelectorAll('#course-code');
const courseGrade = document.querySelectorAll('#course-grade');
const creditUnit = document.querySelectorAll('#credit-unit');
const alert = document.getElementById('alert');
const resultEl = document.getElementById('resultEl');


// Course object
class Course {
    constructor(courseCode, courseGrade, creditUnit) {
        this.courseCode = courseCode;
        this.courseGrade = courseGrade;
        this.creditUnit = creditUnit;
    }

    calculator = (courses, grades, units) => {
        let totalQualityPoints;
        let totalCreditUnits;
        let TQP = [];
        let result;

        // Getting Total Quality Points
        for(let i = 0; i < grades.length; i++){
            TQP.push(grades[i] * units[i]);
        }
        
        // Getting the sum of Quality Points
        // grade point * credit unit
        totalQualityPoints = TQP.reduce((prevVal,cureVal) => {
            return prevVal + cureVal
        }, 0);
        
        // Getting the Total of Credit Units
        totalCreditUnits = units.map(unit => {
            return Number(unit)
        }).reduce((prevVal,cureVal) => {
            return prevVal + cureVal
        }, 0);

        // GPA 
        result =  (totalQualityPoints / totalCreditUnits).toFixed(2);
        
        // Display GPA
        resultEl.style.display = 'block';
        resultEl.textContent = `Your GPA: ${result}`;
        setTimeout(() => {
            resultEl.style.display = 'none';
        }, 5000)
    }

}

// Instantiating a Course Object
const course = new Course(courseCode.value, courseGrade.value, creditUnit.value)

// Cloning Course Fields
addCourse.addEventListener('click', () => {
    const newInputs = inputs.cloneNode(true);
    inputWrapper.appendChild(newInputs);
})

// Validating Input fields && Passing it for Calcultion
calculate.addEventListener('click', () => {
    const courseCode = document.querySelectorAll('#course-code');
    const courseGrade = document.querySelectorAll('#course-grade');
    const creditUnit = document.querySelectorAll('#credit-unit');
    
    let courseCodes = []
        courseGrades = []
        creditUnits = [];

    if(courseCode.length > 0 || courseGrade.length > 0 || creditUnit.length > 0){
        for(let i = 0; i < courseCode.length; i++){
            if(courseGrade[i].value !== 'select' && courseCode[i].value !== '' && (creditUnit[i].value !== '' && creditUnit[i].value !== 'e')){
                courseCodes.push(courseCode[i].value);
                courseGrades.push(courseGrade[i].value);
                creditUnits.push(creditUnit[i].value);
            }else{
                 alert.style.display ='block';
                return setTimeout(() => {
                    alert.style.display = 'none';
                }, 3000)
            }
        }

        course.calculator(courseCodes, courseGrades, creditUnits)
    }
})

// Deleting Course Input
inputWrapper.addEventListener('click', (e) => {
    if(e.target.id === 'delete'){
        e.target.parentElement.parentElement.remove()
    }
})