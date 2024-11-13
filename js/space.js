document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
      fetchImages(query);
    }
  });
  
  async function fetchImages(query) {
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
      const data = await response.json();
      const items = data.collection.items;
      displayImages(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function displayImages(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 
 
    contenedor.className = 'row';
  
    items.forEach(item => {
      const image = item.links && item.links[0].href;
      const title = item.data[0].title;
      const description = item.data[0].description || 'Descripción no disponible';
      const date = item.data[0].date_created;

      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4'; 
      card.innerHTML = `
        <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Fecha: ${new Date(date).toLocaleDateString()}</small>
          </div>
        </div>
      `;
  
      contenedor.appendChild(card);
    });
  }
  
  