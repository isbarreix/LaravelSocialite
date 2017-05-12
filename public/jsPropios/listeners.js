
$('#mostrarModelo').on('click', '.btnmodelo', function(e){
    var lente=e.currentTarget.id;
    mostrarModelo(lente);
    escribirModelo(lente);
    escribirDetalle(lente);
});

$("#btnRandom").click(mostrarPrecargadoRandom);

//$("#btn_load").click(cargar);

$("#btn_save").click(guardarDatos);

window.onload = function(){
    cargarOpciones();
    var mycookie = getCookie("css");
    if(mycookie != ""){
        setCSS(mycookie);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$("#tema").click(cambiarCSS);

function cambiarCSS(e){
    var addressValue = $("#cssPropio").attr("href");
    if(addressValue.includes("1")){
        setCSS("csspropios/bootstrap2.css");
    }
    else{
        setCSS("csspropios/bootstrap1.css");
    }
}

function setCSS(direccion){
    $("#cssPropio").attr('href', direccion);
    document.cookie = "css="+direccion+"; expires= Fri, 31 Dec 9999 23:59:59 GMT";
}