let isSearching = false;
let searchSteps = [];
let canvas, ctx, width, height, barWidth, max, target;

function sortArray() {
  const arrayInput = document.getElementById('array-input').value.trim();
  const sortedArray = arrayInput.split(',').map(Number).sort((a, b) => a - b);
  document.getElementById('array-input').value = sortedArray.join(',');
}

function visualizeBinarySearch() {
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

  if (!isSorted(array)) {
    alert('Please make sure the array is sorted before visualizing binary search.');
    return;
  }

  isSearching = true;
  document.getElementById('visualize-button').disabled = true;
  document.getElementById('results').style.display = 'none';

  searchSteps = [];
  target = Number(searchElement);
  binarySearch(array, 0, array.length - 1);

  setupCanvas();
  animateSearchSteps();
}

function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

function binarySearch(array, left, right) {
  if (left <= right) {
    const mid = Math.floor((left + right) / 2);
    searchSteps.push({ array: array.slice(), left, right, mid });

    if (array[mid] === target) {
      isSearching = false;
      document.getElementById('visualize-button').disabled = false;
      displayResults('Element found at index ' + mid);
      return;
    } else if (array[mid] < target) {
      return binarySearch(array, mid + 1, right);
    } else {
      return binarySearch(array, left, mid - 1);
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

  const { array, left, right, mid } = step;
  const barHeightUnit = height / max;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    const x = (i * (barWidth + 10)) + 50;
    const y = height - barHeight;

    ctx.fillStyle = 'blue';
    if (i === mid) {
      ctx.fillStyle = 'green';
    } else if (i >= left && i <= right) {
      ctx.fillStyle = 'orange';
    }
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(array[i], x + barWidth / 2, y - 5);
  }

  setTimeout(animateSearchSteps, 1000);
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
