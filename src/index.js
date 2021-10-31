
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, get, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);


//REGISTRAR TAREA
//Metodo registrar tarea
function taskRegister (task){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'tasks/' + task.descriptiontask);

    set(dbRef, task);

}

//Instancias de los objetos
const descriptiontask = document.getElementById("descriptiontask");
const addTaskBtn = document.getElementById("addTaskBtn");


//Metodo creación de tarea como un objeto
const eventRegister = (e, event) =>{
    //Si los campos tienen algo
    if(descriptiontask.value!=""){
        //Cree el objeto, es lo que le envip al firebase
        const task = {
            descriptiontask: descriptiontask.value,
        }
        taskRegister(task);
        descriptiontask.value='';
    }else{
        //Sino avise que debe llenar los campos
        alert("Ingresa una tarea");
    }
}


//Clicks
addTaskBtn.addEventListener('click', eventRegister);



