
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, get, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//Matricular
//Metodo registrar tarea
function courseRegister (course){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'courses/' + course.student + course.code + course.courseName);

    set(dbRef, course);

}

//Instancias de los objetos
const student = document.getElementById("student");
const code = document.getElementById("code");
const courseName = document.getElementById("courseName");
const addCourseBtn = document.getElementById("addCourseBtn");


//Metodo creación de tarea como un objeto
const eventRegister = (e, event) =>{
    //Si los campos tienen algo
    if(student.value!="" || code.value!="" || courseName.value!="" ){
        //Cree el objeto, es lo que le envip al firebase
        const course = {
            student: student.value,
            code: code.value,
            courseName: courseName.value
        }
        courseRegister(course);
        student.value='';
        code.value='';
        courseName.value='';
    }else{
        //Sino avise que debe llenar los campos
        alert("Ingresa todos los campos");
    }
}


//Clicks
addCourseBtn.addEventListener('click', eventRegister);



