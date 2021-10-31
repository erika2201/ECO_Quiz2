const firebaseConfig = {
  apiKey: "AIzaSyASIwT2KJuJ1DNWIcP9fwtD_zFi_JA7sfg",
  authDomain: "eco-quiz2.firebaseapp.com",
  databaseURL: "https://eco-quiz2-default-rtdb.firebaseio.com",
  projectId: "eco-quiz2",
  storageBucket: "eco-quiz2.appspot.com",
  messagingSenderId: "982590350414",
  appId: "1:982590350414:web:af1367005fab9c8bb84f1f"
};

  export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }