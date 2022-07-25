const d = document,
w = window;
(()=>{
        const $templateSitio = d.getElementById("templateSitio").content,
            $templatePosts = d.getElementById("templatePosts").content;
        url = `https://cnnespanol.cnn.com`,
        infoSitio = `${url}/wp-json`,
        infoPost =`${infoSitio}/wp/v2/posts?_embed`;

    d.addEventListener("DOMContentLoaded", e =>{
        traerSitio(infoSitio);
        traerPosts(infoPost)
    })


    function traerSitio(infoSitio){
        try {
            const res = fetch(`${infoSitio}`)
            .then( res =>res.ok ?res.json() : Promise.reject(res))
            .then( json =>{
                const $clone = d.importNode($templateSitio,true);
                $clone.querySelector("h2").textContent = `${json.name}`;
                $clone.querySelector("p").textContent = `${json.description}`;
                $clone.querySelector("a").setAttribute("href",`${json.url}`);
                $clone.querySelector("a").setAttribute("target","_blank");
                $clone.querySelector("a").textContent = "Abrir sitio original";

                d.querySelector(".contenedorSitio").appendChild($clone)
            })
        } catch (error) {
            console.log(error);
        }
    }
    async function traerPosts(){
        try {
            const res = await fetch(`${infoPost}`),
                json = await res.json();
            console.log(json);

            json.forEach(post =>{
                const $clone2 = d.importNode($templatePosts,true)
            })
            d.querySelector(".contenedorPosts").appendChild($templatePosts)
        } catch (error) {
            console.log(error)
        }
    }
})();
