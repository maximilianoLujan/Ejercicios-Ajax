(()=>{
    const d = document;
    fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=be70adc9513812f8307fecfa5198f557&hash=8bf1279fdb554f559221ca138f60903e")
    .then(response => response.json())
    .then(json=> console.log(json))
    .catch(err => console.log(err))
})()