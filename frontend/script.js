async function searchObject() {
  const movieName = document.getElementById("search").value; // get the input value
  if (movieName === "") { // check if input is empty
      alert("Please enter a movie name.");
      return;
  }

  //don't change this
  const prompt = `Please return only a JSON object with the format that looks like:
  {
    "songs": [
      {
        "title": "Song Title",
        "artist": "Artist Name",
        "description": "Song description",
        "image": "URL to song image"
      },
      {
        "title": "Song Title",
        "artist": "Artist Name",
        "description": "Song description",
        "image": "URL to song image"
      },
      ...
    ]
  }
  The songs should match the vibe, aesthetic, and mood of the movie ${movieName}.`;

  try {
      const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log('Response from backend:', data); 

      console.log("condition 1 check:", Array.isArray(data.songs))
      console.log("condition 2 check:", data.songs)
      if (data.songs && Array.isArray(data.songs)) {
        localStorage.setItem('movieTunesResults', JSON.stringify(data)); 
        window.location.href = 'results.html'; // go to results page
    } else {
        console.error('No songs found in the response.', data);
        alert('No songs found for the movie.');
    }
} catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
}
}