
import { MY_API_KEY } from './config.js';

const apiURL = 'https://covid-193.p.rapidapi.com/statistics'; // Ganti dengan URL API yang sesuai

// Fetch data dari API
async function fetchData(country) {
  try {
    const response = await fetch(`${apiURL}?country=${encodeURIComponent(country)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': MY_API_KEY
      }
    });

    const data = await response.json(); // Mengambil data dan mengubahnya jadi objek
    displayCovidData(data); // Menampilkan data di halaman
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Menampilkan data COVID-19
function displayCovidData(data) {
  document.getElementById('covidNewConfirmed').textContent = `New confirmed cases: ${data.NewConfirmed}`;
  document.getElementById('covidTotalConfirmed').textContent = `Total confirmed cases: ${data.TotalConfirmed}`;
  document.getElementById('covidNewDeaths').textContent = `New deaths: ${data.NewDeaths}`;
  document.getElementById('covidTotalDeaths').textContent = `Total deaths: ${data.TotalDeaths}`;
  document.getElementById('covidLastUpdate').textContent = `Last updated: ${data.Date}`;
}

// Saat user memilih negara dari dropdown
document.getElementById('countries').addEventListener('change', function () {
  const selectedCountry = this.value;
  if (selectedCountry !== 'Select a country') {
    fetchData(selectedCountry); // Panggil fungsi fetch data
  }
});

// Contoh encode JSON untuk data post (jika diperlukan)
async function sendData(data) {
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': MY_API_KEY
      },
      body: JSON.stringify(data) // Encoding JSON
    });

    const responseData = await response.json(); // Decode respons JSON
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}
