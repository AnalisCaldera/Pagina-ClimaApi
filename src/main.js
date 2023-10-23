//Weatherapi
const key = 'b04cb8a4c88944c48d525146231410';
const urlPronostico = 'http://api.weatherapi.com/v1/forecast.json';

const inputCiudad = document.querySelector("#ciudad")
const inputEstado = document.querySelector("#estado")
const inputPais = document.querySelector("#pais")
const inputUnDia = document.querySelector("#un-dia")
const inputCincoDia = document.querySelector("#cinco-dia")
const inputConsultar = document.querySelector("#consultar")
const formulario = document.querySelector("#formulario");
const sectionFormul = document.querySelector('.formul');
const botonComienza = document.querySelector('.boton-empezar')
const botonEliminar = document.querySelector('.boton-limpiar')
const sectionInvitacion = document.querySelector('.fondo-pronost')
const contenedorPredicciones = document.querySelector('.contenedor-respuesta')
const contenedorPronostico = document.querySelector('.pronostico')

async function fetchData(urlApi, city, region, country, days) {
    const response = await fetch(`${urlApi}=?key=${key}&q=${city}&q=${region}&q=${country}&days=${days}&aqi=no&alerts=no&lang=es`);
    const data = await response.json();
    return data;
}

const apiClimaPronostico = async (url, city, region, country, days) => {
    try {
        const results = await fetchData(url, city, region, country, days);

        if (days == 1) {
            const respuestaPronostico = document.createElement('div');
            respuestaPronostico.className = "respuesta-pronostico inactive";
    
            //primer div con fecha
            const fecha = document.createElement('div');
            fecha.className = "fecha";
    
            const dia = document.createElement('p');
            const fechaReversa = results.forecast.forecastday[0].date;
            let partes = fechaReversa.split("-");
            let fechaConvertida = partes[2] + "-" + partes[1] + "-" + partes[0];
            dia.textContent = `${fechaConvertida}`;
    
            fecha.appendChild(dia);
    
            //segundo div con dos elementos: un div e img
            const temperaturaEImagen = document.createElement('div');
            temperaturaEImagen.className = "tempe-image";
    
            const temperatura = document.createElement('div');
            temperatura.className = "temperatura";
    
            const tiempo = document.createElement('p');
            tiempo.textContent = `${results.current.condition.text}`;
            const grados = document.createElement('p');
            grados.textContent = `${results.current.temp_c}°`;
            const sensacionTerText = document.createElement('p');
            sensacionTerText.textContent = "Sensación Térmica"
            const sensacionTer = document.createElement('p');
            sensacionTer.textContent = `${results.current.feelslike_c}°`;
    
            temperatura.appendChild(tiempo)
            temperatura.appendChild(grados)
            temperatura.appendChild(sensacionTerText)
            temperatura.appendChild(sensacionTer)
    
            const imgTempe = document.createElement('img');
            imgTempe.src = `${results.current.condition.icon}`;
    
            temperaturaEImagen.appendChild(temperatura);
            temperaturaEImagen.appendChild(imgTempe)
    
            //tercer div con informacion de la region
            const divRegion = document.createElement('div');
            divRegion.className = "region";
    
            const textRegion = document.createElement('p');
            textRegion.textContent = `${results.location.name} / ${results.location.region} / ${results.location.country}`;
    
            divRegion.appendChild(textRegion)
    
    
            respuestaPronostico.append(fecha, temperaturaEImagen, divRegion)
            contenedorPredicciones.append(respuestaPronostico)
            respuestaPronostico.classList.remove('inactive');
        }else{
            [...results.forecast.forecastday].forEach((items) =>{
                const respuestaPronostico = document.createElement('div');
                respuestaPronostico.className = "respuesta-pronostico inactive";
        
                //primer div con fecha
                const fecha = document.createElement('div');
                fecha.className = "fecha";
        
                const dia = document.createElement('p');
                const fechaReversa = items.date;
                let partes = fechaReversa.split("-");
                let fechaConvertida = partes[2] + "-" + partes[1] + "-" + partes[0];
                dia.textContent = `${fechaConvertida}`;
        
                fecha.appendChild(dia);
        
                //segundo div con dos elementos: un div e img
                const temperaturaEImagen = document.createElement('div');
                temperaturaEImagen.className = "tempe-image";
        
                const temperatura = document.createElement('div');
                temperatura.className = "temperatura-cinco";
        
                const tiempo = document.createElement('p');
                tiempo.textContent = `${items.day.condition.text}`;
                tiempo.className = "min-max";
                const tempMinText = document.createElement('p');
                tempMinText.textContent = `Temperatura mínima:`;
                tempMinText.className = "min-max";
                const tempMin = document.createElement('p');
                tempMin.textContent = `${items.day.mintemp_c}°`;
                tempMin.className = "valor-min-max";
                const tempMaxText = document.createElement('p');
                tempMaxText.textContent = `Temperatura máxima:`;
                tempMaxText.className = "min-max";
                const tempMax = document.createElement('p');
                tempMax.textContent = `${items.day.maxtemp_c}°`;
                tempMax.className = "valor-min-max";
        
                temperatura.appendChild(tiempo)
                temperatura.appendChild(tempMinText)
                temperatura.appendChild(tempMin)
                temperatura.appendChild(tempMaxText)
                temperatura.appendChild(tempMax)
        
                const imgTempe = document.createElement('img');
                imgTempe.src = `${results.current.condition.icon}`;
        
                temperaturaEImagen.appendChild(temperatura);
                temperaturaEImagen.appendChild(imgTempe)
        
                //tercer div con informacion de la region
                const divRegion = document.createElement('div');
                divRegion.className = "region";
        
                const textRegion = document.createElement('p');
                textRegion.textContent = `${results.location.name} / ${results.location.region} / ${results.location.country}`;
        
                divRegion.appendChild(textRegion)
        
                respuestaPronostico.append(fecha, temperaturaEImagen, divRegion)
                contenedorPredicciones.append(respuestaPronostico)
                respuestaPronostico.classList.remove('inactive');
            })
        }
    } catch (error) {
        alert('Los datos ingresados son incorrectos, intente de nuevo')
    }
}

function mostrarPronostico() {
    const days = listaPronostico();
    apiClimaPronostico(urlPronostico, inputCiudad.value, inputEstado.value, inputPais.value, days);
}

function listaPronostico() {
    if (inputUnDia.checked) {
        return days = 1;
    } else{
        return days = 5;
    }
}

formulario.addEventListener('submit', () => {
    event.preventDefault();
    mostrarPronostico();
})

botonComienza.addEventListener('click', () =>{
    contenedorPronostico.classList.remove('inactive');
    sectionFormul.classList.remove('inactive');
})

botonEliminar.addEventListener('click', () =>{
    [...contenedorPredicciones.childNodes].forEach((item) =>{
        item.remove();
    })
})
