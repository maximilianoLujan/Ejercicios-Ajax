(()=>{
    const d = document,
        $template = d.getElementById("template-characters").content,
        $fragment = d.createDocumentFragment(),
        $contenedorpj = d.querySelector(".contenedorpj")
    fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=be70adc9513812f8307fecfa5198f557&hash=8bf1279fdb554f559221ca138f60903e")
    .then(response => response.json())
    .then(json => json.data.results)
    .then(characters =>{
        characters.forEach(char=>{
            let url = `${char.thumbnail.path}.${char.thumbnail.extension}`;
            const $clone = d.importNode($template,true),
                $fig = $clone.querySelector(".character"),
                $img = $fig.querySelector("img"),
                $figc = $fig.querySelector("figcaption");
            $fig.setAttribute("id",`${char.id}`);
            $img.setAttribute("src",url.replace("http","https"))
            $img.setAttribute("alt",`${char.name}`)
            $figc.innerHTML = `<P><b>${char.name}</b></P>`    
            console.log($clone)
            console.log(char)

            $fragment.appendChild($clone);
        })
        $contenedorpj.appendChild($fragment)
    })
    .catch(err => console.log(err))
})()