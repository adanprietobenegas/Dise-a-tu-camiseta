let contenedor = document.getElementById("contenedor");

document.getElementById('camiseta').setAttribute("draggable", "false");

function recuperarID(id){ // Función para recuperar el id de la imagen que estamos dropeando y ponerlo como texto
  let imagenes = document.querySelectorAll('.img'); 
    let idEncontrado = ''; 

    imagenes.forEach(img => {
        if (img.src.includes(id)) { // Comparo el src de todas las img mediante event.dataTransfer.getData("text/plain") y recupero el id de la que coincida
            idEncontrado = img.id; 
        }
    });
    return idEncontrado;
}

function cambiarImagen() { // Funcion que recoge el input type radio que está marcado, por defecto he puesto el negro, si el valor del input marcado es "blanco" cambiara la img a white.png y viceversa
  let radioSeleccionado = document.querySelector('input[name="color"]:checked');


  if (radioSeleccionado) { // Aunque por defecto viene marcado el negro y siempre habrá alguno marcado, no me funcionaba sin el if de que haya alguno marcado 
      let valorActivo = radioSeleccionado.value;

      if (valorActivo === "negro") {
        document.getElementById('camiseta').src = "black.png"; 
      } else {
        document.getElementById('camiseta').src = "white.png"; 
      }
  } 
}



let crearTitulo = document.createElement("div");  // Este es el elemento creado que mostrara lo que escribamos por el input de texto
       crearTitulo.id = "textoTitulo";
       contenedor.append(crearTitulo);


       function updateX() { // Funcion para mover el texto acorde al slider del eje X, horizontal
        let value = parseInt(document.getElementById('x').value);  // Cojo el valor del slider, por defecto es 0 y va desde -20 a 20 (value="0" min="-20" max="20" step="1")
        let valorPredeterminado = 250; // El valor de la posicion establecido en el CSS es 250 px
        let newval = valorPredeterminado + value; 

        crearTitulo.style.left = `${newval}px`; // Se establece el nuevo valor 
        
    } 
    function updateY() { // Igual que arriba pero para eje Y, vertical
        let value = parseInt(document.getElementById('y').value);
        let valorPredeterminado = 250;
        let newval = valorPredeterminado + value;
       
        crearTitulo.style.top = `${newval}px`;
        
    }



function cambiartitulo() {  // Función para establecer los datos introducidos en el campo de texto
    crearTitulo.innerHTML = "";
      crearTitulo.innerHTML = document.getElementById("titulo").value;
}

document.getElementById('x').addEventListener('input', updateX); // Se actualiza la posición horizontal a medida que se mueve el slider
document.getElementById('y').addEventListener('input', updateY); // Se actualiza la posición vertical a medida que se mueve el slider


document.getElementById("titulo").addEventListener('keyup',cambiartitulo); // Se ejecuta cuando se suelta una tecla, así se puede ir actualizando con cada caracter introducido
document.getElementById("colorBl").addEventListener('click', cambiarImagen);
document.getElementById("colorNe").addEventListener('click', cambiarImagen);



document.getElementById("Corazón").addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.src);    
  });


  contenedor.addEventListener('dragover',(event)=>{
    event.preventDefault();
    })



    contenedor.addEventListener('drop',(event)=>{

      if (contenedor.children.length <= 2) { // Esta condicion es para que se creen los elementos 1 sola vez y la siguiente vez se modifique. 
        //La primera vez que dropeamos una imagen el contenedor solo tendrá la imagen de la camiseta y el titulo que se encuentra creado pero vacio hasta que se escriba algo en el input


        let imgcont = document.createElement("img"); // Creo la imagen pequeña y le añado el id . El src será de la imagen que hayamos dragado
        imgcont.src = event.dataTransfer.getData("text/plain");
        imgcont.id = "chico";
        imgcont.setAttribute("draggable", "false");

        

        let imgcont2 = document.createElement("img"); // Creo la imagen grande y le añado el id 
        imgcont2.src = event.dataTransfer.getData("text/plain");
        imgcont2.id = "grande";
        imgcont2.setAttribute("draggable", "false");


        let texto = document.createElement("div"); // Este sera el texto de abajo de la camiseta que será el valor del id
        texto.id = "texto";
        texto.innerHTML = recuperarID(event.dataTransfer.getData("text/plain")); // Llamo a la funcion para recuperar el id de la imagen pasandole como parametro el src de la imagen dropeada

    
        contenedor.append(imgcont,imgcont2,texto);
        
      }else{ //Si los elementos ya están creados, simplemento los modifico recuperandolos por su id
         document.getElementById("grande").src = event.dataTransfer.getData("text/plain");
         document.getElementById("chico").src = event.dataTransfer.getData("text/plain");
        
        document.getElementById("texto").innerHTML = "";
        document.getElementById("texto").innerHTML = recuperarID(event.dataTransfer.getData("text/plain"));

      }
        })




    