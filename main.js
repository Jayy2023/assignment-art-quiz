document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    const nextBtn = document.getElementById('start');
    const startBtn = document.querySelector('#go');
    startBtn.onclick = handleClick;
    nextBtn.onclick = handleClick;
  
    const apiUrl = `https://api.artic.edu/api/v1/artworks?limit=40&fields=id,image_id,title,artist_display`;
    let score = 0;
    let currentTurn = 0;
    let currentArtists = [];
    let correctArtist = '';
  
    async function fetchArtworks(){
      const data = await fetch(apiUrl);
      const response = await data.json();
      return response;
    }
  
    async function handleClick() {
      const data = await fetchArtworks();
      const artworks = shuffleArray(data.data);
  
      for (let i = 0; i < 10; i++) {
        currentArtists = [];
        displayImages(artworks);
        const question = generateQuestion(currentArtists);
        correctArtist = question.answer;
        displayQuestion(question);
      }
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function displayImages(artworks) {
      output.innerHTML = "";
      for (let i = 0; i < 4; i++) {
        const artwork = artworks.pop();
        const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
        const img = document.createElement("img");
        img.src = imageUrl;
        img.setAttribute('data-artist', artwork.artist_display); // set data attribute with artist name
        img.onclick = checkAnswer; // add click event listener to check answer
        output.appendChild(img);
        const artistName = artwork.artist_display;
        currentArtists.push(artistName);
        const artistText = document.createElement("p");
        artistText.innerText = `Artist: ${artistName}`;
        // output.appendChild(artistText);
      }
    }
  
    function generateQuestion(artists) {
      const correctAnswer = artists[Math.floor(Math.random() * 4)];
      const question = {
        text: `Which artwork was made by ${correctAnswer}?`,
        answer: correctAnswer,
        choices: shuffleArray(artists)
      };
      return question;
    }
  
    function displayQuestion(question) {
      const questionText = document.createElement("p");
      questionText.innerText = question.text;
      output.appendChild(questionText);
    }
  
    function checkAnswer(event) {
      const clickedArtist = event.target.getAttribute('data-artist');
      if (clickedArtist === correctArtist) {
        score++;
      }
      currentTurn++;
      if (currentTurn === 10) {
        output.innerHTML = `Game over! You scored ${score} out of 10.`;
      } else {
        output.innerHTML = "";
        const scoreText = document.createElement("p");
        scoreText.innerText = `Score: ${score}`;
        output.appendChild(scoreText);
        const artworks = shuffleArray(data.data);
        displayImages(artworks);
        const question = generateQuestion(currentArtists);
        correctArtist = question.answer;
        displayQuestion(question);
      }
    }
  });
  

