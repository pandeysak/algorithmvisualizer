function visualizeLinearSearch() {
    // Get input array and search element
    const arrayInput = document.getElementById("arrayInput").value;
    const array = arrayInput.split(",").map(element => parseInt(element.trim(), 10));

    // Store the input array in sessionStorage to use it in the linear_search.html
    sessionStorage.setItem("array", JSON.stringify(array));

    // Navigate to linear_search.html
    window.location.href = "linear.html";
}

function visualizeBinarySearch() {
    // Get input array and search element
    const arrayInput = document.getElementById("arrayInput").value;
    const array = arrayInput.split(",").map(element => parseInt(element.trim(), 10));

    // Check if array is sorted
    const isSorted = array.every((element, index) => index === 0 || element >= array[index - 1]);

    if (isSorted) {
        // Store the input array in sessionStorage to use it in the binary_search.html
        sessionStorage.setItem("array", JSON.stringify(array));
        // Navigate to binary_search.html
        window.location.href = "binary.html";
    } else {
        
        alert("Array is not sorted. Please sort the array first before performing Binary Search.");
    }
}
