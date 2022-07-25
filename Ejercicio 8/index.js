import traerPosts from "./funciones/traerPosts.js";
import traerSitio from "./funciones/traerSitio.js";

const d = document,
w = window;
(()=>{
    const url = `https://cnnespanol.cnn.com`,
    infoSitio = `${url}/wp-json`,
    infoPost =`${infoSitio}/wp/v2/posts?_embed`;

    d.addEventListener("DOMContentLoaded", e =>{
        traerSitio(infoSitio);
        traerPosts(infoPost)
    })
    w.addEventListener("scroll", e =>{
        let scrollY = w.scrollY
        console.log(w.scrollY)
        console.log(w.innerHeight)
    })
})();
