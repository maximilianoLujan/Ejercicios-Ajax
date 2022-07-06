(()=>{
    const d = document,
     $mitemplate = d.getElementById("template-pokemon").content,
     $pokemons = d.querySelector(".pokemons"),
     $mifragment = d.createDocumentFragment();

    const getAllPokemons = async  () =>{
        await fetch("https://pokeapi.co/api/v2/pokemon")
        .then( (res) => res.json())
        .then(json => {

            let pokemones = json.results;
            pokemones.forEach(pok =>{
                const $clone = d.importNode($mitemplate,true),
                $fig = $clone.querySelector(".pokemon"),
                $img = $fig.querySelector("img"),
                $fc = $fig.querySelector("figcaption");
                $fc.innerHTML = `<h4 style="text-align:center;">${pok.name}</h4>`;
                $img.setAttribute("alt",pok.name)
                console.log(pok)
                let url = pok.url;
                 fetch(url)
                 .then(res => res.json())
                 .then(json =>{
                    console.log(json)
                    const urlimg = json.sprites.back_default;
                    $img.setAttribute("src",urlimg);
                 })
                 .catch(err=>{
                    let message = err.statusText || "Ha ocurrido un error inesperado"
                    d.querySelector("main").innerHTML = `<h2 style="text-align:center;">${err.status}:${message}</h2>`
                 })

                $mifragment.appendChild($clone)
            })
            $pokemons.appendChild($mifragment)
        })
        .catch(err =>{
            let message = err.statusText || "Ha ocurrido un error inesperado"
            d.querySelector("main").innerHTML = `<h2 style="text-align:center;">${err.status}:${message}</h2>`
        })
    }
    d.addEventListener("DOMContentLoaded", e =>{
        getAllPokemons();
    });
})();