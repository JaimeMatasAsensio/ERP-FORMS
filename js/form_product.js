"use strict";
/*Documento para implementar los formularios que modificaran, añadiran y eliminaran productos del storehouse y de las tiendas*/

var FormProduct = document.createElement("form");

function loadFormAddProduct()
/*Funcion que carga el formulario de añadir categorias bien a una tienda o al storeHouse*/
{
  if(document.cookie){ 
    if(FormProduct){
      clearForm();
    }
    clearMainCont();
    FormProduct.className = "form-horizontal formularios";
    IdMainCont.appendChild(FormProduct);

    var fieldsetAddProduct = document.createElement("fieldset");
    FormProduct.appendChild(fieldsetAddProduct);

    var legendAddProduct = document.createElement("legend");
    legendAddProduct.appendChild(document.createTextNode("Añadir producto"));
    fieldsetAddProduct.appendChild(legendAddProduct);
    var selectShop = GenerateInputSelectForShops(Store.shopIte,"addTo","Añadir Producto En");
    fieldsetAddProduct.appendChild(selectShop);
    
    selectShop.addEventListener("change",generateFormAddProduct(fieldsetAddProduct));
    
    FormProduct.elements.namedItem("addTo").focus();


    
  }else{
    var message = "No tiene acceso a los formularios de 'Añadir Categoria'. Haga Log In...";
    WriteErrorModal(message);
  }

}

function generateFormAddProduct(fieldset){
  var field = fieldset;
  return function(){
    var target = FormProduct.elements.namedItem("addTo").value;
    var inputs = field.children;

    if(inputs.length > 2){
      while (inputs.length > 2) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    if(target == "store"){
      field.appendChild(GenerateInputText("SN","Numero de serie"));
      field.appendChild(GenerateInputText("nombre","Nombre"));
      field.appendChild(GenerateTextarea("desc","Descripcion","Escriba una descripcion breve del producto",""));
      field.appendChild(GenerateInputText("iva","IVA"));
      field.appendChild(GenerateInputText("precio","Precio"));
      field.appendChild(GenerateInputText("img","imagenes"));
      var ite = Store.categoryIte;
      field.appendChild(GenerateInputSelectForCategories(ite,"categoriaPro","Categoria del Producto"));
      var selectType = GenerateSelectTypeProducts();
      field.appendChild(selectType);
      selectType.addEventListener("change",LoadTypeProductFields(field));

    }else{
      var shop = Store.getShopByCif(target);
      field.appendChild(GenerateInputText("SN","Numero de serie"));
      field.appendChild(GenerateInputText("nombre","Nombre"));
      field.appendChild(GenerateTextarea("desc","Descripcion","Escriba una descripcion breve del producto",""));
      field.appendChild(GenerateInputText("iva","IVA"));
      field.appendChild(GenerateInputText("precio","Precio"));
      field.appendChild(GenerateInputText("img","imagenes"));
      var ite = shop.categoryIte;
      field.appendChild(GenerateInputSelectForCategories(ite,"categoriaPro","Categoria del Producto"));
      var selectType = GenerateSelectTypeProducts();
      field.appendChild(selectType);
      selectType.addEventListener("change",LoadTypeProductFields(field));
    }
  }
}

function LoadTypeProductFields(fieldset){
  var field = fieldset;
  return function (){
    var inputs = field.children;
    if(inputs.length > 10){
      while (inputs.length > 10) {
        field.removeChild(inputs[inputs.length - 1]);
      }
    }
    var tProduct = FormProduct.elements.namedItem("tProduct").value;
    switch (tProduct) {
      case "movil":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("camara","Camara"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      case "ordenador":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("cpu","Modelo procesador"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      case "consola":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("numJugadores","Numero de Jugadores"));
        field.appendChild(GenerateInputText("portatil","Portatil"));
        break;
    
      case "camara":
        field.appendChild(GenerateInputText("marca","Marca"));
        field.appendChild(GenerateInputText("lente","Tipo de Lente"));
        field.appendChild(GenerateInputText("memoria","Memoria"));
        break;
    
      default:
        break;
    }
  
    field.appendChild(GenerateInputNumber("cantidad","Cantidad"));
  
    field.appendChild(GenerateSubmitButtons(checkAddProduct, "Añadir Producto"));
  }

}

function checkAddProduct(){
  var sn = FormProduct.elements.namedItem("SN").value;
  var nombre = FormProduct.elements.namedItem("nombre").value;
  var descripcion = FormProduct.elements.namedItem("desc").value;
  var iva = FormProduct.elements.namedItem("iva").value;
  iva = Number(iva);
  var precio = FormProduct.elements.namedItem("precio").value;
  precio = Number(precio);
  var imgPath = FormProduct.elements.namedItem("img").value;

  var producto = null;

  var tProduct = FormProduct.elements.namedItem("tProduct").value;
  try {
    switch (tProduct) {
      case "movil":

        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("camara").value,FormProduct.elements.namedItem("memoria").value);

        break;
    
      case "ordenador":
        
        producto = new Ordenador(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("cpu").value,FormProduct.elements.namedItem("memoria").value);

        break;
    
      case "consola":
      
        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("NumJugadores").value,FormProduct.elements.namedItem("portatil").value);
      
        break;
    
      case "camara":
      
        producto = new Movil(sn,nombre,descripcion,iva,precio,imgPath,FormProduct.elements.namedItem("marca").value,FormProduct.elements.namedItem("lente").value,FormProduct.elements.namedItem("memoria").value);
      
        break;
    
      default:

        break;
    }

    
    var categoria = FormProduct.elements.namedItem("categoriaPro").value;

    var cantidad = FormProduct.elements.namedItem("cantidad").value;
    cantidad = Number(cantidad);

    var target = FormProduct.elements.namedItem("addTo").value;

    if(target == "store"){
      Store.AddProduct(producto,cantidad,categoria);
      WriteSuccessModal("Nuevo Producto añadido","Se ha añadido un nuevo producto a " + Store.nombre);
    }else{
      Store.AddProductInShop(target,producto,cantidad,categoria);
      var shop = Store.getShopByCif(target);
      WriteSuccessModal("Nuevo Producto añadido","Se ha añadido un nuevo producto en la tienda " + shop.nombre);
      
    }
    
  } catch (e) {
    WriteErrorModal(e.message);
  }
    
  
}
