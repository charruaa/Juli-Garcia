document.getElementById("boton-influencer").addEventListener("click",ingresoInfluencer)
document.getElementById("cancelar-influencer").addEventListener("click",cerrarInfluencer)
document.getElementById("agregar-influencer").addEventListener("click",agregarInfluencer)

document.getElementById("boton-articulo").addEventListener("click",ingresoArticulo)
document.getElementById("cancelar-articulo").addEventListener("click",cerrarArticulo)
document.getElementById("agregar-articulo").addEventListener("click",agregarArticulo)

document.getElementById("boton-venta").addEventListener("click",ingresoVenta)
document.getElementById("cancelar-venta").addEventListener("click",cerrarVenta)
document.getElementById("agregar-venta").addEventListener("click",agregarVenta)

function ingresoInfluencer(){
    document.getElementById("tablaInfluencer").showModal()
}
function cerrarInfluencer(){
    document.getElementById("tablaInfluencer").close()
}
function agregarInfluencer(){
    let nombre = document.getElementById("nombre-influencer").value.trim()
    let mail = document.getElementById("mail-influencer").value.trim()
    let comision = parseFloat(document.getElementById("comision-influencer").value)

    if(nombre === "" || mail === "" || isNaN(comision)){
        alert("Por favor completá todos los campos.")
        return
    }

    let nuevoInfluencer = new influencer(nombre, mail, comision)
    influencers.push(nuevoInfluencer)
    guardarInfluencers()

    document.getElementById("nombre-influencer").value = ""
    document.getElementById("mail-influencer").value = ""
    document.getElementById("comision-influencer").value = ""

    document.getElementById("tablaInfluencer").close()
}

function guardarInfluencers(){
    let tInf = document.getElementById("influencersTabla")
    tInf.innerHTML = ""
    for(let i = 0; i < influencers.length; i++){
        let inf = influencers[i]
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${inf.nombre}</td>
            <td>${inf.mail}</td>
            <td>${inf.comision}%</td>
            <td>$0</td>
            <td></td>
            <td></td>
        `
        tInf.appendChild(fila)
    }
}

function ingresoArticulo(){
    document.getElementById("tablaArticulo").showModal()
}
function cerrarArticulo(){
    document.getElementById("tablaArticulo").close()
}
function agregarArticulo(){
 let codigo = document.getElementById("codigo-articulo").value.trim()
    let descripcion = document.getElementById("descripcion-articulo").value.trim()
    let precio = parseFloat(document.getElementById("precio-articulo").value)

    if(codigo === "" || descripcion === "" || isNaN(precio)){
        alert("Por favor completá todos los campos.")
        return
    }

    let nuevoArticulo = new articulo(codigo, descripcion, precio)
    articulos.push(nuevoArticulo)
    guardarArticulos()

    document.getElementById("codigo-articulo").value = ""
    document.getElementById("descripcion-articulo").value = ""
    document.getElementById("precio-articulo").value = ""

    document.getElementById("tablaArticulo").close()
}
function guardarArticulos(){
    let tArt = document.getElementById("articulosTabla")
    tArt.innerHTML = ""
    for(let i = 0; i < articulos.length; i++){
        let inf = articulos[i]
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${inf.codigo}</td>
            <td>${inf.descripcion}</td>
            <td>$${inf.precio}</td>
        `
        tArt.appendChild(fila)
    }
}
function ingresoVenta(){
    document.getElementById("nro-venta").textContent = contadorVenta
    document.getElementById("tablaVenta").showModal()
}
function cerrarVenta(){
    document.getElementById("tablaVenta").close()
}
function agregarVenta(){
    let codigoArticulo = document.getElementById("articulo-venta").value
    let nombreInfluencer = document.getElementById("influencer-venta").value
    let cantidad = parseInt(document.getElementById("cantidad-venta").value)
    let medio = document.getElementById("medio-venta").value

    if(isNaN(cantidad) || cantidad <= 0){
        alert("Por favor completá todos los campos.")
        return
    }

    let nuevaVenta = new venta(contadorVenta, codigoArticulo, nombreInfluencer, cantidad, medio)
    ventas.push(nuevaVenta)
    contadorVenta++
    guardarVentas()

    document.getElementById("cantidad-venta").value = ""
    document.getElementById("tablaVenta").close()
}

function guardarVentas(){
    let tVen = document.getElementById("ventasTabla")
    tVen.innerHTML = ""
    for(let i = 0; i < ventas.length; i++){
        let v = ventas[i]
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${v.numero}</td>
            <td>${v.codigoArticulo}</td>
            <td>${v.nombreInfluencer}</td>
            <td>${v.cantidad}</td>
            <td>${v.medio}</td>
            <td><button type="button" onclick="eliminarVenta(${v.numero})">❌</button></td>
        `
        tVen.appendChild(fila)
    }
}

function eliminarVenta(numero){
    ventas = ventas.filter(v => v.numero !== numero)
    guardarVentas()
}

guardarVentas()
