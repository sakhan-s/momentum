const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    dayName = document.querySelector('.day-name'),
    name = document.querySelector('.name'),
    quote = document.querySelector('.quote'),
    quoteAuthor = document.querySelector('.quote-author'),

    weather = document.querySelector('.weather'),
    currentCity = document.querySelector('.current-city'),
    icon = document.querySelector('.icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    windSpeed = document.querySelector('.windspeed'),

    focus = document.querySelector('.focus');
const state = {
    city: "",
};
const base = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const randomIdx = (length) =>
    Math.floor(Math.random() * Math.floor(length - 1));

async function getQuote() {
    const url = "https://type.fit/api/quotes";
    const res = await fetch(url);
    const data = await res.json();

    let i = randomIdx(data.length);

    quote.textContent = data[i].text;
    quoteAuthor.textContent = data[i].author;
}

const quoteBtn = document.querySelector('.quote-btn');
quoteBtn.addEventListener('click', getQuote);

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);

function showTime() {
    let today = new Date(),
        year = today.getFullYear(),
        day = today.getDate(),
        dayIdx = today.getDay(),
        monthIdx = today.getMonth(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    const monthArr = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const dayArr = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    let currentDay = dayArr[dayIdx]
    let currentMonth = monthArr[monthIdx];

    hour = hour <= 9 ? '0' + hour : hour;
    min = min <= 9 ? '0' + min : min;
    sec = sec <= 9 ? '0' + sec : sec;
    day = day <= 9 ? '0' + day : day;
    currentMonth = currentMonth <= 9 ? '0' + currentMonth : currentMonth;

    time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec}`;
    date.innerHTML = `${day}<span>-го </span>${currentMonth}<span> </span>${year}<span> года</span>`;
    dayName.innerHTML = `${currentDay}`;
}
setInterval(showTime, 1000);
async function whereAmI() {
    const url = `https://ipinfo.io/json?token=b233ee8afcb052`;
    const promise = fetch(url)
        .then((res) => res.json())
        .then((data) => {
            state.city = data.city;
        });
    await promise.then(getWeather);
};
const getWeather = () => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${state.city}&days=1&units=S&lang=en&key=f030306e955b45f19ceaeaa1bbbf6a06`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            currentCity.textContent = `${ data.city_name }`;
            temperature.textContent = `${ Math.round(data.data[0].temp - 273.15) }°`;
            icon.innerHTML = `<img src = "https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png">`;
            windSpeed.textContent = `ветер: ${ data.data[0].wind_spd.toFixed(1) }
            m / s`;
            humidity.textContent = `влажность: ${ data.data[0].rh } %`;
        });
};
setInterval(getWeather, 1800000);

function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12 & hour > 6) {
        // Morning
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
        greeting.textContent = 'Доброе утро, ';
    } else if (hour < 18 & hour > 12) {
        // Afternoon
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greeting.textContent = 'Доброго дня, ';
    } else {
        // Evening
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
    }
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


// Run
whereAmI();
getQuote();
showTime();
setBgGreet();
getName();
getFocus();