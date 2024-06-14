// index.js

// Initialize the counts, trying to retrieve saved counts from localStorage
let counts = {
    cars: parseInt(localStorage.getItem('count-cars')) || 0,
    buses: parseInt(localStorage.getItem('count-buses')) || 0,
    motorcycles: parseInt(localStorage.getItem('count-motorcycles')) || 0,
    trucks: parseInt(localStorage.getItem('count-trucks')) || 0
};

// Function to update the display for all counters
function updateDisplay() {
    document.getElementById('count-cars').textContent = counts.cars;
    document.getElementById('count-buses').textContent = counts.buses;
    document.getElementById('count-motorcycles').textContent = counts.motorcycles;
    document.getElementById('count-trucks').textContent = counts.trucks;
}

// Call the function to update the display on page load
updateDisplay();

// Function to increment the count
function increment(type) {
    // Increment the specific count
    counts[type]++;
    
    // Log the new count
    console.log(type + ": " + counts[type]);

    // Save the new count to localStorage
    localStorage.setItem('count-' + type, counts[type]);

    // Change the count-el in the HTML to reflect the new count
    document.getElementById('count-' + type).textContent = counts[type];
}

function deleteAllCounts() {
    // Reset all counts
    counts.cars = 0;
    counts.buses = 0;
    counts.motorcycles = 0;
    counts.trucks = 0;

    // Remove all counts from localStorage
    localStorage.removeItem('count-cars');
    localStorage.removeItem('count-buses');
    localStorage.removeItem('count-motorcycles');
    localStorage.removeItem('count-trucks');

    // Update the display
    updateDisplay();
}
// Function to download the counts as an Excel file
function downloadCount() {
    const data = [
        ["Type", "Count"],
        ["Cars", counts.cars],
        ["Buses", counts.buses],
        ["Motorcycles", counts.motorcycles],
        ["Trucks", counts.trucks]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Counts");

    XLSX.writeFile(wb, "counts.xlsx");
}
