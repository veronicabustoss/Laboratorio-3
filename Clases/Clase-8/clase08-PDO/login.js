/// <reference path="./node_modules/@types/jquery/index.d.ts"/>
/*
$(document).ready(function(){

    $("#btnAceptar").mouseover(function(){

        $("#btnAceptar").addClass("Cancelar");

    });

    $("#btnAceptar").mouseout(function(){
        
        $("#btnAceptar").removeClass("Cancelar");
        
    });*/
/*
    $("#btn01").click(function(){

        if($("#p02").attr("class") == "negrita")
            $("#p02").removeClass("negrita");
        else
            $("#p02").addClass("negrita");
        
    });
});
*/
//Funcion que agrega a traves del metodo get un empleado
function Login() {
    //con TS
    // let legajo : string =(<HTMLInputElement> document.getElementById("txtLegajo")).value;
    //let clave : string =(<HTMLInputElement> document.getElementById("txtClave")).value;
    var xhttp = new XMLHttpRequest();
    var legajo = $("#txtLegajo").val();
    var clave = $("#txtClave").val();
    var pagina = "./BACKEND/emp/" + legajo + "/" + clave;
    xhttp.open("GET", "BACKEND/emp/" + legajo + "/" + clave, true);
    //ENVIO DE LA PETICION
    xhttp.send();
    //FUNCION CALLBACK
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var retJSON = JSON.parse(xhttp.responseText);
            if (!retJSON.Exito) {
                alert("Error!,Usuario erroneo");
            }
            else {
                location.assign("./Ej8.html"); //en caso de exito
            }
        }
    };
    /*

 $.ajax({
     type: 'GET',
     url: 'BACKEND/index.php/emp/'+legajo+'/'+clave,
     dataType: "json",
     cache: false,
     contentType: false,
     processData: false,
     //data: formData,
     async: true
 })
 .done(function (objJson:any) {


     if(!objJson.Exito){
         console.clear();
         console.log(objJson.Mensaje);
        // location.assign("./login.php"); //en caso de exito
         return;
     }


 })
 .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
     alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
 });
 */
}
