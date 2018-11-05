# Proyecto segundo tercio AREM 2018-2 

*En el presente proyecto experimentamos el desarrollo de un cliente en React.js el cual se desplegó en Heroku y un servidor desarrollado en Java para mantener un cache en la aplicación desplegado en Amazon EC2. Adicionalmente se utilizaron tecnologías de Amazon web services como API Gateway y Amazon Lambda*

#### Desarrollado por:
>Diego Andrés Borrero Muñoz - 2103110  
Estudiante de Ingeniería de Sistemas  
Escuela Colombiana de Ingeniería Julio Garavito.

## Link Articulo
En el siguiente link de [Google Drive](https://drive.google.com/open?id=1DlkHAge-Fay7vb-ex-umWw8wsqlKuexH) encontrará la explicación de la arquitectura e implementación.

## Link Video
Encontrará un vídeo explicando el demo del proyecto y su arquitectura en el siguiente link de [Google Drive](https://drive.google.com/open?id=1yRzDyoraYPHNlawYSIkEFCBBMIk75GlO)

## Despliegue local
Si desea utilizar en su computador una copia de esta aplicación recuerde que debe tener instalado *Node.js* y *Java 8* previamente 

~~~
git clone https://github.com/DxMortem/AREM-CurrencyConverter
~~~

**Inicie 2 terminales diferentes**

**1.**
~~~
cd AREM-CurrencyConverter/backend
./gradlew bootRun
~~~
**2.**
~~~
cd AREM-CurrencyConverter/frontend

- modifique en el archivo Controllers.js localizado en /src cambie la linea 4 por: 
baseURL: "http://localhost:8080"

npm start
~~~

Disfrute de la aplicación
## Link FrontEnd
Por favor ingrese al siguiente link o a la carpeta *"frontend"* si desea conocer sobre la implementación del [FrontEnd](https://github.com/DxMortem/AREM-CurrencyConverter/tree/master/frontend)

Por favor ingrese al siguiente link si desea ver el deploy de la aplicación [Heroku](https://currency-converter-frontend.herokuapp.com/) no se encontrarán en funcionamiento sus funcionalidades si el servidor EC2 (de cache) se encuentra apagado, para mayor información por favor comuniquese conmigo

## Link Cache Server
Por favor ingrese al siguiente link o a la carpeta *BackEnd* si desea conocer sobre la implementación del [Cache server](https://github.com/DxMortem/AREM-CurrencyConverter/tree/master/backend) el cual fue desplegado en amazon EC2
