console.log('Client Side Js');


const weatherForm = document.querySelector('form');
const search = document.querySelector('.myinput');
const perror = document.querySelector('.error');
const pweather = document.querySelector('.weather-detail');
const ploc = document.querySelector('.weather-loc');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`http://localhost:2000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                perror.style.display="block";
                pweather.style.display="none";
                ploc.style.display="none";
                perror.textContent=data.error;

                
            } else {
                perror.style.display="none";
                pweather.style.display="block";
                ploc.style.display="block";
                ploc.textContent=data.location;
                pweather.textContent=data.weather;
            }
        })

    }).catch(error => {
        console.log(error);
    });






});