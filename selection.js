let isSorting = false;
let sortSteps = [];
let canvas, ctx, width, height, barWidth, max;

function visualizeSelectionSort() {
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
  selectionSort(array);

  setupCanvas();
  animateSortSteps();
}

function selectionSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      sortSteps.push({ array: array.slice(), currentIndex: j, minIndex });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap elements
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  // Push the final sorted state to the steps to show it at the end
  sortSteps.push({ array: array.slice(), currentIndex: -1, minIndex: -1 });

  isSorting = false;
  document.getElementById('visualize-button').disabled = false;
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
    return;
  }

  const { array, currentIndex, minIndex } = step;
  const barHeightUnit = height / max;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    const x = (i * (barWidth + 10)) + 50;
    const y = height - barHeight;

    ctx.fillStyle = 'blue';
    if (i === currentIndex) {
      ctx.fillStyle = 'green';
    } else if (i === minIndex) {
      ctx.fillStyle = 'red';
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
