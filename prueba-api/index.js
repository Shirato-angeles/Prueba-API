// URL a consumir
const API = 'https://rickandmortyapi.com/api/character';


// Logica de api y filtro de personajes...

async function searchPersons(name = '', status = '') {
    // console.log('Inicando finción');

    try {
        const url = `${API}/?name=${name}&status=${status}`

        console.log('consultando', url);

        const respuesta = await fetch(url)

        if (respuesta.status === 404) {
            console.log('❌No encuentro el personaje');
            return;
        }

        if (!respuesta.ok) {
            console.log('Status ...', respuesta.status);

            throw new Error(`Error HTTP: ${respuesta.status}`);

        }


        //--------------------------------------------------------------- response json

        const datos = await respuesta.json();
        // console.log(datos);

        if (!datos || !datos.results) {
            throw new Error("Formato de respuesta no valido");
        }

       

        // -------------------------- filtro 
        const resultClean = datos.results.map(personaje => ({
            id: personaje.id,
            nombre: personaje.name,
            estado: personaje.status,
            especie: personaje.species,
            genero: personaje.gender,
            imagen: personaje.image
        }));

        console.log('✅Personajes encontrados:');
        console.table(resultClean);


    } catch (error) {
        console.log('error', error.message);

    }

}


searchPersons('PersonajeNoexiste', 'dead') 
