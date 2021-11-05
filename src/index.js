
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, get, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";
import { courseCard } from "./courseCard";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//Matricular
//Metodo registrar curso
function courseRegister (course){
    //Obtener base de datos
    const db = getDatabase();
    const newCourseRef = push (ref(db, 'courses'));

    //creo el post en la posición id
    //Inyectar el id
    course["id"] = newCourseRef.key;
    set(newCourseRef, course);
}

//Obtener los cursos
function getCourses(){
    const db = getDatabase();
    const dbRef =ref(db, 'courses');
    
    //Leer (algo parecido a un observer)
    onValue(dbRef, (snapshot) =>{
        const data = snapshot.val();
        currentList(data);
    });
}

//Aquí sucede la magia
function currentList(info){
    if(info){
        //Recibe info aquì
        listNB.innerHTML = "";
        listBP.innerHTML = "";
        listBO.innerHTML = "";
        //Me da el arreglo de las llaves de un objeto
        Object.keys(info).forEach((k,index)=>{
            console.log(k, index);
            //Crear objeto de la clase courseCard
            const course = new courseCard(info[k]);
           
            //Recibo bella info y condicionales para pasar al otro nivel
            if(info[k].points<=5){
                listNB.appendChild(course.render());
            }else if(info[k].points>5 && info[k].bonus<=10){
                listBP.appendChild(course.render());
            }else if(info[k].points>10){
                listBO.appendChild(course.render());
            }
        });
    }else{
        //Sino llena pues se muestra vacio
        listNB.innerHTML = "Vacio";
        listBP.innerHTML = "Vacio";
        listBO.innerHTML = "Vacio";
    }
}

//Instancias de los objetos
const student = document.getElementById("student");
const code = document.getElementById("code");
const courseName = document.getElementById("courseName");
const addCourseBtn = document.getElementById("addCourseBtn");

const listNB = document.getElementById("listNB");
const listBP = document.getElementById("listBP");
const listBO = document.getElementById("listBO");



//Metodo creación de curso como un objeto
const eventCourse = (e, event) =>{
    //Si los campos tienen algo
    if(student.value!="" || code.value!="" || courseName.value!="" ){
        //Cree el objeto, es lo que le envip al firebase
        const course = {
            student: student.value,
            code: code.value,
            courseName: courseName.value,
            points: 0
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
addCourseBtn.addEventListener('click', eventCourse);
getCourses();


