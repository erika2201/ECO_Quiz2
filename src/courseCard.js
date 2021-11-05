//Es como una clase que representa una tarjeta
//Genera el HTML necesario para visulizar mis 
import { getDatabase, ref, push, set } from 'firebase/database';

export class courseCard {
    constructor(course){
        this.course = course;   //Atributos siempre con this
    }

    //metodo para que me devuelva HTML y generar tarjeta
    render(){
        let card = document.createElement("div");
        card.className = "course-card";

        //Aquí llega la matricula del usuario (el curso)
        let course = document.createElement("p");
        course.className = "course-text"
        course.innerHTML = this.course.courseName;

        //Aquí llega la matricula del usuario (el nombre)
        let student = document.createElement("p");
        student.className = "student-text"
        student.innerHTML = this.course.student;

        //Aquí llega la matricula del usuario (el código)
        let code = document.createElement("p");
        code.className = "code-text"
        code.innerHTML = this.course.code;

        let points= document.createElement('h4');
        points.className="points-text";
        points.innerHTML = this.course.points;

         //Borrar tarjeta
         let deleteBtn=document.createElement('button');
         deleteBtn.className = "deleteBtn";
         deleteBtn.innerHTML = "x";

        //Sumar punticos
        let addPointsBtn=document.createElement('button');
        addPointsBtn.className = "addPointsBtn";
        addPointsBtn.innerHTML = "+";

        //Botonsito para eliminar
        deleteBtn.addEventListener("click", (e, ev)=>{
            //alert("me voy");
            const db = getDatabase();
            const courseRef = ref(db,'courses/'+this.course.id);
            //console.log(courseRef);
            set(courseRef, null);
        });

        //Botonsito para sumar puntos
        addPointsBtn.addEventListener ("click", (e, ev)=>{
            const db = getDatabase();
            const courseRef = ref(db,'courses/'+this.course.id+ '/points');
            set(courseRef, this.course.points+1);
        });

       
        
        card.appendChild(course);
        card.appendChild(student);
        card.appendChild(code);
        card.appendChild(points);

        card.appendChild(addPointsBtn);
        card.appendChild(deleteBtn);

        return card;
    }
}