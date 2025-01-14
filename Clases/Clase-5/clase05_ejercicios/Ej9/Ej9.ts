/*
Aplicación Nº 9 (Armar listado desde un .json)
Realizar una aplicación web que muestre un listado de autos, tomando como origen de datos el
archivo autos.json . La aplicación tendrá sólo un botón (<input type=”button”>), que al
pulsarlo, generará dinámicamente un listado de los autos (armar una tabla html) que se
reciban como objetos JSON desde el archivo. Como página nexo, utilice traerAutos.php.
*/


namespace CLASE9
{
export function EnviarJSON():void
{

    let params="";

    let xhttp:XMLHttpRequest= new XMLHttpRequest();

    xhttp.open("POST","traerAutos.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");


    xhttp.send(params);

    xhttp.onreadystatechange=()=>{
        //si esta todo bien entra al if
      if(xhttp.readyState==4 && xhttp.status==200)
      {   
        (<HTMLInputElement>document.getElementById("divTable")).innerHTML=xhttp.responseText;
      }

    }
}

}