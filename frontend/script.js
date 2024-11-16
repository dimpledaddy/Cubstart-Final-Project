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