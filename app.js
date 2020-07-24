// Variables
const inputs = document.getElementById('inputs');
const inputWrapper = document.getElementById('inputWrapper');
const addCourse = document.getElementById('add-course');
const calculate = document.getElementById('calc');
const courseCode = document.querySelectorAll('#course-code');
const courseGrade = document.querySelectorAll('#course-grade');
const creditUnit = document.querySelectorAll('#credit-unit');
const delBtn = document.getElementById('delete');
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
        
        totalQualityPoints = TQP.reduce((prevVal,cureVal) => {
            return prevVal + cureVal
        }, 0);
        
        // Getting the Total of Credit Units
        totalCreditUnits = units.map(unit => {
            return Number(unit)
        }).reduce((prevVal,cureVal) => {
            return prevVal + cureVal
        }, 0);

        result =  (totalQualityPoints / totalCreditUnits).toFixed(2);
        resultEl.style.display = 'block';
        resultEl.textContent = `Your GPA: ${result}`;
        setTimeout(() => {
            resultEl.style.display = 'none';
        }, 5000)
    }

}

const course = new Course(courseCode.value, courseGrade.value, creditUnit.value)

addCourse.addEventListener('click', () => {
    const newInputs = inputs.cloneNode(true);
    inputWrapper.appendChild(newInputs);
})

calculate.addEventListener('click', () => {
    const courseCode = document.querySelectorAll('#course-code');
    const courseGrade = document.querySelectorAll('#course-grade');
    const creditUnit = document.querySelectorAll('#credit-unit');
    
    let courseCodes = []
        courseGrades = []
        creditUnits = [];

    if(courseCode.length > 0 || courseGrade.length > 0 || creditUnit.length > 0){
        for(let i = 0; i < courseCode.length; i++){
            if(courseGrade[i].value !== '' && courseCode[i].value !== '' && (creditUnit[i].value !== '' && creditUnit[i].value !== 'e')){
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

delBtn.addEventListener('click', (e) => {
    
})