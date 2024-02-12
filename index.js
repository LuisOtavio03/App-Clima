const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const APIkey = 'Your Api Key';
    const city = document.querySelector('.search-box input').Value;

    if (city ==='')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json =>{

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const imagens = document.querySelector('weather-box img');
        const temperatura = document.querySelector('.weather-box .temperatura');
        const descrição = document.querySelector('.weather-details .descrição');
        const humidade = document.querySelector('.weather-details .humidede span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                imagens.src = 'imagens/clear.png';
                break;

                case 'Rain':
                    imagens.src = 'imagens/rain.png';
                    break;

                    case 'Snow':
                        imagens.src = 'imagens/snow.png';
                        break;

                        case 'Clouds':
                            imagens.src = 'imagens/cloud.png';
                            break;

                            case 'Heze':
                                imagens.src = 'imagens/mist.png';
                                break;

                                default:
                                    imagens.src ='';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descrição.innerHTML = `${json.weather[0].description}`;
        humidade.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    })
})