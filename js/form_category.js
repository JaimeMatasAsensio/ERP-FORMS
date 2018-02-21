"use strict";
/*Documento para implementar los formularios que modificaran las categorias*/


function loadFormAddCategory()
/*Funcion que carga el formulario de añadir categorias bien a una tienda o al storeHouse*/
{
  if(document.cookie){
    clearMainCont();
    console.log("Acceso a formularios correcto!");
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}






//Funciones para escribir resultados del formulario en la ventana modal

function WriteErrorModal(errorMessage)
/*Funcion que escribe un mensaje de error en la ventana modal*/
{
  //Borramos el contenido del modal
  clearModal();
  
  //escribimos en el modal
  var header = document.createElement("h3");
  header.setAttribute("id","headmodal-error");
  header.appendChild(document.createTextNode("Error!"));
  IdModalHeader.appendChild(header);
  
  var divModal = document.createElement("div");
  divModal.className = "text-center";
  IdModalBody.appendChild(divModal);
  
  var texto = document.createElement("p");
  texto.className = "textomodal-error";
  texto.appendChild(document.createTextNode(errorMessage));
  divModal.appendChild(texto);
  
  var texto1 = document.createElement("p");
  texto1.className = "textomodal";
  var d = new Date();
  var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
  texto1.appendChild(document.createTextNode(fecha));
  divModal.appendChild(texto1);
}
