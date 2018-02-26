"use strict";
/*Documento para implementar los formularios que modificaran las categorias*/

//Bloque de errores para el fromulario de añadir, modificar o borrar categoria
function UnknownAddToNewCategory()
/*Error de llamada a constructores como funciones*/
{
  this.name = "UnknownAddToNewCategory";
  this.message = "UnKnown Destination of new category. Please, select a destination";
}
//Herencia
UnknownAddToNewCategory.prototype = new TemplateError();
UnknownAddToNewCategory.prototype.constructor = UnknownAddToNewCategory;
UnknownAddToNewCategory.prototype.toString = function(){
  return TemplateError.toString.call(this);
}


/*Bloque de codigo para los formularios de añadir, modificar y borrar categoria*/
var FormCategory = document.createElement("form");

function loadFormAddCategory()
/*Funcion que carga el formulario de añadir categorias bien a una tienda o al storeHouse*/
{
  if(document.cookie){ 
    if(FormCategory){
      clearForm();
    }
    clearMainCont();
    FormCategory.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormCategory);

    var fieldsetAddCategory = document.createElement("fieldset");
    FormCategory.appendChild(fieldsetAddCategory);

    var legendAddCategory = document.createElement("legend");
    legendAddCategory.appendChild(document.createTextNode("Añadir categoria"));
    fieldsetAddCategory.appendChild(legendAddCategory);

    fieldsetAddCategory.appendChild(GenerateInputSelectForShops(Store.shopIte,"addTo","Añadir Categoria En"));
    
    fieldsetAddCategory.appendChild(GenerateInputText("titulo","Titulo nueva categoria"));

    fieldsetAddCategory.appendChild(GenerateTextarea("descripcion","Descripcion nueva categoria","Inserte una descripcion para la nueva categoria...."));

    FormCategory.elements.namedItem("addTo").focus();

    var divBtn = document.createElement("div");
    divBtn.className="text-center btnForms";
    fieldsetAddCategory.appendChild(divBtn);

    var btnSubmit = document.createElement("input");
    btnSubmit.className = "btn btn-success";
    btnSubmit.setAttribute("id","submitForm");
    btnSubmit.setAttribute("type","button");
    btnSubmit.setAttribute("value","Añadir Categoria");
    btnSubmit.setAttribute("data-toggle","modal");
    btnSubmit.setAttribute("data-target","#infoModal");
    btnSubmit.style.margin = "0 10px";
    divBtn.appendChild(btnSubmit);
    
    btnSubmit.addEventListener("click",checkAddCategory);

    var btnClear = document.createElement("input");
    btnClear.className = "btn btn-default";
    btnClear.setAttribute("type","reset");
    btnClear.setAttribute("value","Limpiar Valores");
    divBtn.appendChild(btnClear);
    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }

}


function checkAddCategory()
/*funcion que chequea los valores del formulario de añadir categoria, si son correctos añadira una nueva categoria */
{
  //Obtenemos los valores del formulario
  var addTo = FormCategory.elements.namedItem("addTo").value;
  var titulo = FormCategory.elements.namedItem("titulo").value;
  var descripcion = FormCategory.elements.namedItem("descripcion").value;

  //Comprobamos que sean correctos
  try{
    if(!addTo) throw new UnknownAddToNewCategory();

    //Creamos el objeto para la nueva categoria
    var obj = new Category(titulo, descripcion);

    //Lo añadimos a su destino
    if(addTo != "store"){
    Store.AddCategoryInShop(addTo,obj);
    var shop = Store.getShopByCif(addTo);
      WriteSuccessModal("Nueva Categoria Añadida!","La categoria "+titulo+"ha sido añadida a la tienda " + shop.nombre )
    }else{
      Store.AddCategory(obj);
      WriteSuccessModal("Nueva Categoria Añadida!","La categoria "+titulo+" ha sido añadida al store House");
    }
  
    //Limpiamos los valores del formulario
    FormCategory.elements.namedItem("titulo").value = "";
    FormCategory.elements.namedItem("descripcion").value = "";
    FormCategory.elements.namedItem("addTo").value = "";

  }catch(error){
    WriteErrorModal(error.message);  
  }
}

function loadFormUpdateCategory()
/*Funcion que carga el formulario de modificar categorias de una tienda o del store*/
{
  if(document.cookie){ 
    clearForm();
    clearMainCont();
    FormCategory.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormCategory);

    var fieldsetUpdateCategory = document.createElement("fieldset");
    FormCategory.appendChild(fieldsetUpdateCategory);

    var legendUpdateCategory = document.createElement("legend");
    legendUpdateCategory.appendChild(document.createTextNode("Modificar categoria"));
    fieldsetUpdateCategory.appendChild(legendUpdateCategory);

    var selectShop = GenerateInputSelectForShops(Store.shopIte,"updateTarget","Modificar Categoria En")
    fieldsetUpdateCategory.appendChild(selectShop);
    selectShop.addEventListener("change",OnchangeInputSelect(fieldsetUpdateCategory));



  }else{
    var message = "No tiene acceso a los formularios de 'Modificar Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }
}


function GenerateInputSelectForCategories(categoryIte,nameInput,labeltext)
/*funcion que genera un select con las categorias mediante un iterador*/
{
  var divFormGroup = document.createElement("div");
  divFormGroup.setAttribute("id","selForCat");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labeltext));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var inputSelect = document.createElement("select");
  inputSelect.className = "form-control";
  inputSelect.setAttribute("name",nameInput);
  div.appendChild(inputSelect);

  var initOption = document.createElement("option");
  initOption.setAttribute("value","");
  initOption.appendChild(document.createTextNode(""));
  inputSelect.appendChild(initOption);

  var item = categoryIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.IdCategory);
    opt.appendChild(document.createTextNode(item.value.titulo));
    inputSelect.appendChild(opt);
    item = categoryIte.next();
  }

  return divFormGroup;
}

function OnchangeInputSelect(fieldSet)
/*Funcion de evento para cargar el formulario de modificacion */
{
  var fieldSet = fieldSet;
  return function(){
    var idShop = FormCategory.elements.namedItem("updateTarget").value;
    var inputs = fieldSet.children;
    while (inputs.length > 2) {
      fieldSet.removeChild(inputs[inputs.length - 1]);
    }
    if(idShop != "store"){
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      try {
        var shop = Store.getShopByCif(idShop);
        var ite = shop.categoryIte;
        var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria");
        fieldSet.appendChild(divShop);
        var select = divShop.getElementsByTagName("select")
        select[0].addEventListener("change", GenerateFormModifyCat(fieldSet));
      } catch (error) {
        console.log(error.message);
      }
    }else{
      var sel = document.getElementById("selForCat");
      if(sel != null){
        fieldSet.removeChild(sel);
      }
      var ite = Store.categoryIte;
      var divShop = GenerateInputSelectForCategories(ite,"categoryTarget","Seleccionar una Categoria")
      fieldSet.appendChild(divShop);
      var select = divShop.getElementsByTagName("select")
      select[0].addEventListener("change", GenerateFormModifyCat(fieldSet));
    }
    
  }
}


function GenerateFormModifyCat(fieldSet)
/*Funcion que genera un formulario de modificacion de categoria*/
{
  var fields = fieldSet;
  return function(){
    var idShop = FormCategory.elements.namedItem("updateTarget").value;
    var idCat = FormCategory.elements.namedItem("categoryTarget").value;
    if(idShop != "store"){
      var shop = Store.getShopByCif(idShop);
      var objCat = shop.getCategory(idCat);
      
      var inputs = fields.children;
      
      if(inputs.length == 3){

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));

      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
      }

    }else{
      
      var objCat = Store.getCategory(idCat);
      
      var inputs = fields.children;

      if(inputs.length == 3){

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));

      }else{
        while (inputs.length > 3) {
          fields.removeChild(inputs[inputs.length - 1]);
        }

        fields.appendChild(GenerateInputTextreadOnly("idCategoria","Identificador Categoria",objCat.IdCategory));
        fields.appendChild(GenerateInputText("tituloCategoria","Titulo Categoria",objCat.titulo));
        fields.appendChild(GenerateTextarea("descrCategoria","Descripcion Categoria","",objCat.descripcion));
        fields.appendChild(GenerateSubmitButtons(checkModCategory,"Modificar Categoria"));
      }
      

    }
  }
}


function checkModCategory(){
  clearModal();
  console.log("Listo para probar los valores del formulario!"); 
  var destino = FormCategory.elements.namedItem("updateTarget").value;
  var catTarget = FormCategory.elements.namedItem("idCategoria").value;
  var modTitulo = FormCategory.elements.namedItem("tituloCategoria").value;
  var modDesc = FormCategory.elements.namedItem("descrCategoria").value;
  
  try {
    var modCat = new Category(modTitulo,modDesc);
    if(destino != "store"){
      var oldCat = Store.getCategoryFromShop(destino,catTarget);
      var shop = Store.getShopByCif(destino);
      var aux = "La categoria " + oldCat.titulo +" ha sido modificada con exito en "+shop.nombre+"."; 
      Store.setCategoryInShop(destino,catTarget,modCat);
      WriteSuccessModal("Categoria Modificada con Exito!",aux);
      loadFormUpdateCategory();
    }else{
      var oldCat = Store.getCategory(catTarget);
      var aux = "La categoria " + oldCat.titulo +" ha sido modificada con exito en "+Store.nombre+"."; 
      Store.setCategory(catTarget,modCat);
      WriteSuccessModal("Categoria Modificada con Exito!",aux);
      loadFormUpdateCategory();
    }
  } catch (e) {
    WriteErrorModal(e.message);
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


function WriteSuccessModal(Head, Message)
/*Funcion que escribe un mensaje de error en la ventana modal*/
{
  //Borramos el contenido del modal
  clearModal();
  
  //escribimos en el modal
  var header = document.createElement("h3");
  header.setAttribute("id","headmodal");
  header.appendChild(document.createTextNode(Head));
  IdModalHeader.appendChild(header);
  
  var divModal = document.createElement("div");
  divModal.className = "text-center";
  IdModalBody.appendChild(divModal);
  
  var texto = document.createElement("p");
  texto.className = "textomodal";
  texto.appendChild(document.createTextNode(Message));
  divModal.appendChild(texto);
  
  var texto1 = document.createElement("p");
  texto1.className = "textomodal";
  var d = new Date();
  var fecha = d.toLocaleDateString() + " " + d.toLocaleTimeString();
  texto1.appendChild(document.createTextNode(fecha));
  divModal.appendChild(texto1);
}



function clearForm(){
  var children = (FormCategory.children)?FormCategory.children:null;
  while(children.length > 0) {
    FormCategory.removeChild(children[0]);
  }
}
