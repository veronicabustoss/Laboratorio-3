<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
//require_once '/clases/AccesoDatos.php';
//require_once '/clases/Empleado.php';
require_once './clases/emp.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*
¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

//*********************************************************************************************//
//INICIALIZO EL APIREST
//*********************************************************************************************//
$app = new \Slim\App(["settings" => $config]);






//*********************************************************************************************//
/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
//*********************************************************************************************//
$app->group('/empleado', function () {   

    $this->get('/', \Empleado::class . ':traerTodos');
    $this->get('/{legajo}', \Empleado::class . ':traerUno');
    $this->delete('/', \Empleado::class . ':BorrarUno');
    $this->put('/', \Empleado::class . ':ModificarUno');

//*********************************************************************************************//
//SUBIDA DE ARCHIVOS (SE PUEDEN TENER FUNCIONES DEFINIDAS)
//*********************************************************************************************//
    $this->post('/', function (Request $request, Response $response) {
            
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros);
        $titulo= $ArrayDeParametros['titulo'];
        $cantante= $ArrayDeParametros['cantante'];
        $año= $ArrayDeParametros['anio'];
        
        $micd = new cd();
        $micd->titulo=$titulo;
        $micd->cantante=$cantante;
        $micd->año=$año;
        $micd->InsertarElCdParametros();

        $archivos = $request->getUploadedFiles();
        $destino="./fotos/";
        //var_dump($archivos);
        //var_dump($archivos['foto']);

        $nombreAnterior=$archivos['foto']->getClientFilename();
        $extension= explode(".", $nombreAnterior)  ;
        //var_dump($nombreAnterior);
        $extension=array_reverse($extension);

        $archivos['foto']->moveTo($destino.$titulo.".".$extension[0]);
        $response->getBody()->write("cd");

        return $response;

    });
     
});

$app->group('/emp', function () 
{   
    //si utilizo solo "emp" estoy indicando una instancia vacia por lo tanto mis atributos se deben inicializar por default o de lo contrario crear una instancia
    //aqui dentro y reemplazarla en "emp"
    $this->get('/{legajo}/{clave}', \emp::class . ':VerificarEmpGet1');
    $this->get('/', \emp::class . ':VerificarEmpGet2');

    
    



});


$app->run();