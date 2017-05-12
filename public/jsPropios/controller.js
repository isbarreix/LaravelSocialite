/*
    Funcion encargada de armar el SVG de los Lentes
    Recibe un JSON con la informacion grafica del lente a armar y en base a eso agrega los atributos al SVG
*/

var seleccion = {es_especial: "NO",
		modelo: "", 
		precio_base: "",
		detalle: "",
        vidrio: {tipo: "", color: "", precio: ""},
		marco: {tipo: "", color: "", precio: ""},
		tamaño: {medida: "", ancho_lente:"", ancho_puente:""},
		patillas: {tipo: "", color: "", precio: "", grabado:[]
					},
	}

function armar(lente_grafico){ 
    $("#GlassesSVG").remove();
    $("#display_anteojos").append('<svg version="1.1" id="GlassesSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 768 384" style="enable-background:new 0 0 768 384;" xml:space="preserve"> </svg> ')
    
    
    var svgNS = "http://www.w3.org/2000/svg";
	
    
	//		grupo de vidrios.
	var g_lenses= document.createElementNS(svgNS,"path");
	g_lenses.setAttributeNS(null,"id","lns");
    g_lenses.setAttributeNS(null,"class",lente_grafico.vidrios.color);
    g_lenses.setAttributeNS(null,"d",lente_grafico.vidrios.forma);


	//		lo agregamos al svg que ya esta creado en el body de html.
	document.getElementById("GlassesSVG").appendChild(g_lenses);

	//		grupo patillas
	var g_temples= document.createElementNS(svgNS,"path");
	g_temples.setAttributeNS(null,"id","temples");
     g_temples.setAttributeNS(null,"class",lente_grafico.patillas.color);
    g_temples.setAttributeNS(null,"d",lente_grafico.patillas.forma);

	document.getElementById("GlassesSVG").appendChild(g_temples);

	//		Creamos path del maco
	var p_front= document.createElementNS(svgNS,"path");
	p_front.setAttributeNS(null,"id","front");
	p_front.setAttributeNS(null,"class",lente_grafico.marco.color);
	p_front.setAttributeNS(null,"d",lente_grafico.marco.forma);

	document.getElementById("GlassesSVG").appendChild(p_front);
}

/*
    Recibe un nombre de lente, un color de vidrio, un color de marco y un color de patilla y prepara la obtencion de los datos para el armado
    del lente y el seteo de atributos correspondientes.
    Si lns front o patilla son nulos se setea el estilo 0 como predeterminado.
*/
function mostrarModelo(lente, lns, front, patilla){
    
    $.getJSON("jspropios/"+lente+"Grafico.json", function(json) {
        
        var lente_grafico=json.lente_grafico;
        
        armar(lente_grafico);
        //habilitarOpciones(lente);
		if(lns)
			chngClscLns(lns);
		else
			chngClscLns('lns_classic_000000');
		if(front)
			chngFront(front);
		else
			chngFront('frnt_classic_000000');
		if(patilla)
			chngPatillas(patilla);
		else
			chngPatillas('tmp_classic_000000');
		
    });
	
}

/* 
    Elije un modelo random con colores random en cada componente.
*/
function mostrarPrecargadoRandom(){

    $.getJSON("jspropios/caracteristicas.json", function(json) {
        var randomModelo = Math.floor((Math.random() * json.modelo.length));
        
        var randomTipoLente = Math.floor(Math.random()*json.vidrio.length);
        var randomColorLente = Math.floor((Math.random() * json.vidrio[randomTipoLente].color.length));
        
        var randomTipoMarco = Math.floor(Math.random()*json.marco.length);
        var randomColorMarco = Math.floor((Math.random() * json.marco[randomTipoMarco].color.length));
        
        var randomTipoPatillas = Math.floor(Math.random()*json.patillas.length);
        var randomColorPatilla = Math.floor((Math.random() * json.patillas[randomTipoPatillas].color.length));
        
        
        var modeloSeleccionado= json.modelo[randomModelo];
        mostrarModelo(modeloSeleccionado.modelo,
                      'lns_'+json.vidrio[randomTipoLente].tipo+'_'+json.vidrio[randomTipoLente].color[randomColorLente],
                      'frnt_'+json.marco[randomTipoMarco].tipo+'_'+json.marco[randomTipoMarco].color[randomColorMarco], 
                      'tmp_'+json.patillas[randomTipoPatillas].tipo+'_'+json.patillas[randomTipoPatillas].color[randomColorPatilla]);
		escribirModelo(modeloSeleccionado.modelo);
		escribirDetalle(modeloSeleccionado.modelo);
    }
              );
    
}
/*
    Escribe en el documento HTML el nombre del lente
*/

function escribirModelo(lente){
    $("#display_nombreElegido").remove();
    var lenteParseado= lente.replace("_", " ");
    $("#display_nombre").append('<span id="display_nombreElegido">'+lenteParseado+'</span>');
    seleccion.modelo = lente;
}

/*
    Agrega al detalle del documento HTML la informacion del lente seleccionado
*/
function escribirDetalle(lenteSeleccionado) {
     $.getJSON("jspropios/caracteristicas.json", function(json) {
        var i = 0,
            termine = false,
            modelos = json.modelo;
         while((i<modelos.length) && (!termine)){
             termine = (modelos[i].modelo === lenteSeleccionado);
             if(!termine){
                 i++;
             }
         }
         if(termine){
			 $("#texto_detalle").remove();
			 $("#detalle_lente").append('<span id="texto_detalle">'+modelos[i].detalle+'</span>');
             seleccion.detalle = modelos[i].detalle;
         }
     }
               );
}

/*
    Guarda en localStorage un json con la informacion del lente seleccionado
    TODO
*/

function guardarDatos() {
    $.getJSON("jspropios/caracteristicas.json", function(json) {
        setPrecio(json);
        console.log(seleccion);
         }
              );
}


function setPrecio(json){
    
    var i = 0,
        termine=false,
        lenteSeleccionado= seleccion.modelo;
    
    while( i< json.modelo.length && !termine){
        termine= (json.modelo[i].modelo == lenteSeleccionado);
        if(termine){
            seleccion.precio_base =json.modelo[i].precio_base;
        }
        else{
            i++;
        }
    }
    
    i=0;
    termine=false;
    var tipoLenteSeleccionado= seleccion.vidrio.tipo;
    
    while( i< json.vidrio.length && !termine){
        termine= (json.vidrio[i].tipo == tipoLenteSeleccionado);
        if(termine){
            seleccion.vidrio.precio=json.vidrio[i].precio;
        }
        else{
            i++;
        }
    }
    
    i=0;
    termine=false;
    var tipoMarcoSeleccionado= seleccion.marco.tipo;
    
    while( i< json.marco.length && !termine){
        termine= (json.marco[i].tipo == tipoMarcoSeleccionado);
        if(termine){
            seleccion.marco.precio=json.marco[i].precio;
        }
        else{
            i++;
        }
    }
    
     i=0;
    termine=false;
    var tipoPatillaSeleccionada= seleccion.patillas.tipo;
    
    while( i< json.patillas.length && !termine){
        termine= (json.patillas[i].tipo == tipoPatillaSeleccionada);
        if(termine){
            seleccion.patillas.precio=json.patillas[i].precio;
        }
        else{
            i++;
        }
    }
    
}
/*
    Carga las opciones almacenadas en el json Caracteristicas al documento HTML
*/
function cargarOpciones(){
    
    //accedo a al json que posee los elemento a cargar en el html
   
     $.getJSON("jspropios/caracteristicas.json", function(json) {
         //si logre entrar
         
         //cargo los modelos de lentes
         var i=0;
         var len=0;
         var modelos=json.modelo;
         for (i=0, len=modelos.length; i<len ; i++){
             cargarModelo(modelos[i]);
         }
         
         //cargo los posibles colores de vidrio
         var vidrios=json.vidrio;
         for (i=0, len=vidrios.length; i<len ; i++){
             cargarVidrio(vidrios[i]);
		}
        
         //cargo los posibles colores de marco
         var marcos=json.marco;
         for (i=0, len=marcos.length; i<len ; i++){
             cargarMarco(marcos[i]);
         }
         
         //cargo los posibles colores de patilla
        var patillas=json.patillas;
         for (i=0, len=patillas.length; i<len ; i++){
             cargarPatillas(patillas[i]);
         }
         
         //cargo los posibles tamaños
          var tamano=json.tamano;
         for (i=0, len=tamano.length; i<len ; i++){
             cargarTamano(tamano[i]);
         }
         
    });
        
}

/*  
    Carga los modelos al documento HTML
*/
function cargarModelo(modelo){
    var htmlACargar='<img src="images/muestra_modelos/min'+modelo.modelo+'.jpg" alt="Imagen de muestra de anteojos '+modelo.modelo+'" id="'+modelo.modelo+'" class="btnmodelo">';
    $("#mostrarModelo").append(htmlACargar);    
}

/*  
    Carga los vidrios al documento HTML
*/
function cargarVidrio(vidrio){
    $("#mostrarLentes").append("<p> "+vidrio.tipo+" </p>");
    var colores=vidrio.color;
    var estilo=vidrio.tipo;
    var coloresAcargar="<p>";
	var sheet = getShtEstilo();
    for(i=0, len=colores.length; i<len; i++){
		var str= "&#39;lns_"+estilo+"_"+colores[i]+"&#39;";	// por las cmillas del onclick
        coloresAcargar+=' <button class="btn btn-sm" id=btnClr onclick="chngClscLns('+str+')" style="background-color:#'+colores[i]+';"></button>';
		sheet.insertRule('.lns_'+estilo+'_'+colores[i]+' { fill: #'+colores[i]+'; opacity: 0.8; }', sheet.cssRules.length);
    }
    coloresAcargar=coloresAcargar+"</p>"
     $("#mostrarLentes").append(coloresAcargar);
}

/*  
    Carga los marcos al documento HTML
*/
function cargarMarco(marco){
    $("#mostrarMarcos").append("<p> "+marco.tipo+" </p>");
    var colores=marco.color;
    var estilo=marco.tipo;
    var coloresAcargar="<p>";
	var sheet = getShtEstilo();
    for(i=0, len=colores.length; i<len; i++){
		  var str= "&#39;frnt_"+estilo+"_"+colores[i]+"&#39;";	// por las cmillas del onclick
        coloresAcargar+=' <button class="btn btn-sm" id=btnClr onclick="chngFront('+str+')" style="background-color:#'+colores[i]+';"></button>';
		sheet.insertRule('.frnt_'+estilo+'_'+colores[i]+' { fill: #'+colores[i]+'; opacity: 1; }', sheet.cssRules.length);
    }
    coloresAcargar=coloresAcargar+"</p>"
    
     $("#mostrarMarcos").append(coloresAcargar);
}

/*  
    Carga las Patillas al documento HTML
*/

function cargarPatillas(patilla){
    $("#mostrarPatillas").append("<p> "+patilla.tipo+" </p>");
    var colores=patilla.color;
    var estilo=patilla.tipo;
    var coloresAcargar="<p>";
	var sheet = getShtEstilo();
    for(i=0, len=colores.length; i<len; i++){
        var str= "&#39;tmp_"+estilo+"_"+colores[i]+"&#39;";	// por las cmillas del onclick
        coloresAcargar+=' <button class="btn btn-sm" id=btnClr onclick="chngPatillas('+str+')" style="background-color:#'+colores[i]+';"></button>';
		sheet.insertRule('.tmp_'+estilo+'_'+colores[i]+' { fill: #'+colores[i]+'; opacity: 1; }', sheet.cssRules.length);
    }
    coloresAcargar=coloresAcargar+"</p>"
     $("#mostrarPatillas").append(coloresAcargar);
}

/*  
    Carga los tamaños al documento HTML
*/

function cargarTamano(tamano){
     var tamanosAcargar='<button class="btn btn-sm" id=btnClr>' + tamano.medida+ '</button>';
    $("#mostrarTamano").append(tamanosAcargar);
    
}

/*  
    Cambia el color del lente al seleccionado
*/
function chngClscLns(color){
	$("#lns").attr('class', color);
    var tipoYColor= color.split("_");
    seleccion.vidrio.tipo = tipoYColor[1];
    seleccion.vidrio.color = tipoYColor[2];
}

/*  
    Cambia el color del marco al seleccionado
*/
function chngFront(color){
    $("#front").attr('class', color);
    var tipoYColor= color.split("_");
    seleccion.marco.tipo = tipoYColor[1];
    seleccion.marco.color = tipoYColor[2];
    console.log(seleccion);
}

/*  
    Cambia el color de las patillas al seleccionado 
*/
function chngPatillas(color){
    $("#temples").attr('class', color);
    var tipoYColor= color.split("_");
    seleccion.patillas.tipo = tipoYColor[1];
    seleccion.patillas.color = tipoYColor[2];
}

/*  
    Devuelve la hoja de estilos del CSSEstilo, donde estan los estilos de los lentesgraficos
*/
function getShtEstilo(){
	return document.getElementById("cssEstilo").sheet;
}