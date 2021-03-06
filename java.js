
let id = 1;

document.addEventListener('keydown', function(e){
    if(e.which === 13){
        getid();
    }
}); 
const getid = () => {
    id = document.getElementById('pokemon').value;
    if (typeof id === 'string') {
        id = id.toLowerCase();
    };
    if (id === '' || id <= 0) {
        console.log("Error - no se ingreso ningun valor");
        alert('Ingresa un nombre o un numero');
    } else {
        console.log(id);
        search(id);
    }
};
//esta es para buscar el pokemon y mostrarlo 
const search = async (id) => {
    document.querySelector("#datosdelpoke").className = "visually-hidden";
    document.querySelector("#mostrar").className = "mostrar-border align-self-center fs-4";
    try {
        let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await info.json();
        console.log(data);
        const pokemon = {
            img: data.sprites.other.home.front_default,
            id_pokemon: data.id,
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
        };
        mostrar(pokemon);
        setTimeout(() => {
            document.querySelector("#datosdelpoke").className = "d-flex flex-column align-items-center";
            document.querySelector("#mostrar").className = "visually-hidden";
        }, 500);
    } catch (e) {
        console.log(e);
        alert('ERROR - NO SE ENCUENTRA EL POKEMON');
        id = 1;
        console.log(id);
        search(id);
        clear();
    }
};

const clear = () => {
    document.getElementById('pokemon').value = "";
}

const mostrar = (pokemon) => {
    document.querySelector("#img-pokemon").setAttribute("src", pokemon.img);
    document.querySelector("#card-title").innerHTML = `${pokemon.nombre}`;
    document.getElementById("card-id").innerHTML = `${pokemon.id_pokemon} <span class="badge bg-secondary">id</span>`;
    document.getElementById("hp").innerHTML = `${pokemon.hp} <span class="badge bg-success">hp</span>`;
    document.getElementById("exp").innerHTML = `${pokemon.experiencia} <span class="badge bg-primary">exp</span>`;
    document.getElementById("atq").innerHTML = `${pokemon.ataque} <span class="badge bg-danger">atq</span>`;
    document.getElementById("def").innerHTML = `${pokemon.defensa} <span class="badge bg-warning">def</span>`;
    document.getElementById("buscador").className += ' bg-danger';
};

search(id);