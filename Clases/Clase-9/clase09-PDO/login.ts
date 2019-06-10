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
    
function Login()
{
    //con TS
   // let legajo : string =(<HTMLInputElement> document.getElementById("txtLegajo")).value;
    //let clave : string =(<HTMLInputElement> document.getElementById("txtClave")).value;

   // let xhttp : XMLHttpRequest = new XMLHttpRequest();
    let legajo=$("#txtLegajo").val();
    let clave=$("#txtClave").val();


       
//CON jquery
    $.ajax({
        type: 'GET',
        url: 'BACKEND/emp/'+legajo+','+clave,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        //data: formData,
        async: true
    })
    .done(function (objJson:any) {


        if(!objJson.Exito){
            console.log("Usuario no registrado!");
            alert("Usuario no registrado");
           
        }
        else
        {
            alert("Usuario registrado");
            location.assign("./Ej8.html"); //en caso de exito
        }


    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    }); 


    //FORMA TRADICIONAL
    /* xhttp.open("GET", "BACKEND/emp/"+legajo+"/"+clave, true);
   //ENVIO DE LA PETICION
   xhttp.send();

   //FUNCION CALLBACK
   xhttp.onreadystatechange = () => 
   {
       if (xhttp.readyState == 4 && xhttp.status == 200) {
        let retJSON = JSON.parse(xhttp.responseText);
        if(!retJSON.Exito)
        {
        alert("Error!,Usuario erroneo");
       }
       else
       {
        location.assign("./Ej8.html"); //en caso de exito
       }
    }
   }*/
}

function Registro()
{
        //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
        let foto : any = (<HTMLInputElement> document.getElementById("fileFoto"));
    
        let nombre : string =(<HTMLInputElement> document.getElementById("txtNombreReg")).value;
        let apellido : string =(<HTMLInputElement> document.getElementById("txtApellidoReg")).value;
        let legajo : string =(<HTMLInputElement> document.getElementById("numLegajoReg")).value;
        let sueldo : string =(<HTMLInputElement> document.getElementById("numSueldoReg")).value;
        let clave : string =(<HTMLInputElement> document.getElementById("txtClaveReg")).value;
    
        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();
    
        let op:string="subirFoto";
    
        //AGREGO PARAMETROS AL FORMDATA:
    
        //PARAMETRO RECUPERADO POR $_FILES
        form.append('foto', foto.files[0]);
        form.append('txtNombre',nombre);
        form.append('txtApellido',apellido);
        form.append('numLegajo',legajo);
        form.append('numSueldo',sueldo);
        form.append('txtClave',clave);
    
        //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
        //form.append('op', "subirFoto");
    
        //METODO; URL; ASINCRONICO?
        xhr.open('POST', './BACKEND/nexo.php', true);
    
        //ESTABLEZCO EL ENCABEZADO DE LA PETICION
        xhr.setRequestHeader("enctype", "multipart/form-data");
    
        console.log(op);
    
        form.append('op',op);
    
    
        //ENVIO DE LA PETICION
        xhr.send(form);
    
        //FUNCION CALLBACK
        xhr.onreadystatechange = () => {
    
            if (xhr.readyState == 4 && xhr.status == 200) {

                //recupero el objeto de tipo JSON en formato cadena que nos devuelve nexo.php
                let retJSON = JSON.parse(xhr.responseText);
    
                //si el atributo "Ok" es falso , mostramos que la foto no se subio
                if(!retJSON.Ok){
                    console.error("NO se pudo registrar!!!");
                }
                else{
                    console.log("Usuario registrado con exito");
                    alert("Usuario registrado con exito!!");

                }

            }
        };
}

    
