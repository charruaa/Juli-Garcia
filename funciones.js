document.getElementById("boton-influencer").addEventListener("click",ingresoInfluencer)
document.getElementById("cancelar-influencer").addEventListener("click",cerrarInfluencer)
document.getElementById("agregar-influencer").addEventListener("click",agregarInfluencer)

document.getElementById("boton-articulo").addEventListener("click",ingresoArticulo)
document.getElementById("cancelar-articulo").addEventListener("click",cerrarArticulo)
document.getElementById("agregar-articulo").addEventListener("click",agregarArticulo)

document.getElementById("boton-venta").addEventListener("click",ingresoVenta)
document.getElementById("cancelar-venta").addEventListener("click",cerrarVenta)
document.getElementById("agregar-venta").addEventListener("click",agregarVenta)

document.getElementById("orden-influencers").addEventListener("click", ordenarInfluencers)
document.getElementById("orden-articulos").addEventListener("click", ordenarArticulos)

let ordenInfluencersAsc = true
let ordenArticulosAsc = true

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

    let stats = {}
    for (let i = 0; i < influencers.length; i++) {
        stats[influencers[i].nombre] = { totalCobrar: 0, cantVentas: 0, ventaMaxMonto: 0 }
    }

    for (let i = 0; i < ventas.length; i++) {
        let v = ventas[i]
        let art = null
        for (let j = 0; j < articulos.length; j++) {
            if (articulos[j].codigo === v.codigoArticulo) { 
                art = articulos[j]; break 
            }
        }
        let inf = null
        for (let j = 0; j < influencers.length; j++) {
            if (influencers[j].nombre === v.nombreInfluencer) { 
                inf = influencers[j];
                break
                }
        }
        if (art && inf && stats[inf.nombre] !== undefined) {
            let monto = v.cantidad * art.precio
            stats[inf.nombre].totalCobrar += monto * inf.comision / 100
            stats[inf.nombre].cantVentas++
            if (monto > stats[inf.nombre].ventaMaxMonto) stats[inf.nombre].ventaMaxMonto = monto
        }
    }

    let maxCobrar = 0
    let maxMonto = 0
    for (let nombre in stats) {
        if (stats[nombre].totalCobrar > maxCobrar) maxCobrar = stats[nombre].totalCobrar
        if (stats[nombre].ventaMaxMonto > maxMonto) maxMonto = stats[nombre].ventaMaxMonto
    }

    for(let i = 0; i < influencers.length; i++){
        let inf = influencers[i]
        let s = stats[inf.nombre]
        let etiquetas = ""
        if (maxCobrar > 0 && s.totalCobrar === maxCobrar) etiquetas += "🔥"
        if (s.cantVentas === 0) etiquetas += "🧊"
        if (maxMonto > 0 && s.ventaMaxMonto === maxMonto) etiquetas += "🟢"

        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${inf.nombre}</td>
            <td>${inf.mail}</td>
            <td>${inf.comision}%</td>
            <td>$${s.totalCobrar.toFixed(2)}</td>
            <td>${etiquetas}</td>
            <td><button type="button" onclick="ventasInfluencer('${inf.nombre}')">Ver</button></td>
        `
        tInf.appendChild(fila)
    }
}
function ventasInfluencer(nombre){
    let inf = null
    for (let j = 0; j < influencers.length; j++) {
        if (influencers[j].nombre === nombre) { inf = influencers[j]; break }
    }

    let ventasIndividuales = ""
    for (let i = 0; i < ventas.length; i++){
        let v = ventas[i]
        if (v.nombreInfluencer === nombre){
            let art = null
            for (let j = 0; j < articulos.length; j++) {
                if (articulos[j].codigo === v.codigoArticulo) { art = articulos[j]; break }
            }
            let precio = art ? art.precio : 0
            let totalPlata = v.cantidad * precio
            let comision = inf ? inf.comision : 0
            ventasIndividuales += `\nNro ${v.numero} → Cant: ${v.cantidad} → Art: ${v.codigoArticulo} → $${precio} | Total: $${totalPlata.toFixed(2)} | Comisión: $${(totalPlata * comision / 100).toFixed(2)}`
        }
    }

    if (ventasIndividuales === "") ventasIndividuales = "Sin ventas registradas."
    alert(ventasIndividuales)
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

    let unidades = {}
    for (let i = 0; i < articulos.length; i++) unidades[articulos[i].codigo] = 0
    for (let i = 0; i < ventas.length; i++) {
        if (unidades[ventas[i].codigoArticulo] !== undefined)
            unidades[ventas[i].codigoArticulo] += ventas[i].cantidad
    }

    let maxUnidades = 0
    for (let codigo in unidades) {
        if (unidades[codigo] > maxUnidades) maxUnidades = unidades[codigo]
    }

    for(let i = 0; i < articulos.length; i++){
        let art = articulos[i]
        let estrella = (maxUnidades > 0 && unidades[art.codigo] === maxUnidades) ? " ⭐" : ""
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${art.codigo}</td>
            <td>${art.descripcion}${estrella}</td>
            <td>$${art.precio}</td>
        `
        tArt.appendChild(fila)
    }
}
function ingresoVenta(){
    let selectArticulo = document.getElementById("articulo-venta")
    selectArticulo.innerHTML = ""
    for (let i = 0; i < articulos.length; i++) {
        let opt = document.createElement("option")
        opt.value = articulos[i].codigo
        opt.textContent = articulos[i].codigo + " - " + articulos[i].descripcion
        selectArticulo.appendChild(opt)
    }

    let selectInfluencer = document.getElementById("influencer-venta")
    selectInfluencer.innerHTML = ""
    for (let i = 0; i < influencers.length; i++) {
        let opt = document.createElement("option")
        opt.value = influencers[i].nombre
        opt.textContent = influencers[i].nombre
        selectInfluencer.appendChild(opt)
    }

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
    guardarInfluencers()
    guardarArticulos()
}

function eliminarVenta(numero) {
    let ventasSinEliminar = []

    for (let i = 0; i < ventas.length; i++) {
        if (ventas[i].numero !== numero) {
            ventasSinEliminar.push(ventas[i])
        }
    }

    ventas = ventasSinEliminar
    guardarVentas()
}

guardarVentas()

function ordenarInfluencers() {
    if (ordenInfluencersAsc) {
        influencers.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre)
        })
        document.getElementById("orden-influencers").textContent = "Nombre ↑"
    } else {
        influencers.sort(function(a, b) {
            return b.nombre.localeCompare(a.nombre)
        })
        document.getElementById("orden-influencers").textContent = "Nombre ↓"
    }
    ordenInfluencersAsc = !ordenInfluencersAsc
    guardarInfluencers()
}

function ordenarArticulos() {
    if (ordenArticulosAsc) {
        articulos.sort(function(a, b) {
            return a.codigo.localeCompare(b.codigo)
        })
        document.getElementById("orden-articulos").textContent = "Código ↑"
    } else {
        articulos.sort(function(a, b) {
            return b.codigo.localeCompare(a.codigo)
        })
        document.getElementById("orden-articulos").textContent = "Código ↓"
    }
    ordenArticulosAsc = !ordenArticulosAsc
    guardarArticulos()
}
