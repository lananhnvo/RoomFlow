document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hotelChain').addEventListener('change', updateAreas);
    document.getElementById('Category').addEventListener('change', updatePriceRanges);
    document.getElementById('checkAvailability').addEventListener('click', filterRooms);
    document.getElementById('hotelChain').addEventListener('change', function() {
        var areas = {
            'any' : ['Lanxia', 'Dreamscape Delta', 'Mystic Mountain', 'Enchantment Valley', 'Elysium Estate','Tower of Hope', 'Eternal Gardens', 'Monument of Peace', 'Liberty Square','Archive of Ages', 'Palace of Peace', 'Garden of Harmony', 'Fortress of Fortitude','Palace of Peace', 'Fortress of Fortitude', 'Temple of Tranquility', 'Garden of Harmony','Realm of Bliss', 'District of Delight', 'Sector of Serenity', 'Province of Pleasure'],
            'Celestia': ['Lanxia', 'Dreamscape Delta', 'Mystic Mountain', 'Enchantment Valley', 'Elysium Estate'],
            'Emporia': ['Tower of Hope', 'Eternal Gardens', 'Monument of Peace', 'Liberty Square'],
            'Jade Empire': ['Archive of Ages', 'Palace of Peace', 'Garden of Harmony', 'Fortress of Fortitude'],
            'Lotus Luxe': ['Palace of Peace', 'Fortress of Fortitude', 'Temple of Tranquility', 'Garden of Harmony'],
            'Mystica': ['Realm of Bliss', 'District of Delight', 'Sector of Serenity', 'Province of Pleasure']
        };        

        var selectedChain = this.value;
        var areaSelect = document.getElementById('area');
        areaSelect.innerHTML = '<option value="any">Any</option>'; 

        if (areas[selectedChain]) {
            areas[selectedChain].forEach(function(area) {
                var option = new Option(area, area);
                areaSelect.add(option);
            });
        }
        const urlParams = new URLSearchParams(window.location.search);
        const { roomId } = getQueryParams();
        if (roomId) {
            fetchRoomDetails(roomId);
        }
    });
});

document.getElementById('Category').addEventListener('change', function() { // Removed the extra space in 'Category '
    var priceRange = {
        'any': ['$50 - $250', '$250 - $500', '$500 - $1000'],
        'Luxury': ['$500 - $1000'],
        'Mid-range': ['$250 - $500'],
        'Economy': ['$50 - $250'],
    };

    var selectedCategory = this.value;
    var priceRangesSelect = document.getElementById('priceRanges');
    priceRangesSelect.innerHTML = '<option value="any">Any</option>';

    if (priceRange[selectedCategory]) { // Corrected the variable name to 'priceRange'
        priceRange[selectedCategory].forEach(function(price) {
            var option = new Option(price, price);
            priceRangesSelect.add(option);
        });
    }
});

// Mock data representing rooms. Replace with actual data retrieval method.
const rooms = [
    { hotel_id: 94, room_id: 953, hotelChain: 'Mystica', hotelName: 'Celestial Harmony', price: '295.72', area: 'Sector of Serenity', capacity: 'triple', extendable: 'True', problem: 'False', tv: 'True', fridge: 'False', ac: 'False' },
    { hotel_id: 37, room_id: 2, hotelChain: 'Celestia', hotelName: 'Grand Inn', price: '735.77', area: 'Lanxia', capacity: 'double', extendable: 'False', problem: 'False', tv: 'False', fridge: 'False', ac: 'False' },
    { hotel_id: 47, room_id: 288, hotelChain: 'Emporia', hotelName: 'Grand Plaza', price: '197.97', area: 'Eternal Gardens', capacity: 'double', extendable: 'False', problem: 'True', tv: 'False', fridge: 'False', ac: 'True' }, 
    // Add more room objects with various attributes for demonstration
];


// Functions

function updateAreas() {
    var areasByChain = {
        'any': ['Lanxia', 'Dreamscape Delta', 'Mystic Mountain', 'Enchantment Valley', 'Elysium Estate', 'Tower of Hope', 'Eternal Gardens', 'Monument of Peace', 'Liberty Square', 'Archive of Ages', 'Palace of Peace', 'Garden of Harmony', 'Fortress of Fortitude', 'Temple of Tranquility', 'Garden of Harmony', 'Realm of Bliss', 'District of Delight', 'Sector of Serenity', 'Province of Pleasure'],
        'Celestia': ['Lanxia', 'Dreamscape Delta', 'Mystic Mountain', 'Enchantment Valley', 'Elysium Estate'],
        'Emporia': ['Tower of Hope', 'Eternal Gardens', 'Monument of Peace', 'Liberty Square'],
        'Jade Empire': ['Archive of Ages', 'Palace of Peace', 'Garden of Harmony', 'Fortress of Fortitude'],
        'Lotus Luxe': ['Palace of Peace', 'Fortress of Fortitude', 'Temple of Tranquility', 'Garden of Harmony'],
        'Mystica': ['Realm of Bliss', 'District of Delight', 'Sector of Serenity', 'Province of Pleasure']
    };

    var hotelChainOption = document.getElementById('hotelChain').selectedOptions[0].textContent;
    var hotelChainName = hotelChainOption.split(' (')[0].trim(); // Get the hotel chain name without room count
    var areaSelect = document.getElementById('area');
    areaSelect.innerHTML = ''; // Clear current options

    console.log('Hotel Chain Selected:', hotelChainName); // Debug log

    if (areasByChain.hasOwnProperty(hotelChainName)) {
        areasByChain[hotelChainName].forEach(function(area) {
            areaSelect.add(new Option(area, area));
        });
    } else {
        console.error('Selected hotel chain is not defined in areas:', hotelChainName);
    }
}


function updatePriceRanges() {
    var selectedCategory = document.getElementById('Category').value;
    var priceRangesSelect = document.getElementById('priceRanges');
    
    // Clear current options in the price ranges dropdown
    priceRangesSelect.innerHTML = '';

    // Handling based on the selected category
    if (selectedCategory === 'Mid-range') {
        // If "Mid-range" is selected, only add "$250 - $500"
        var option = new Option('$250 - $500', '$250 - $500');
        priceRangesSelect.add(option);
    } else if (selectedCategory === 'any') {
        // If "Any" is selected, reset to showing only "Any" option
        var anyOption = new Option('Any', 'any');
        priceRangesSelect.add(anyOption);
    } else {
        // For other categories, you can adjust this part as needed based on your requirements
        // This is an example, assuming you want to repopulate with specific options for each category
        var priceRangesByCategory = {
            'Luxury': ['$500 - $1000'],
            'Economy': ['$50 - $250']
        };
        
        // Check if the selected category has specific price ranges defined
        var ranges = priceRangesByCategory[selectedCategory];
        if (ranges) {
            // Add each specific price range option for the selected category
            ranges.forEach(function(price) {
                var option = new Option(price, price);
                priceRangesSelect.add(option);
            });
        } else {
            // If no specific ranges are defined for the category, default to "Any"
            var anyOption = new Option('Any', 'any');
            priceRangesSelect.add(anyOption);
        }
    }
}

// Ensure this function is called when the category changes
document.getElementById('Category').addEventListener('change', updatePriceRanges);


function filterRooms(event) {
    event.preventDefault(); // Prevent the form from submitting which causes a page reload.
    // Get the selected values
    var hotelChainSelectedOption = document.getElementById('hotelChain').selectedOptions[0].value;
    var areaSelectedOption = document.getElementById('area').value;
    var priceRangeSelectedOption = document.getElementById('priceRanges').value;
    var capacitySelectedOption = document.getElementById('roomCapacity').value;

    // For price, convert 'any' to a range that includes all possible prices
    var priceBounds = priceRangeSelectedOption === 'any' ? [0, Infinity] : priceRangeSelectedOption.split('-').map(function(price) {
        // Remove the dollar sign and trim whitespace
        return parseFloat(price.replace('$', '').trim());
    });

    // Filter rooms based on the selected values, or show all if 'any' is selected
    var filteredRooms = rooms.filter(function(room) {
        // Convert room price to number for comparison
        var roomPrice = parseFloat(room.price.replace('$', ''));
        return (hotelChainSelectedOption === 'any' || room.hotelChain === hotelChainSelectedOption) &&
               (areaSelectedOption === 'any' || room.area === areaSelectedOption) &&
               (capacitySelectedOption === 'any' || room.capacity === capacitySelectedOption) &&
               (priceRangeSelectedOption === 'any' || (roomPrice >= priceBounds[0] && roomPrice <= priceBounds[1])) &&
               room.problem !== 'True'; // Check if the room has no problem
    });
    // Now display the filtered rooms
    displayFilteredRooms(filteredRooms);
}


// Function to dynamically display filtered rooms on the webpage
function displayFilteredRooms(filteredRooms) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clearing previous results

    filteredRooms.forEach(room => {
        // Creating and appending new elements for each room
        const roomElement = document.createElement('div');
        roomElement.className = 'room';
        roomElement.innerHTML = `
             <div class="room-details">
                <h3>${room.hotelName} (${room.hotelChain})</h3>
                <p>Price: $${room.price}</p>
                <p>Area: ${room.area}</p>
                <p>Capacity: ${room.capacity}</p>
                <p>Extendable: ${room.extendable === 'True' ? 'Yes' : 'No'}</p>
                <p>TV: ${room.tv === 'True' ? 'Yes' : 'No'}</p>
                <p>Fridge: ${room.fridge === 'True' ? 'Yes' : 'No'}</p>
                <p>AC: ${room.ac === 'True' ? 'Yes' : 'No'}</p>
            </div>
            <div class="book-now">
                <button onclick="bookRoom('${room.room_id}')">Book Now</button>
            </div>
        `;
        resultsContainer.appendChild(roomElement);
    });
}

// Function to extract query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        roomId: params.get('roomId') // Assuming 'roomId' is the query parameter
    };
}

// Function to simulate fetching room details based on the roomId
// This is a placeholder function. You should replace it with actual data fetching logic.
function fetchRoomDetails(roomId) {
    // Placeholder: Fetch room details based on roomId
    // Simulating room details fetch with a static object
    const roomDetails = rooms.find(room => room.room_id.toString() === roomId);
    if (roomDetails) {
        // Populate the form or display the details on the page
        document.getElementById('hotelName').textContent = roomDetails.hotelName;
        document.getElementById('roomPrice').textContent = `$${roomDetails.price}`;
        document.getElementById('roomArea').textContent = roomDetails.area;
        // Add more fields as necessary
    } else {
        console.error('Room details not found for ID:', roomId);
    }
}


// Function to handle booking redirection
window.bookRoom = function(roomId) {
    console.log(roomId); // Add this to check the roomId value
    window.location.href = `reservation.html?roomId=${roomId}`;
};




