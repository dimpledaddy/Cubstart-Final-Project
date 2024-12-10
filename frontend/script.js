async function searchObject() {
  const movieName = document.getElementById("search").value; // get the input value
  if (movieName === "") { // check if input is empty
      alert("Please enter a movie name.");
      return;
  }

  //don't change this
  const prompt = `Please return ONLY a valid JSON object formatted as follows:
    {
      "songs": [
        {
          "title": "Song Title",
          "artist": "Artist Name",
          "description": "Song description",
          "image": "Absolute URL to the song's album cover"
        }
      ]
    }
    Strictly adhere to this format, without any additional text.
  The songs should match the vibe, aesthetic, and mood of the movie ${movieName}.`;

  try { // throw error so no crash
      const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
      });

      const textResponse = await response.text();
      console.log('Raw response from backend: ', textResponse)
      const data = JSON.parse(textResponse)
      console.log('JSON Response from backend:', data);

      if (data.songs) { // check
        localStorage.setItem('movieTunesResults', JSON.stringify(data));  
        window.location.href = 'results.html'; // go to results page upon clicking generate
    } else {
        console.log('OpenAI Response 2:', response.data.choices[0].message.content);
        console.error('No songs found in the response.', data);
        alert('No songs found for the movie.');
    }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  }
}
