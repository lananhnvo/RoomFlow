document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hotelChain').addEventListener('change', function() {
        var areas = {
            'Celestia': ['Lanxia', 'Dreamscape Delta', 'Mystic Mountain', 'Enchatment Valley', 'Elysium Estate'],
            'Emporia': ['Tower of Hope', 'Eternal Gardens', 'Monument of Peace', 'Liberty Square'],
            'Jade Empire': ['Archive of Ages', 'Palace of Peace', 'Garden of Harmony', 'Fortress of Fortitude']
        };

        var selectedChain = this.value;
        var areaSelect = document.getElementById('area');
        areaSelect.innerHTML = '<option value="any">Any</option>'; // Reset the area options

        if (areas[selectedChain]) {
            areas[selectedChain].forEach(function(area) {
                var option = new Option(area, area);
                areaSelect.add(option);
            });
        }
    });
});
