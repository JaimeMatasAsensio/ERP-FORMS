"use strict";
var liInicio = document.getElementById("inicio");
var liTiendas = document.getElementById("navTiendas");
var liProductos = document.getElementById("navProductos");
var liCategorias = document.getElementById("navCategorias");

liInicio.addEventListener("click",initPopulate);

liTiendas.addEventListener("mouseover", menuDropDown(liTiendas));
liTiendas.addEventListener("mouseleave", removeDrop);

liProductos.addEventListener("mouseover", menuDropDown(liProductos));
liProductos.addEventListener("mouseleave", removeDrop);

liCategorias.addEventListener("mouseover", menuDropDown(liCategorias));
liCategorias.addEventListener("mouseleave", removeDrop);


function menuDropDown(liId)
/*Funcion que muestra el menu desplegable en cada opcion*/
{
  
  return function(){

    var location = document.getElementById("drop");
    
    if(!location){
      var divDrop = document.createElement("div");
      divDrop.className = "drop-cont";
      divDrop.setAttribute("id","drop");
      liId.appendChild(divDrop);

      unfoldingDiv(divDrop);

      switch (liId.id) {
        case "navTiendas":
          
          var modificarTienda = document.createElement("a");
          modificarTienda.appendChild(document.createTextNode("Modificar Tienda"));
          divDrop.appendChild(modificarTienda);
          
          var añadirTienda = document.createElement("a");
          añadirTienda.appendChild(document.createTextNode("Añadir Tienda"));
          divDrop.appendChild(añadirTienda);
          
          var eliminarTienda = document.createElement("a");
          eliminarTienda.appendChild(document.createTextNode("Eliminar Tienda"));
          divDrop.appendChild(eliminarTienda);
  
          break;
        
        case "navCategorias":
          
          var modificarCategoria = document.createElement("a");
          modificarCategoria.appendChild(document.createTextNode("Modificar Categoria"));
          divDrop.appendChild(modificarCategoria);
          
          var añadirCategoria = document.createElement("a");
          añadirCategoria.appendChild(document.createTextNode("Añadir Categoria"));
          divDrop.appendChild(añadirCategoria);
          
          var eliminarCategoria = document.createElement("a");
          eliminarCategoria.appendChild(document.createTextNode("Eliminar Categoria"));
          divDrop.appendChild(eliminarCategoria);
  
          break;
        
        case "navProductos":
          
          var modificarProducto = document.createElement("a");
          modificarProducto.appendChild(document.createTextNode("Modificar Producto"));
          divDrop.appendChild(modificarProducto);
          
          var añadirProducto = document.createElement("a");
          añadirProducto.appendChild(document.createTextNode("Añadir Producto"));
          divDrop.appendChild(añadirProducto);
          
          var eliminarProducto = document.createElement("a");
          eliminarProducto.appendChild(document.createTextNode("Eliminar Producto"));
          divDrop.appendChild(eliminarProducto);
  
          break;
      }
  
    }

  }
}


function removeDrop()
/*Funcion que remueve el menu desplegable mostrado */
{
  var location = document.getElementById("drop");
  if(location){
    location.parentElement.removeChild(location);
  }

}

function unfoldingDiv(divDrop){

  var id = setInterval(grow,10);

  function grow(){

    var height = divDrop.offsetHeight;
    if(height > 134){
      var contenido = divDrop.children;
      for(var i = 0; i < contenido.length ; i++){
        contenido[i].style.display = "block";
      }
      clearInterval(id);
    }else{

      height += 5; 
      divDrop.style.height = height + "px";
    }
  }

}
