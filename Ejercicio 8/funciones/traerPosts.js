const d = document,
    $templatePosts = d.getElementById("templatePosts").content,
    $fragmento = d.createDocumentFragment();
export default async function traerPosts(infoPost){
        try {
            const res = await fetch(`${infoPost}`),
                json = await res.json();
            console.log(json);

            json.forEach(post =>{
                let categorias = "";
                post._embedded["wp:term"][0].forEach(el=>{
                    categorias += `<li>${el.slug}</li>`;
                })
                const $clone2 = d.importNode($templatePosts,true);
                    $clone2.querySelector("img").setAttribute("src",`${post._embedded["wp:featuredmedia"][0].source_url}`);
                    $clone2.querySelector("img").setAttribute("alt",`${post.title.rendered}`);
                    $clone2.querySelector(".contenido").innerHTML = `${post.content.rendered}`;
                    $clone2.querySelector("h2").textContent = `${post.title.rendered}`;
                    $clone2.querySelector("ul").innerHTML = `${categorias}`;
                    
                $fragmento.append($clone2);
            })
            d.querySelector(".contenedorPosts").appendChild($fragmento)
        } catch (error) {
            console.log(error)
        }
}