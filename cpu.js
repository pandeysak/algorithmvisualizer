// Function to visualize the algorithm based on the provided data
async function visualizeAlgorithm(...args) {
    // Clear previous visualization
    document.getElementById('visualizationContainer').innerHTML = '';
  
    // Create visualization elements based on the provided data
    args.forEach(data => {
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${data * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
    });
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
    function cpu()
    {
        document.getElementById('algorithmName').textContent = 'CPU scheduling Algorithm Visualizer';
    document.getElementById('algorithmDescription').textContent = 'CPU Scheduling Algorithms are essential components of operating systems that manage the execution of multiple processes on a single CPU. The main goal of these algorithms is to efficiently allocate CPU time to various processes to maximize system throughput, minimize response time, and ensure fair process execution. Different scheduling algorithms employ distinct strategies to prioritize and allocate CPU time to processes based on their characteristics and system requirements.';
    }
  // CPU Scheduling Algorithms
  function visualizeFCFS() {
    // Update algorithm name and description
    document.getElementById('algorithmName').textContent = 'First-Come, First-Served (FCFS)';
    document.getElementById('algorithmDescription').textContent = 'FCFS is the simplest CPU scheduling algorithm, where processes are executed in the order they arrive in the ready queue. The first process to arrive is the first to get the CPU. However, FCFS can result in poor average waiting times, especially for long-running processes.';
  
    // Sample data for visualization
    const processBurstTimes = [4, 6, 2, 8];
    visualizeFCFSAlgorithm(processBurstTimes);
  }
  
  async function visualizeFCFSAlgorithm(processBurstTimes) {
    // Create visualization elements based on the provided data
    for (const burstTime of processBurstTimes) {
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${burstTime * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
  
  function visualizeSJF() {
    // Update algorithm name and description
    document.getElementById('algorithmName').textContent = 'Shortest Job First (SJF)';
    document.getElementById('algorithmDescription').textContent = 'SJF is a non-preemptive CPU scheduling algorithm that selects the process with the smallest burst time to execute next.';
  
    // Sample data for visualization
    const processBurstTimes = [3, 1, 7, 2, 5];
    visualizeSJFAlgorithm(processBurstTimes);
  }
  
  async function visualizeSJFAlgorithm(processBurstTimes) {
    // Sort the process burst times in ascending order (shortest job first)
    processBurstTimes.sort((a, b) => a - b);
  
    // Create visualization elements based on the sorted burst times
    for (const burstTime of processBurstTimes) {
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${burstTime * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
  
  function visualizeRR() {
    // Update algorithm name and description
    document.getElementById('algorithmName').textContent = 'Round Robin (RR)';
    document.getElementById('algorithmDescription').textContent = 'Round Robin is a preemptive CPU scheduling algorithm that assigns fixed time slots (time quantum) to each process in the system.';
  
    // Sample data for visualization
    const processBurstTimes = [5, 4, 2, 7];
    const timeQuantum = 2;
    visualizeRRAlgorithm(processBurstTimes, timeQuantum);
  }
  
  async function visualizeRRAlgorithm(processBurstTimes, timeQuantum) {
    while (processBurstTimes.length > 0) {
      const burstTime = processBurstTimes.shift();
      const remainingBurstTime = Math.max(burstTime - timeQuantum, 0);
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${Math.min(burstTime, timeQuantum) * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      if (remainingBurstTime > 0) {
        processBurstTimes.push(remainingBurstTime);
      }
    }
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
  
  function visualizePriority() {
    // Update algorithm name and description
    document.getElementById('algorithmName').textContent = 'Priority Scheduling';
    document.getElementById('algorithmDescription').textContent = 'Priority Scheduling is a non-preemptive CPU scheduling algorithm that assigns priority values to processes.';
  
    // Sample data for visualization
    const processBurstTimes = [6, 3, 8, 2];
    const processPriorities = [2, 1, 4, 3];
    visualizePriorityAlgorithm(processBurstTimes, processPriorities);
  }
  
  async function visualizePriorityAlgorithm(processBurstTimes, processPriorities) {
    // Sort the processes based on priority (higher priority first)
    const sortedProcesses = processBurstTimes.map((burstTime, index) => ({
      burstTime,
      priority: processPriorities[index],
    })).sort((a, b) => b.priority - a.priority);
  
    // Create visualization elements based on the sorted priorities
    for (const process of sortedProcesses) {
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${process.burstTime * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
  
  function visualizeSJFPreemptive() {
    // Update algorithm name and description
    document.getElementById('algorithmName').textContent = 'Shortest Job First (SJF) - Preemptive';
    document.getElementById('algorithmDescription').textContent = 'SJF Preemptive is a preemptive CPU scheduling algorithm that selects the process with the smallest remaining burst time to execute next.';
  
    // Sample data for visualization
    const processBurstTimes = [5, 2, 8, 3];
    visualizeSJFPreemptiveAlgorithm(processBurstTimes);
  }
  
  async function visualizeSJFPreemptiveAlgorithm(processBurstTimes) {
    // Create visualization elements based on the provided data
    while (processBurstTimes.length > 0) {
      const shortestIndex = processBurstTimes.findIndex(burstTime => burstTime === Math.min(...processBurstTimes));
      const shortestBurstTime = processBurstTimes[shortestIndex];
      processBurstTimes[shortestIndex] = 0;
      
      const element = document.createElement('div');
      element.classList.add('bar');
      element.style.height = `${shortestBurstTime * 10}px`; // Modify height scale as needed
      document.getElementById('visualizationContainer').appendChild(element);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Add a delay before clearing the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById('visualizationContainer').innerHTML = '';
  }
  // Automatically scroll down to the visualization section on "Visualize" button click
document.getElementById('button').addEventListener('click', () => {
    const visualizationSection = document.getElementById('visualization');
    visualizationSection.scrollIntoView({ behavior: 'smooth' });
  });
  
  