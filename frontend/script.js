// testing
document.addEventListener('DOMContentLoaded', () => {
    const prompt = "What is a song that matches the vibe of the movie Venom?";
  
    fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from OpenAI:', data.message);
      })
      .catch((error) => console.error('Error:', error));
  });

//   search object inside the search bar
async function searchObject() {
    const objectName = document.getElementById("search-input").ariaValueMax;
    if (objectName === "") {
        alert("Please enter a movie name.");
        return;
    }
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ objectName: objectName})
        });
    }
}