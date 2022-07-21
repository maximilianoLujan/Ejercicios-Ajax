(()=>{
    const d = document,
        $form = d.getElementById("form"),
        $artista = d.getElementById("artista"),
        $letra = d.getElementById("letra");


    $form.addEventListener("submit", e =>{
        e.preventDefault();
        if ((!$artista.value)||(!$letra.value)) alert("Por favor, rellena todos los campos");
        traerArtista($artista.value);
    })
    const traerArtista = async (artista)=>{
        try {
            const res = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`),
                json = await res.json();
                console.log(json);
                console.log("hola")
        } catch (error) {
            
        }
    }
})();