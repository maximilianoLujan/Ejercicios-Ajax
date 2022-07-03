(()=>{
    const d = document,
    $miformulario = d.querySelector(".formulario"),
    $archivos = d.getElementById("input-file");

    d.addEventListener("submit", e =>{
        e.preventDefault();
        console.log($archivos)
    })
})()