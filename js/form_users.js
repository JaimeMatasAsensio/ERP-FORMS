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

//Identificadores del formulario login
var IdDivFormLogin = document.getElementById("formLogIn");
var IdFormLogin = document.getElementById("login");
var IdBtnLogIn = document.getElementById("btnLogin");

//Identificadores de la ventana modal
var IdModalHeader = document.getElementById("ModalLabel");
var IdModalBody = document.getElementById("ModalBody");

//Funciones para el login y gestion de cookies

function clearLoginValues()
/*Funcion que elimina el valor de los inputs del formulario de login*/
{
  IdFormLogin.elements.namedItem("passUser").value = "";
  IdFormLogin.elements.namedItem("nameUser").value = "";
}

function checkLogIn()
/*Funcion que comprueba que el login sea correco e inserta una cookie*/
{
  var userLoginName = IdFormLogin.elements.namedItem("nameUser").value;
  var userLoginPass = IdFormLogin.elements.namedItem("passUser").value;
  
  var userLoged = Store.GetUserByName(userLoginName);
  
  if(!(userLoged instanceof User)){
    WriteErrorLoginModal();
  }else{
    if(userLoged.pass != userLoginPass){
      WriteErrorLoginModal();
    }else{
      //Creamos los valores que tendran las cookies
      var t = new Date();
      t.setTime(t.getTime() + (3*60*60*1000)); //tiene 3 horas de duracion
      var expira = "expires="+ t.toUTCString();
      var l = new Date();
      document.cookie = "idUser = " + userLoged.IdUsuario + ";" + expira;
      document.cookie = "nameUser = " + userLoged.nombre + ";" + expira;
      document.cookie = "loginUser = " + l.toUTCString() + ";" + expira;
      
      WriteSuccessLoginModal(userLoged);
    }
  }
  
  clearLoginValues();
}

IdBtnLogIn.addEventListener("click", checkLogIn);

function clearModal()
/*Funcion que limpia el contenido de la ventana modal*/
{
  var childModalHeader = IdModalHeader.children;
  while(childModalHeader.length != 0){
    IdModalHeader.removeChild(childModalHeader[0]);
  }

  var childModalBody = IdModalBody.children;
  while(childModalBody.length != 0){
    IdModalBody.removeChild(childModalBody[0]);
  }
}

function WriteErrorLoginModal()
/*Funcion que escribe un error de login en la ventana modal*/
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
  texto.appendChild(document.createTextNode("Usuario o contraseña incorrectos!"));
  divModal.appendChild(texto);
  
  var texto1 = document.createElement("p");
  texto1.className = "textomodal";
  var d = new Date();
  var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
  texto1.appendChild(document.createTextNode(fecha));
  divModal.appendChild(texto1);
}

function WriteSuccessLoginModal(usuario){
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

function UserLoged(arrayCookie){
  var divRow = document.createElement("");
  divRow.className = "row";

  var divImgUser = document.createElement("");
}



//Funciones para obtener los valores de las cookies almacenadas
function checkCookies(){
  if(document.cookie){
    var userLoged = giveMeCookies();

  }
}

function giveMeCookies(){
  /*
  Las cookies se almacenan en el siguiente orden:
  giveme = [idUser,nameUser,loginUser];
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
