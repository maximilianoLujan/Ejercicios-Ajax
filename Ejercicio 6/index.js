(()=>{
    const d = document,
    $miinput = d.getElementById("miinput"),
    $mifragmento = d.createDocumentFragment(),
    $clone = d.querySelector(".mitemplate").content,
    $contenedor = d.querySelector(".contenedor-busqueda");

    d.addEventListener("DOMContentLoaded", e => {
        d.addEventListener("keyup",ev =>{
            if (ev.key === "Enter" && ev.target === $miinput && $miinput.value !== ""){
                traerShows();
            }
        })
    })

    const traerShows = async ()=>{
        let busqueda = $miinput.value;
        try {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${busqueda}`),
                  json = await res.json();
            
            if (!res.ok){
                throw({
                    message: res.statusText || "ha ocurrido un error",
                    code: res.status
                });
            }
            json.forEach(el =>{
                const $fig = d.importNode($clone,true),
                $fc = $fig.querySelector("b"),
                $parrafo = $fig.querySelector("p"),
                $image = $fig.querySelector("img"),
                $enlace = $fig.querySelector("a");

                $fc.textContent = el.show.name;
                $parrafo.innerHTML = `${el.show.summary}`;
                $image.src = `${el.show.image.medium}`;
                $image.alt = el.show.name;
                $enlace.href = el.show.url;

                $mifragmento.appendChild($fig);
            })
            $contenedor.appendChild($mifragmento)
        } catch (error) {
            console.log(error)
        }
    }
})();