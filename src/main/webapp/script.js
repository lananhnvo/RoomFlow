// Mock data representing rooms. Replace with actual data retrieval method.
const rooms = [
    { hotel_id: 94, room_id: 953, hotelChain: 'Mystica', hotelName: 'Celestial Harmony', price: '295.72', area: 'Sector of Serenity', capacity: 'triple', extendable: 'True', problem: 'False', tv: 'True', fridge: 'False', ac: 'False' },
    { hotel_id: 37, room_id: 2, hotelChain: 'Celestia', hotelName: 'Grand Inn', price: '735.77', area: 'Lanxia', capacity: 'double', extendable: 'False', problem: 'False', tv: 'False', fridge: 'False', ac: 'False' },
    { hotel_id: 47, room_id: 288, hotelChain: 'Emporia', hotelName: 'Grand Plaza', price: '197.97', area: 'Eternal Gardens', capacity: 'double', extendable: 'False', problem: 'True', tv: 'False', fridge: 'False', ac: 'True' }, 
    { hotel_id: 47, room_id: 288, hotelChain: 'Emporia', hotelName: 'Grand Plaza', price: '197.97', area: 'Eternal Gardens', capacity: 'double', extendable: 'False', problem: 'False', tv: 'False', fridge: 'False', ac: 'True' }, 
];

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded and DOM fully loaded.");
    
    displayReservationDetails();
    document.getElementById('editBooking').addEventListener('click', prepareEditForm);
    document.getElementById('deleteBooking').addEventListener('click', function() {
        const bookingId = document.getElementById('searchQuery').value;
        deleteBooking(bookingId);
    });
    document.getElementById('saveChangesButton').addEventListener('click', saveEditedBooking); 
});
    document.getElementById('hotelChain').addEventListener('change', updateAreas);
    document.getElementById('Category').addEventListener('change', updatePriceRanges);
    document.getElementById('checkAvailability').addEventListener('click', filterRooms);
    document.querySelector('form').addEventListener('submit', validateEmailAndSubmit);
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
        
    });


document.getElementById('Category').addEventListener('change', function() { 
    var priceRange = {
        'any': ['$50 - $250', '$250 - $500', '$500 - $1000'],
        'Luxury': ['$500 - $1000'],
        'Mid-range': ['$250 - $500'],
        'Economy': ['$50 - $250'],
    };

    var selectedCategory = this.value;
    var priceRangesSelect = document.getElementById('priceRanges');
    priceRangesSelect.innerHTML = '<option value="any">Any</option>';

    if (priceRange[selectedCategory]) { 
        priceRange[selectedCategory].forEach(function(price) {
            var option = new Option(price, price);
            priceRangesSelect.add(option);
        });
    }
});


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
    var hotelChainName = hotelChainOption.split(' (')[0].trim(); 
    var areaSelect = document.getElementById('area');
    areaSelect.innerHTML = ''; 

    console.log('Hotel Chain Selected:', hotelChainName); 

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
    
    priceRangesSelect.innerHTML = '';

    if (selectedCategory === 'Mid-range') {
        // If "Mid-range" is selected, only add "$250 - $500"
        var option = new Option('$250 - $500', '$250 - $500');
        priceRangesSelect.add(option);
    } else if (selectedCategory === 'any') {
        // If "Any" is selected, reset to showing only "Any" option
        var anyOption = new Option('Any', 'any');
        priceRangesSelect.add(anyOption);
    } else {
        var priceRangesByCategory = {
            'Luxury': ['$500 - $1000'],
            'Economy': ['$50 - $250']
        };
        
        var ranges = priceRangesByCategory[selectedCategory];
        if (ranges) {
            ranges.forEach(function(price) {
                var option = new Option(price, price);
                priceRangesSelect.add(option);
            });
        } else {
            var anyOption = new Option('Any', 'any');
            priceRangesSelect.add(anyOption);
        }
    }
}

document.getElementById('Category').addEventListener('change', updatePriceRanges);


function filterRooms(event) {
    event.preventDefault(); 
    var hotelChainSelectedOption = document.getElementById('hotelChain').selectedOptions[0].value;
    var areaSelectedOption = document.getElementById('area').value;
    var priceRangeSelectedOption = document.getElementById('priceRanges').value;
    var capacitySelectedOption = document.getElementById('roomCapacity').value;
    var priceBounds = priceRangeSelectedOption === 'any' ? [0, Infinity] : priceRangeSelectedOption.split('-').map(function(price) {

        return parseFloat(price.replace('$', '').trim());
    });

    var filteredRooms = rooms.filter(function(room) {

        var roomPrice = parseFloat(room.price.replace('$', ''));
        return (hotelChainSelectedOption === 'any' || room.hotelChain === hotelChainSelectedOption) &&
               (areaSelectedOption === 'any' || room.area === areaSelectedOption) &&
               (capacitySelectedOption === 'any' || room.capacity === capacitySelectedOption) &&
               (priceRangeSelectedOption === 'any' || (roomPrice >= priceBounds[0] && roomPrice <= priceBounds[1])) &&
               room.problem !== 'True'; 
    });
    displayFilteredRooms(filteredRooms);
}

function displayFilteredRooms(filteredRooms) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    filteredRooms.forEach(room => {
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
                <button type='button' onclick="bookRoom('${room.room_id}')">Book Now</button>
            </div>
        `;
        resultsContainer.appendChild(roomElement);
    });
}

function displayReservationDetails() {
    const queryParams = new URLSearchParams(window.location.search);
    const roomId = queryParams.get('roomId');
    const checkInDate = queryParams.get('checkIn');
    const checkOutDate = queryParams.get('checkOut');
    if (checkInDate) document.querySelector('input[name="check-in"]').value = checkInDate;
    if (checkOutDate) document.querySelector('input[name="check-out"]').value = checkOutDate;
    if (roomId) {
        const roomDetails = rooms.find(room => room.room_id.toString() === roomId);
        if (roomDetails) {
            document.getElementById('hotelName').textContent = roomDetails.hotelName || 'Not available';
            document.getElementById('roomPrice').textContent = `$${roomDetails.price}` || 'Not available';
            document.getElementById('roomArea').textContent = roomDetails.area || 'Not available';
            document.getElementById('hotelChain').textContent = roomDetails.hotelChain || 'Not available';
            document.getElementById('roomCapacity').textContent = roomDetails.capacity || 'Not available';
            document.getElementById('roomExtendable').textContent = roomDetails.extendable === 'True' ? 'Yes' : 'No';
            document.getElementById('roomTv').textContent = roomDetails.tv === 'True' ? 'Yes' : 'No';
            document.getElementById('roomFridge').textContent = roomDetails.fridge === 'True' ? 'Yes' : 'No';
            document.getElementById('roomAc').textContent = roomDetails.ac === 'True' ? 'Yes' : 'No';
            document.querySelector('input[name="check-in"]').value = checkInDate || '';
            document.querySelector('input[name="check-out"]').value = checkOutDate || '';
            document.getElementById('reservationForm').addEventListener('submit', handleReservationSubmit);
        } else {
            console.error('No details found for room ID:', roomId);
        }
    } else {
        console.error('No room ID specified in the URL.');
    }
}
function validateEmailAndSubmit(event) {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    if (!validateEmail(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function handleReservationSubmit(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    const bookingId = generateBookingId();
    saveReservationDetails(bookingId, email);
    alert(`Your booking has been confirmed. Your Booking ID is: ${bookingId}. Please keep this ID for future reference. We have also sent a copy to your email! Thank you! - RoomFlow`);
    
}
function saveReservationDetails(bookingId, email) {
    const reservationDetails = { email, bookingId };
    localStorage.setItem(`booking_${bookingId}`, JSON.stringify(reservationDetails));
}

function generateBookingId() {
    const timestamp = Date.now().toString();
    const randomComponent = Math.floor(Math.random() * 1000).toString();
    return `BID-${timestamp}-${randomComponent}`;
}

function searchBooking() {
    const bookingId = document.getElementById('searchQuery').value;
    const bookingDetails = localStorage.getItem(`booking_${bookingId}`);
    const detailsContainer = document.getElementById('bookingDetails');

    if (bookingDetails) {
        const details = JSON.parse(bookingDetails);
        detailsContainer.innerHTML = `
            <p>Email: ${details.email}</p>
            <p>Booking ID: ${details.bookingId}</p>
            // Add more details as needed
        `;
        document.getElementById('editBooking').style.display = 'inline';
        document.getElementById('deleteBooking').style.display = 'inline';
    } else {
        detailsContainer.innerHTML = `<p>No booking found with ID ${bookingId}.</p>`;
        document.getElementById('editBooking').style.display = 'none';
        document.getElementById('deleteBooking').style.display = 'none';
    }
}

function editBooking(bookingId) {
    alert("Edit functionality for booking ID " + bookingId + " is not implemented in this demo.");
}

function deleteBooking(bookingId) {
    if (confirm(`Are you sure you want to delete booking ID ${bookingId}?`)) {
        localStorage.removeItem(`booking_${bookingId}`);
        document.getElementById('bookingDetails').innerHTML = `<p>Booking ID ${bookingId} has been deleted.</p>`;
        document.getElementById('editBooking').style.display = 'none';
        document.getElementById('deleteBooking').style.display = 'none';
    }
}

function prepareEditForm() {
    const bookingId = document.getElementById('searchQuery').value;
    const bookingDetails = JSON.parse(localStorage.getItem(`booking_${bookingId}`));

    if (bookingDetails) {
        document.getElementById('editEmail').value = bookingDetails.email;
        document.getElementById('editBookingId').value = bookingDetails.bookingId;
        document.getElementById('editBookingForm').style.display = 'block';
    } else {
        alert('No booking found to edit.');
    }
}

function saveEditedBooking() {
    const bookingId = document.getElementById('editBookingId').value;
    const editedEmail = document.getElementById('editEmail').value;
    const updatedBookingDetails = {
        bookingId: bookingId,
        email: editedEmail,
    };
// Mock data representing rooms. Replace with actual data retrieval method.
    const rooms = [
        { hotel_id: 94, room_id: 953, hotelChain: 'Mystica', hotelName: 'Celestial Harmony', price: '295.72', area: 'Sector of Serenity', capacity: 'triple', extendable: 'True', problem: 'False', tv: 'True', fridge: 'False', ac: 'False' },
        { hotel_id: 37, room_id: 2, hotelChain: 'Celestia', hotelName: 'Grand Inn', price: '735.77', area: 'Lanxia', capacity: 'double', extendable: 'False', problem: 'False', tv: 'False', fridge: 'False', ac: 'False' },
        { hotel_id: 47, room_id: 288, hotelChain: 'Emporia', hotelName: 'Grand Plaza', price: '197.97', area: 'Eternal Gardens', capacity: 'double', extendable: 'False', problem: 'True', tv: 'False', fridge: 'False', ac: 'True' },
        { hotel_id: 47, room_id: 288, hotelChain: 'Emporia', hotelName: 'Grand Plaza', price: '197.97', area: 'Eternal Gardens', capacity: 'double', extendable: 'False', problem: 'False', tv: 'False', fridge: 'False', ac: 'True' },
    ];

    document.addEventListener('DOMContentLoaded', function() {
        console.log("Script loaded and DOM fully loaded.");

        displayReservationDetails();
        document.getElementById('editBooking').addEventListener('click', prepareEditForm);
        document.getElementById('deleteBooking').addEventListener('click', function() {
            const bookingId = document.getElementById('searchQuery').value;
            deleteBooking(bookingId);
        });
        document.getElementById('saveChangesButton').addEventListener('click', saveEditedBooking);
    });
    document.getElementById('hotelChain').addEventListener('change', updateAreas);
    document.getElementById('Category').addEventListener('change', updatePriceRanges);
    document.getElementById('checkAvailability').addEventListener('click', filterRooms);
    document.querySelector('form').addEventListener('submit', validateEmailAndSubmit);
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

    });


    document.getElementById('Category').addEventListener('change', function() {
        var priceRange = {
            'any': ['$50 - $250', '$250 - $500', '$500 - $1000'],
            'Luxury': ['$500 - $1000'],
            'Mid-range': ['$250 - $500'],
            'Economy': ['$50 - $250'],
        };

        var selectedCategory = this.value;
        var priceRangesSelect = document.getElementById('priceRanges');
        priceRangesSelect.innerHTML = '<option value="any">Any</option>';

        if (priceRange[selectedCategory]) {
            priceRange[selectedCategory].forEach(function(price) {
                var option = new Option(price, price);
                priceRangesSelect.add(option);
            });
        }
    });


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
        var hotelChainName = hotelChainOption.split(' (')[0].trim();
        var areaSelect = document.getElementById('area');
        areaSelect.innerHTML = '';

        console.log('Hotel Chain Selected:', hotelChainName);

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

        priceRangesSelect.innerHTML = '';

        if (selectedCategory === 'Mid-range') {
            // If "Mid-range" is selected, only add "$250 - $500"
            var option = new Option('$250 - $500', '$250 - $500');
            priceRangesSelect.add(option);
        } else if (selectedCategory === 'any') {
            // If "Any" is selected, reset to showing only "Any" option
            var anyOption = new Option('Any', 'any');
            priceRangesSelect.add(anyOption);
        } else {
            var priceRangesByCategory = {
                'Luxury': ['$500 - $1000'],
                'Economy': ['$50 - $250']
            };

            var ranges = priceRangesByCategory[selectedCategory];
            if (ranges) {
                ranges.forEach(function(price) {
                    var option = new Option(price, price);
                    priceRangesSelect.add(option);
                });
            } else {
                var anyOption = new Option('Any', 'any');
                priceRangesSelect.add(anyOption);
            }
        }
    }

    document.getElementById('Category').addEventListener('change', updatePriceRanges);


    function filterRooms(event) {
        event.preventDefault();
        var hotelChainSelectedOption = document.getElementById('hotelChain').selectedOptions[0].value;
        var areaSelectedOption = document.getElementById('area').value;
        var priceRangeSelectedOption = document.getElementById('priceRanges').value;
        var capacitySelectedOption = document.getElementById('roomCapacity').value;
        var priceBounds = priceRangeSelectedOption === 'any' ? [0, Infinity] : priceRangeSelectedOption.split('-').map(function(price) {

            return parseFloat(price.replace('$', '').trim());
        });

        var filteredRooms = rooms.filter(function(room) {

            var roomPrice = parseFloat(room.price.replace('$', ''));
            return (hotelChainSelectedOption === 'any' || room.hotelChain === hotelChainSelectedOption) &&
                (areaSelectedOption === 'any' || room.area === areaSelectedOption) &&
                (capacitySelectedOption === 'any' || room.capacity === capacitySelectedOption) &&
                (priceRangeSelectedOption === 'any' || (roomPrice >= priceBounds[0] && roomPrice <= priceBounds[1])) &&
                room.problem !== 'True';
        });
        displayFilteredRooms(filteredRooms);
    }

    function displayFilteredRooms(filteredRooms) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        filteredRooms.forEach(room => {
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
                <button type='button' onclick="bookRoom('${room.room_id}')">Book Now</button>
            </div>
        `;
            resultsContainer.appendChild(roomElement);
        });
    }

    function displayReservationDetails() {
        const queryParams = new URLSearchParams(window.location.search);
        const roomId = queryParams.get('roomId');
        const checkInDate = queryParams.get('checkIn');
        const checkOutDate = queryParams.get('checkOut');
        if (checkInDate) document.querySelector('input[name="check-in"]').value = checkInDate;
        if (checkOutDate) document.querySelector('input[name="check-out"]').value = checkOutDate;
        if (roomId) {
            const roomDetails = rooms.find(room => room.room_id.toString() === roomId);
            if (roomDetails) {
                document.getElementById('hotelName').textContent = roomDetails.hotelName || 'Not available';
                document.getElementById('roomPrice').textContent = `$${roomDetails.price}` || 'Not available';
                document.getElementById('roomArea').textContent = roomDetails.area || 'Not available';
                document.getElementById('hotelChain').textContent = roomDetails.hotelChain || 'Not available';
                document.getElementById('roomCapacity').textContent = roomDetails.capacity || 'Not available';
                document.getElementById('roomExtendable').textContent = roomDetails.extendable === 'True' ? 'Yes' : 'No';
                document.getElementById('roomTv').textContent = roomDetails.tv === 'True' ? 'Yes' : 'No';
                document.getElementById('roomFridge').textContent = roomDetails.fridge === 'True' ? 'Yes' : 'No';
                document.getElementById('roomAc').textContent = roomDetails.ac === 'True' ? 'Yes' : 'No';
                document.querySelector('input[name="check-in"]').value = checkInDate || '';
                document.querySelector('input[name="check-out"]').value = checkOutDate || '';
                document.getElementById('reservationForm').addEventListener('submit', handleReservationSubmit);
            } else {
                console.error('No details found for room ID:', roomId);
            }
        } else {
            console.error('No room ID specified in the URL.');
        }
    }
    function validateEmailAndSubmit(event) {
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;
        if (!validateEmail(email)) {
            event.preventDefault();
            alert('Please enter a valid email address.');
        }
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleReservationSubmit(event) {
        event.preventDefault();

        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const bookingId = generateBookingId();
        saveReservationDetails(bookingId, email);
        alert(`Your booking has been confirmed. Your Booking ID is: ${bookingId}. Please keep this ID for future reference. We have also sent a copy to your email! Thank you! - RoomFlow`);

    }
    function saveReservationDetails(bookingId, email) {
        const reservationDetails = { email, bookingId };
        localStorage.setItem(`booking_${bookingId}`, JSON.stringify(reservationDetails));
    }

    function generateBookingId() {
        const timestamp = Date.now().toString();
        const randomComponent = Math.floor(Math.random() * 1000).toString();
        return `BID-${timestamp}-${randomComponent}`;
    }

    function searchBooking() {
        const bookingId = document.getElementById('searchQuery').value;
        const bookingDetails = localStorage.getItem(`booking_${bookingId}`);
        const detailsContainer = document.getElementById('bookingDetails');

        if (bookingDetails) {
            const details = JSON.parse(bookingDetails);
            detailsContainer.innerHTML = `
            <p>Email: ${details.email}</p>
            <p>Booking ID: ${details.bookingId}</p>
            // Add more details as needed
        `;
            document.getElementById('editBooking').style.display = 'inline';
            document.getElementById('deleteBooking').style.display = 'inline';
        } else {
            detailsContainer.innerHTML = `<p>No booking found with ID ${bookingId}.</p>`;
            document.getElementById('editBooking').style.display = 'none';
            document.getElementById('deleteBooking').style.display = 'none';
        }
    }

    function editBooking(bookingId) {
        alert("Edit functionality for booking ID " + bookingId + " is not implemented in this demo.");
    }

    function deleteBooking(bookingId) {
        if (confirm(`Are you sure you want to delete booking ID ${bookingId}?`)) {
            localStorage.removeItem(`booking_${bookingId}`);
            document.getElementById('bookingDetails').innerHTML = `<p>Booking ID ${bookingId} has been deleted.</p>`;
            document.getElementById('editBooking').style.display = 'none';
            document.getElementById('deleteBooking').style.display = 'none';
        }
    }

    function prepareEditForm() {
        const bookingId = document.getElementById('searchQuery').value;
        const bookingDetails = JSON.parse(localStorage.getItem(`booking_${bookingId}`));

        if (bookingDetails) {
            document.getElementById('editEmail').value = bookingDetails.email;
            document.getElementById('editBookingId').value = bookingDetails.bookingId;
            document.getElementById('editBookingForm').style.display = 'block';
        } else {
            alert('No booking found to edit.');
        }
    }

    function saveEditedBooking() {
        const bookingId = document.getElementById('editBookingId').value;
        const editedEmail = document.getElementById('editEmail').value;
        const updatedBookingDetails = {
            bookingId: bookingId,
            email: editedEmail,
        };

        localStorage.setItem(`booking_${bookingId}`, JSON.stringify(updatedBookingDetails));
        alert('Booking updated successfully.');
        document.getElementById('editBookingForm').style.display = 'none';
        searchBooking();
    }

// Function to mark a booking as checked-in
    function checkInBooking(bookingId) {
        const bookingDetails = JSON.parse(localStorage.getItem(`booking_${bookingId}`));
        if (bookingDetails) {
            // Assuming you add a 'status' field to your booking details
            bookingDetails.status = 'Checked-In';
            localStorage.setItem(`booking_${bookingId}`, JSON.stringify(bookingDetails));
            alert('Customer has been checked in successfully.');
            // Update UI accordingly
        } else {
            alert('No booking found with ID ' + bookingId + '.');
        }
    }

// Example usage: Add an event listener for a Check-In button
    document.getElementById('checkInCustomer').addEventListener('click', function() {
        const bookingId = document.getElementById('searchQuery').value;
        checkInBooking(bookingId);
    });


    document.addEventListener('DOMContentLoaded', displayReservationDetails);

    window.bookRoom = function(roomId) {
        const checkInDate = document.querySelector('input[name="check-in"]').value;
        const checkOutDate = document.querySelector('input[name="check-out"]').value;

        if (!checkInDate || !checkOutDate) {
            alert('Please select both check-in and check-out dates before booking.');
            return;
        }

        window.location.href = `reservation.html?roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}`;
    };
    localStorage.setItem(`booking_${bookingId}`, JSON.stringify(updatedBookingDetails));
    alert('Booking updated successfully.');
    document.getElementById('editBookingForm').style.display = 'none';
    searchBooking(); 
}

document.addEventListener('DOMContentLoaded', displayReservationDetails);

window.bookRoom = function(roomId) {
    const checkInDate = document.querySelector('input[name="check-in"]').value;
    const checkOutDate = document.querySelector('input[name="check-out"]').value;

    if (!checkInDate || !checkOutDate) {
        alert('Please select both check-in and check-out dates before booking.');
        return;
    }

    window.location.href = `reservation.html?roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}`;
};