let isSorting = false;
let sortSteps = [];
let canvas, ctx, width, height, barWidth, max;

function visualizeMergeSort() {
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
  mergeSort(array, 0, array.length - 1);

  setupCanvas();
  animateSortSteps();
}

function mergeSort(array, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);

    merge(array, left, mid, right);
  }
}

function merge(array, left, mid, right) {
  const temp = [];

  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    sortSteps.push({ array: array.slice(), left, mid, right, currentIndex: [i, j] });

    if (array[i] < array[j]) {
      temp.push(array[i]);
      i++;
    } else {
      temp.push(array[j]);
      j++;
    }
  }

  while (i <= mid) {
    temp.push(array[i]);
    sortSteps.push({ array: array.slice(), left, mid, right, currentIndex: [i] });
    i++;
  }

  while (j <= right) {
    temp.push(array[j]);
    sortSteps.push({ array: array.slice(), left, mid, right, currentIndex: [j] });
    j++;
  }

  for (let k = left, m = 0; k <= right; k++, m++) {
    array[k] = temp[m];
    sortSteps.push({ array: array.slice(), left, mid, right, currentIndex: [k] });
  }
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

  const { array, left, mid, right, currentIndex } = step;
  const barHeightUnit = height / max;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    const x = (i * (barWidth + 10)) + 50;
    const y = height - barHeight;

    ctx.fillStyle = 'blue';
    if (currentIndex.includes(i)) {
      ctx.fillStyle = 'green';
    } else if (i >= left && i <= right) {
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
