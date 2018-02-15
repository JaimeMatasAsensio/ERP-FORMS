"use strict";
/*Documento para implementar los Objetos Usuario*/

//Bloque de errores para los objetos Usuario

function NoNameForUser()
/*Error lanzado cuando el valor del nombre esta vacio */
{
  this.name = "NoNameForUser.";
  this.message = "You must introduce a name user";
}
NoNameForUser.prototype = new TemplateError();
NoNameForUser.prototype.constructor = NoNameForUser;
NoNameForUser.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

function NopassForUser()
/*Error lanzado cuando el valor del nombre esta vacio */
{
  this.name = "NoPassForUser.";
  this.message = "You must introduce a pass user";
}
NopassForUser.prototype = new TemplateError();
NopassForUser.prototype.constructor = NopassForUser;
NopassForUser.prototype.toString = function(){
  return TemplateError.prototype.toString.call(this);
}

//---Bloque del Constructor Usuario

var IdUsuario = (function ()
//Generador de indces unicos para los objetos Usuario
{
  var IdUsuario = 0;
  return (function (){
    return ++IdUsuario;
  })
})();

function User(nombre,pass){
  //Comprobacion de creacion de instancia del objeto user
  if(!(this instanceof (User))) throw new ConstructorCalledFunction();

  if(!nombre)throw new NoNameForUser();
  if(!pass)throw new NopassForUser();
  
  var _IdUsuario = IdUsuario();
  var _nombre = nombre;
  var _pass = pass;

  Object.defineProperty(this,"IdUsuario",{
    get: function(){return _IdUsuario}
  });

  Object.defineProperty(this,"nombre",{
    get: function(){return _nombre}
  });

  Object.defineProperty(this,"pass",{
    get: function(){return _pass}
  });
}
User.prototype = {};
User.prototype.constructor = User;
User.prototype.toString = function(){
  return "IdUser: "+this.IdUsuario+" .Nombre: "+this.nombre+". pass: "+this.pass;
}

//---Bloque funciones para comprobar el login, insertar y leer una cookie
var usuario = new User("prueba","prueba");//instancia de prueba de un usuario
var usuario1 = new User("Jaime","prueba");//instancia de prueba de un segundo usuario

//Identificadores del formulario login
var IdFormLogin = document.getElementById("login");
var IdBtnLogIn = document.getElementById("btnLogin");

//Identificadores de la ventana modal
var IdModalHeader = document.getElementById("ModalLabel");
var IdModalBody = document.getElementById("ModalBody");

//Funciones para el login y gestion de cookies

function clearModal(){
  var childModalHeader = IdModalHeader.children;
  while(childModalHeader.length != 0){
    IdModalHeader.removeChild(childModalHeader[0]);
  }

  var childModalBody = IdModalBody.children;
  while(childModalBody.length != 0){
    IdModalBody.removeChild(childModalBody[0]);
  }
}


function checkLogIn()
/*Funcion que comprueba que el login sea correco e inserta una cookie*/
{

  if(IdFormLogin.elements[0].value == usuario.nombre && IdFormLogin.elements.namedItem("passUser").value == usuario.pass){
    
    /* //Pruebas de las cookies
    console.log("acceso por indice de elemento");
    console.log("Nombre: " + IdFormLogin.elements[0].value);
    console.log("Pass: " + IdFormLogin.elements[1].value);
    console.log("acceso por nombre de input");
    console.log("Nombre: " + IdFormLogin.elements.namedItem("nameUser").value);
    console.log("Pass: " + IdFormLogin.elements.namedItem("passUser").value);
    */
    
    //Creamos los valores para la cookie
    
    var t = new Date();
    t.setTime(t.getTime() + (3*60*60*1000)); //tiene 3 horas de duracion
    var expira = "expires="+ t.toUTCString();

    document.cookie = "idUser = " + usuario.IdUsuario + ";"+expira;
    document.cookie = "nameUser = " + usuario.nombre + ";"+expira;
    document.cookie = "passUser = true;"+expira;

    //Borramos el contenido del modal
    clearModal();

    //escribimos en el modal
    var header = document.createElement("h3");
    header.setAttribute("id","headmodal");
    header.appendChild(document.createTextNode("Bienvenido"));
    IdModalHeader.appendChild(header);

    var divModal = document.createElement("div");
    divModal.className = "text-center";
    IdModalBody.appendChild(divModal);

    var texto = document.createElement("p");
    texto.className = "textomodal";
    texto.appendChild(document.createTextNode(usuario.nombre));
    divModal.appendChild(texto);

    var texto1 = document.createElement("p");
    texto1.className = "textomodal";
    var d = new Date();
    var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    texto1.appendChild(document.createTextNode(fecha));
    divModal.appendChild(texto1);

  }

}

IdBtnLogIn.addEventListener("click", checkLogIn);

function givemeCookies(){
  /*
  Las cookies se almacenan en el siguiente orden:
  giveme = [idUser,nameUser,passUser];
  */
  var giveme = [];
  var cookies = document.cookie;
  var aux = cookies.split(";");
  for(var i = 0; i < aux.length ; i++){
    var cookie = aux[i];
    var aux2 = cookie.split("=");
    giveme.push(aux2[1]);
  }
  return giveme;
}

function getCookie(cname) 
/*Funcion que obtiene una sola cookie especificando el nombre */
{
  var name = cname + "=";
  var decodedCookie = document.cookie;
  var ca = decodedCookie.split(";");
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
