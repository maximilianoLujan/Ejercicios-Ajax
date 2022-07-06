(()=>{
    const d = document,
     $mitemplate = d.getElementById("template-pokemon").content,
     $pokemons = d.querySelector(".pokemons"),
     $mifragment = d.createDocumentFragment(),
     $botonN = d.getElementById("next"),
     $botonB = d.getElementById("back"),
     $pag = d.getElementById("pag"),
     $div = d.querySelector(".loader");
     let pagina = 0;


    const getAllPokemons = async  (pagina) =>{
        await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagina}&limit=20`)
        .then( (res) => res.json())
        .then(json => {
            console.log(json)

            let pokemones = json.results;
            pokemones.forEach(pok =>{
                let $clone = d.importNode($mitemplate,true),
                $fig = $clone.querySelector(".pokemon"),
                $img = $fig.querySelector("img"),
                $fc = $fig.querySelector("figcaption");
                $fc.innerHTML = `<h4 style="text-align:center;">${pok.name}</h4>`;
                $img.setAttribute("alt",pok.name);
                let url = pok.url;
                 fetch(url)
                 .then(res => res.json())
                 .then(json =>{
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
      getAllPokemons(pagina);
        d.addEventListener("click", e =>{
            if (e.target == $botonB){
                if (pagina === 0){
                    alert("No hay mas paginas hacia atras");
                } else{
                    borrarFiguras();
                    pagina-=20;
                    $div.classList.toggle("active");
                    getAllPokemons(pagina);
                    setTimeout(() => {
                        $div.classList.toggle("active");
                    }, 1500);
                    $pag.value = `${pagina/20}`
                }
                if (pagina !== 0) $botonB.disabled = true;
            }
            if (e.target == $botonN){
                borrarFiguras();
                pagina+=20;
                $div.classList.toggle("active");
                getAllPokemons(pagina);
                setTimeout(() => {
                    $div.classList.toggle("active");
                }, 1000);
                $pag.value = `${pagina/20}`
            }
            if (pagina !== 0) $botonB.disabled = false;
        })
    });
    const borrarFiguras = () =>{
        $figuras = d.querySelectorAll("figure");
            $figuras.forEach(fi=>{
                fi.remove()
            })
    }
})();