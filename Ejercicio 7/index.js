(()=>{
    const d = document,
        $form = d.getElementById("form"),
        $artista = d.getElementById("artista"),
        $letra = d.getElementById("letra"),
        $template = d.getElementById("template-artista").content,
        $seccionartista = d.querySelector(".seccion-artista");


    $form.addEventListener("submit", e =>{
        e.preventDefault();
        if ((!$artista.value)||(!$letra.value)){
            alert("Por favor, rellena todos los campos");
            return
        }
        traerArtista($artista.value);
    })
    const traerArtista = async (artista)=>{
        try {
            const res = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`),
                json = await res.json();
            if (json.artists === null){
                $seccionartista.innerHTML += `<h2>El artista no se encuentra en la base de datos o es incorrecto</h2>`;
            }
            if (!res.ok){
                let message = res.statusText || "Ha ocurrido un error";
                return message;
            }
            $seccionartista.innerHTML = "";
            const $clone = d.importNode($template,true),
                $nombre = $clone.querySelector("h3"),
                $genero = $clone.querySelector(".genero"),
                $lugar = $clone.querySelector(".lugar"),
                $sitio = $clone.querySelector(".sitio")
                $imagen = $clone.querySelector("img"),
                $descripcion = $clone.querySelector("p");
            let art = json.artists[0];
                $nombre.textContent += `${art.strArtist}`;
                $genero.textContent = `Genero: ${art.strGenre}`;
                $lugar.textContent = `Lugar de Origen: ${art.strCountry}`;
                $sitio.innerHTML = `<a href="https://${art.strWebsite}" target="_blank">Visita su sitio web</a>`;
                $imagen.setAttribute("src",`${art.strArtistBanner}`);
                $imagen.setAttribute("alt",`art.strArtist`)
                $descripcion.textContent = `${art.strBiographyEN}`;

                $seccionartista.appendChild($clone);
            
        } catch (error) {
            $seccionartista.innerHTML += `<h2>${error}</h2>`;
        }
    }
})();