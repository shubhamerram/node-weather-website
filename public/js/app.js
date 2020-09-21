
const weatherForm = document.querySelector('form');
const weatherLocation = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const weatherIcon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent ="loading...";
    message2.textContent = "";
    weatherIcon.removeAttribute('src')
    fetch('http://localhost:3001/weather?address='+weatherLocation.value).then((response) => {
        response.json().then( (data) => {
            if(data.error) {
                message1.textContent = "";
                message2.textContent = data.error
            } else {
                weatherIcon.setAttribute('src', data.icon)
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
            
        })
    })

})

