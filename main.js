document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('button');
    let output = document.getElementById('output');
    btn.onclick = handleClick;


    async function handleClick(){
        const url =  await fetch('https://api.artic.edu/api/v1/artworks?limit=40')
        .then(response => response.json())
        .then(data => data)
        const image = document.createElement('img');
        image.src = url;
        output.append('image');
        
     console.log(image);
    }

})


