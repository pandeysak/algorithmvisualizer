let isSorting = false;
let sortSteps = [];
let canvas, ctx, width, height, barWidth, max;

function visualizeQuickSort() {
  if (isSorting) {
    return;
  }

  const arrayInput = document.getElementById('array-input').value.trim();
  const array = arrayInput.split(',').map(Number);
  if (array.some(isNaN)) {
    alert('Please enter valid numbers for array elements.');
    return;
  }

  isSorting = true;
  document.getElementById('visualize-button').disabled = true;

  sortSteps = [];
  quickSort(array, 0, array.length - 1);

  setupCanvas();
  animateSortSteps();
}

function quickSort(array, low, high) {
  if (low < high) {
    const pivotIndex = partition(array, low, high);
    quickSort(array, low, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, high);
  }
}

function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    sortSteps.push({ array: array.slice(), low, high, pivotIndex: i + 1, currentIndex: j });

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      sortSteps.push({ array: array.slice(), low, high, pivotIndex: i + 1, currentIndex: j });
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  sortSteps.push({ array: array.slice(), low, high, pivotIndex: i + 1, currentIndex: high });

  return i + 1;
}

function setupCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  barWidth = 40;
  max = Math.max(...sortSteps[0].array);
}

function animateSortSteps() {
  const step = sortSteps.shift();

  if (!step) {
    isSorting = false;
    document.getElementById('visualize-button').disabled = false;
    return;
  }

  const { array, low, high, pivotIndex, currentIndex } = step;
  const barHeightUnit = height / max;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    const x = (i * (barWidth + 10)) + 50;
    const y = height - barHeight;

    ctx.fillStyle = 'blue';
    if (currentIndex === i) {
      ctx.fillStyle = 'green';
    } else if (i === pivotIndex) {
      ctx.fillStyle = 'red';
    } else if (i >= low && i <= high) {
      ctx.fillStyle = 'yellow';
    }
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(array[i], x + barWidth / 2, y - 5);
  }

  setTimeout(animateSortSteps, 1000); // Add a delay to show each step clearly
}

function goBackToHomePage() {
  window.location.href = 'sorting.html';
}

// Automatically scroll down to the visualization section on "Visualize" button click
document.getElementById('visualize-button').addEventListener('click', () => {
  const visualizationSection = document.getElementById('visualization');
  visualizationSection.scrollIntoView({ behavior: 'smooth' });
});
