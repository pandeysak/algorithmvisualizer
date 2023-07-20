let isSearching = false;
let searchSteps = [];
let canvas, ctx, width, height, barWidth, max, target;

function visualizeLinearSearch() {
  if (isSearching) {
    return;
  }

  const arrayInput = document.getElementById('array-input').value.trim();
  const searchElement = document.getElementById('search-element').value.trim();

  const array = arrayInput.split(',').map(Number);
  if (isNaN(searchElement) || array.some(isNaN)) {
    alert('Please enter valid numbers for array elements and the search element.');
    return;
  }

  isSearching = true;
  document.getElementById('visualize-button').disabled = true;
  document.getElementById('results').style.display = 'none';

  searchSteps = [];
  target = Number(searchElement);
  linearSearch(array);

  setupCanvas();
  animateSearchSteps();
}

function linearSearch(array) {
  for (let i = 0; i < array.length; i++) {
    searchSteps.push({ array: array.slice(), currentIndex: i });

    if (array[i] === target) {
      isSearching = false;
      document.getElementById('visualize-button').disabled = false;
      displayResults('Element found at index ' + i);
      return;
    }
  }

  isSearching = false;
  document.getElementById('visualize-button').disabled = false;
  displayResults('Element not found in the array');
}

function setupCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  barWidth = 40;
  max = Math.max(...searchSteps[0].array);
}

function animateSearchSteps() {
  const step = searchSteps.shift();

  if (!step) {
    return;
  }

  const { array, currentIndex } = step;
  const barHeightUnit = height / max;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    const x = (i * (barWidth + 10)) + 50;
    const y = height - barHeight;

    ctx.fillStyle = 'blue';
    if (i === currentIndex) {
      ctx.fillStyle = 'green';
    }
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(array[i], x + barWidth / 2, y - 5);
  }

  setTimeout(animateSearchSteps, 1000); // Add a delay to show each step clearly
}

function displayResults(message) {
  const resultsDiv = document.getElementById('results');
  const resultMessageParagraph = document.getElementById('result-message');

  resultMessageParagraph.textContent = message;

  resultsDiv.style.display = 'block';
}

function goBackToHomePage() {
  window.location.href = 'searching.html';
}

// Automatically scroll down to the visualization section on "Visualize" button click
document.getElementById('visualize-button').addEventListener('click', () => {
  const visualizationSection = document.getElementById('visualization');
  visualizationSection.scrollIntoView({ behavior: 'smooth' });
});
