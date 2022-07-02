(()=>{
    const d = document,
        w = window,
        $main = d.querySelector("main");

    const getAll = (options) =>{
        let {url,success,error} = options;

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", e=>{
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300){
                let html = xhr.responseText;
                success(html);
            } else{
                let message = `${xhr.statusText}` || "ha ocurrido un error";
                error(`${xhr.status}: ${message}`);
            }
        })
            xhr.open("GET",url);
            xhr.setRequestHeader("Content-type","text/html; charset=utf-8");
            xhr.send();
    }
    d.addEventListener("DOMContentLoaded",e => {
        getAll({
            url: "assets/header.html",
            success: (html)=> {
                $main.insertAdjacentHTML("beforebegin",html);
            },
            error: (err)=> $main.insertAdjacentHTML("beforebegin",err)
        })
        getAll({
            url: "assets/footer.html",
            success: (html)=> {
                $main.insertAdjacentHTML("afterend",html);
            },
            error: (err)=> $main.insertAdjacentHTML("afterend",err)
        })
    })
    d.addEventListener("click", e=>{
        if (e.target.matches(".enlaces a")){
            e.preventDefault()
            w.open(e.target.href,"_SELF");
        }
    })
})();