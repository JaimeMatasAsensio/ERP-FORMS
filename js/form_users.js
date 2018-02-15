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

var IdFormLogin = document.getElementById("login");

function checkLogIn(){

  console.log("acceso por indice de elemento");
  console.log("Nombre: " + IdFormLogin.elements[0].value);
  console.log("Pass: " + IdFormLogin.elements[1].value);
  console.log("acceso por nombre de input");
  console.log("Nombre: " + IdFormLogin.elements.namedItem("nameUser").value);
  console.log("Pass: " + IdFormLogin.elements.namedItem("passUser").value);

}

IdFormLogin.addEventListener("submit",checkLogIn);
