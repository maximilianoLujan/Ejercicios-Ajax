const d = document,
     $templateSitio = d.getElementById("templateSitio").content;
export default function traerSitio(infoSitio){
        try {
            const res = fetch(`${infoSitio}`)
            .then( res =>res.ok ?res.json() : Promise.reject(res))
            .then( json =>{
                d.getElementById("loader").style.display ="none";
                const $clone = d.importNode($templateSitio,true);
                $clone.querySelector("h1").textContent = `Sitio Web:  ${json.name}`;
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