// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        return data;
        console.log('Data:', data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const response = await fetch('http://localhost:3000/employees');
// Function to render data in cards
async function renderData() {
    const container = document.querySelector('.container');
    const data = await fetchData();

    if (!data) {
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.name;

        const body = document.createElement('p');
        body.textContent = item.description;

        card.appendChild(title);
        card.appendChild(body);
        container.appendChild(card);
    });
}

// Call the renderData function to display data
renderData();
