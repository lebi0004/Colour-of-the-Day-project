const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $history = document.getElementById('history')
const $get_color = document.getElementById('get_color')


//Data
const ls = JSON.parse(localStorage.getItem('history'))
const history = ls ? ls : []


//Functions

function displayHistory(history) {
    $history.innerHTML = `
        <div>
            <h2>History</h2>
            <button class="clear">Clear</button>
        </div>`;

    history.forEach((log, index) => {
        $history.innerHTML += `
            <div>
                <div class="color" style="background-color: ${log.hex};"></div>
                <div class="color-number">#${log.hex}</div>
                <div class="color-date">${log.date}</div>
            </div>`;
    });
}


// Listeners
$get_color.addEventListener('click', async function (e) {
    e.preventDefault();
    
    
    if ($form.checkValidity()) {
        // Proceed with fetching the color
        console.log("Button clicked");
        const response = await fetch('https://colors.zoodinkers.com/api?date=' + $date.value);
        const json = await response.json();
        console.log(json);

        $form.reset();

        history.unshift(json);
        localStorage.setItem('history', JSON.stringify(history));
        displayHistory(history);
    } else {
        // Display a message that the date is required
        alert('Please select a date.');
    }
});


$history.addEventListener('click', function(e) {
    if (e.target.classList.contains('clear')) {

        //clear entire history
        history.length = 0;
        
        //update local storage
        localStorage.setItem('history', JSON.stringify(history));
        //update display history
        displayHistory(history);
   }
})


displayHistory(history)