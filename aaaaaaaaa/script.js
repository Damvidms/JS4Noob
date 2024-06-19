const form = document.getElementById('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const functionCode = document.getElementById('function').value;
  try {
    const response = await fetch('evaluate.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ functionCode }),
    });
    const result = await response.json();
    
    document.getElementById('result').innerHTML = `La función se evaluó ${result.evaluation}`;
  } catch (error) {
    console.error('Error:', error);
  }
});