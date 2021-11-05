
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, get, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";
import { courseCard } from "./courseCard";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//Matricular
//Metodo registrar tarea
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
        //Todo esto sirve para pasar las tarjetas entre sì
        noBonus.innerHTML = "";
        let sinBono=document.createElement("h2");
        sinBono.innerHTML="Sin bono"
        noBonus.appendChild(sinBono);

        silverBonus.innerHTML="";
        let bonoPlata=document.createElement("h2");
        bonoPlata.innerHTML="Bono plata +0,3";
        silverBonus.appendChild(bonoPlata);

        goldBonus.innerHTML="";
        let bonoOro=document.createElement("h2");
        bonoOro.innerHTML="Bono oro +0,5";
        goldBonus.appendChild(bonoOro);

        //Me da el arreglo de las llaves de un objeto
        Object.keys(info).forEach((k,index)=>{
            console.log(k, index);
            //Crear objeto de la clase courseCard
            const course = new courseCard(info[k]);
           
            //Recibo bella info y condicionales para pasar al otro nivel
            if(info[k].points<=5){
                noBonus.appendChild(course.render());
            }else if(info[k].points>5 && info[k].bonus<=10){
                silverBonus.appendChild(course.render());
            }else if(info[k].points>10){
                goldBonus.appendChild(course.render());
            }
        });
            
    }else{
        //Texticos importantes, aquì en serio sucede la magiaaa
        let regNoBonus=document.createElement("p");
        regNoBonus.innerHTML="Vacio";
        let regBonusPlata=document.createElement("p");
        regBonusPlata.innerHTML="Vacio";
        let regBonusOro=document.createElement("p");
        regBonusOro.innerHTML="Vacio";

        noBonus.innerHTML="";
        let sinBono=document.createElement("h2");
        sinBono.innerHTML="Sin bono"
        noBonus.appendChild(sinBono);
        noBonus.appendChild(regNoBonus);

        silverBonus.innerHTML="";
        let bonoPlata=document.createElement("h2");
        bonoPlata.innerHTML="Bono plata +0,3"
        silverBonus.appendChild(bonoPlata);
        silverBonus.appendChild(regBonusPlata);

        goldBonus.innerHTML="";
        let bonoOro=document.createElement("h2");
        bonoOro.innerHTML="Bono oro +0,5";
        goldBonus.appendChild(bonoOro);
        goldBonus.appendChild(regBonusOro);
    }
}

//Instancias de los objetos
const student = document.getElementById("student");
const code = document.getElementById("code");
const courseName = document.getElementById("courseName");
const addCourseBtn = document.getElementById("addCourseBtn");

const noBonus = document.getElementById("noBonus");
const silverBonus = document.getElementById("silverBonus");
const goldBonus = document.getElementById("goldBonus");


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


