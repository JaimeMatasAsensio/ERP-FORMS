"use strict";
/*Documento para implementar funciones que generan distintos elementos de formularios*/

function GenerateInputSelectForShops(shopsIte,nameInput,labeltext)
/*Genera un select con las las tiendas como opcion*/
{

  var divFormGroup = document.createElement("div");
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
  
  var optStore = document.createElement("option");
  optStore.setAttribute("value","store");
  optStore.appendChild(document.createTextNode(Store.nombre));
  inputSelect.appendChild(optStore);

  var item = shopsIte.next();
  while(!item.done){
    var opt = document.createElement("option");
    opt.setAttribute("value",item.value.cif);
    opt.appendChild(document.createTextNode(item.value.nombre));
    inputSelect.appendChild(opt);
    item = shopsIte.next();
  }

  return divFormGroup;
}

function GenerateInputText(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo texto*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateTextarea(nameInput,labelText,placeholderText,valueInput)
/*Obtenemos un textarea*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  div.style.minHeight = "100px";
  divFormGroup.appendChild(div);

  var input = document.createElement("textarea");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  
  if(valueInput != ""){
    input.appendChild(document.createTextNode(valueInput));
  }
 
  input.setAttribute("placeholder",placeholderText);
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateInputTextreadOnly(nameInput,labelText,valueInput)
/*Obtenemos un input de tipo texto*/
{
  var value = valueInput||"";
  var divFormGroup = document.createElement("div");
  divFormGroup.className = "form-group";

  var labelInput = document.createElement("label");
  labelInput.className = "col-sm-3 control-label";
  labelInput.setAttribute("for",nameInput);
  labelInput.appendChild(document.createTextNode(labelText));
  divFormGroup.appendChild(labelInput);

  var div = document.createElement("div");
  div.className = "col-sm-9";
  divFormGroup.appendChild(div);

  var input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("name",nameInput);
  input.setAttribute("type","text");
  input.setAttribute("value",value);
  input.setAttribute("autocomplete","off");
  input.setAttribute("readonly","true");
  div.appendChild(input);
  
  return divFormGroup;

}

function GenerateSubmitButtons(eventFunction,textBtn)
/*Funcion que genera un boton de submit, se le puede asociar una funcion como evento*/
{
    
    var event = eventFunction || "";
    var divBtn = document.createElement("div");
    divBtn.className="text-center btnForms";

    var btnSubmit = document.createElement("input");
    btnSubmit.className = "btn btn-success";
    btnSubmit.setAttribute("id","submitForm");
    btnSubmit.setAttribute("type","button");
    btnSubmit.setAttribute("value",textBtn);
    btnSubmit.setAttribute("data-toggle","modal");
    btnSubmit.setAttribute("data-target","#infoModal");
    btnSubmit.style.margin = "0 10px";
    divBtn.appendChild(btnSubmit);
    
    if(event != ""){
      btnSubmit.addEventListener("click",event);
    }
    
    var btnClear = document.createElement("input");
    btnClear.className = "btn btn-default";
    btnClear.setAttribute("type","reset");
    btnClear.setAttribute("value","Limpiar Valores");
    divBtn.appendChild(btnClear);

    return divBtn;
}
