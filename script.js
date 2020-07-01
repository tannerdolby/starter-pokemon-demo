const btn = document.getElementById("choose");
const pokeName = document.getElementById("poke-name");
const pokeType = document.getElementById("poke-type");
const pokeWeight = document.getElementById("poke-weight");
const pokeImg = document.getElementById("pokemon-img");
const pokeHP = document.getElementById("poke-hp");
const pokeBall = document.getElementById("poke-ball");
const tile = document.getElementsByClassName("pokemon-tile")[0];
const oaksLabTxt = document.getElementById("lab");
const squirtle = document.getElementsByClassName("squirtle")[0];
const charmander = document.getElementsByClassName("charmander")[0];
const bulbasaur = document.getElementsByClassName("bulbasaur")[0];
const bigSquirtle = document.getElementById("squirt");
const bigCharmander = document.getElementById("char");
const bigBulbasaur = document.getElementById("bulb");
const water = document.getElementById("water");
const leaf = document.getElementById("leaf");
const flame = document.getElementById("flame");
const squirtlePreview = document.getElementById("sq-prev");
const charmanderPreview = document.getElementById("charm-prev");
const bulbusaurPreview = document.getElementById("bulb-prev");
const namePreviewSQ = document.getElementById("nameSq");
const namePreviewCH = document.getElementById("nameChar");
const namePreviewBU = document.getElementById("nameBulb");
const pokemonCard = document.getElementById("back-card");
const finalMsg = document.getElementById("final-msg");
const resetBtn = document.getElementById("reset");

// Some GSAP
gsap.set(pokeBall, {
    transformOrigin: "50% 50%"
});
gsap.from(pokeBall, {
    delay: 1,
    scale: 0.5,
    opacity: 0,
    duration: 3,
    ease: "back"
});
gsap.to(pokeBall, {
    rotation: 360,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1
});

const getPokeImg = (pokemon_id) => {
    
    let img_src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon_id}.png`;
    gsap.from(pokeImg, {
        opacity: 0,
        duration: 1,
        ease: "sine"
    });
    return img_src;
}

document.addEventListener("DOMContentLoaded", () => {
    
    const getPokemon = (id) => {
        const req = new XMLHttpRequest();
        req.open("GET", `https://pokeapi.co/api/v2/pokemon/${id}`, true);
        req.send();
        req.onload = () => {
            
            let json = JSON.parse(req.responseText);
            let types = json.types.length >= 2 ? json.types[0]["type"]["name"].concat(" ", json.types[1]["type"]["name"]) : json.types[0]["type"]["name"];
            let formatted_type = types.charAt(0).toUpperCase().concat(types.slice(1)).concat(" Pokemon.");
            let poke_hp = json.stats[0]["base_stat"];
            let poke_id = json.id;
            let poke_name = json.name.charAt(0).toUpperCase().concat(json.name.slice(1));
            
            let pokemon = {
                name: poke_name,
                hp: poke_hp,
                id: poke_id,
                type: formatted_type,
                weight: json.weight,
                image: getPokeImg(poke_id),
                abilities: json.abilities
            }
            console.log(pokemon);

            // grab image src from API and assign it to DOM element
            pokeImg.src = pokemon.image;
            pokeType.textContent = pokemon.type;
            pokeName.textContent = pokemon.name;
            pokeWeight.textContent = `Weight: ${pokemon.weight} lbs.`;
            pokeHP.textContent = `${pokemon.hp} HP`;
            finalMsg.textContent = `You selected ${pokemon.name}`;
        }
    }
    // Click event for generating starter pokemon
    btn.addEventListener("click", () => {
        let randomPoke = Math.floor(Math.random() * 3);
        let startPokemon = [1, 4, 7];
        tile.style.visibility = "visible";
        pokeImg.style.visibility = "visible";
        pokeBall.style.visibility = "hidden";
        finalMsg.style.visibility = "visible";
        getPokemon(startPokemon[randomPoke]);
    });
    
    resetBtn.addEventListener("click", () => {
        tile.style.visibility = "hidden";
        pokeBall.style.visibility = "visible";
        pokeImg.style.visibility = "hidden";
        finalMsg.style.visibility = "hidden";
    });

    squirtlePreview.addEventListener("mouseover", () => {
        namePreviewSQ.style.borderColor = "#000";
        gsap.to(water, {
            visibility: "visible",
            opacity: 1,
            scale: 1,
            y: -10,
            x: 1,
            duration: 1,
            yoyo: true,
            ease: "sine"
        });
        
    });
    squirtlePreview.addEventListener("mouseout", () => {
        namePreviewSQ.style.borderColor = "#FFF";
        gsap.to(water, {
            opacity: 0,
            duration: 1,
            ease: "sine"
        });  
    });

    charmanderPreview.addEventListener("mouseover", () => {
        namePreviewCH.style.borderColor = "#000";
        gsap.to(flame, {
            visibility: "visible",
            opacity: 1,
            scale: 1,
            y: -10,
            x: 0,
            duration: 1,
            yoyo: true,
            ease: "sine"
        });
    });
    charmanderPreview.addEventListener("mouseout", () => {
        namePreviewCH.style.borderColor = "#FFF";
        gsap.to(flame, {
            opacity: 0,
            duration: 1,
            ease: "sine"
        });
    });

    bulbusaurPreview.addEventListener("mouseover", () => {
        namePreviewBU.style.borderColor = "#000";
        gsap.to(leaf, {
            visibility: "visible",
            opacity: 1,
            scale: 1,
            y: -10,
            x: 0,
            duration: 1,
            yoyo: true,
            ease: "sine"
        });
    });
    bulbusaurPreview.addEventListener("mouseout", () => {
        namePreviewBU.style.borderColor = "#FFF";
        gsap.to(leaf, {
            opacity: 0,
            duration: 1,
            ease: "sine"
        });
    });

});