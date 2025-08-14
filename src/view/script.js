 const API_URL="http://localhost:3000" //Cria variavel 
   
 //Carrega os personagens em uma lista
 async function loadCharacters() {
      const res = await fetch(`${API_URL}/characters`);
      const characters = await res.json();
      const tbody = document.getElementById('characters');
      tbody.innerHTML = '';
      characters.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.id}</td>
          <td>${c.name}</td>
          <td>${c.type}</td>
          <td>${c.race}</td>
          <td>${c.weapon}</td>
          <td>${c.status}</td>
        `;
        tbody.appendChild(tr);
      });
    }
//Cria um novo personagem e atualiza a lista
     async function createCharacter() {
      const body = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        race: document.getElementById('race').value,
        weapon: document.getElementById('weapon').value,
        status: document.getElementById('status').value
      };
      await fetch(`${API_URL}/characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      loadCharacters();
    }

//Busca personagem pelo ID
    async function getById() {
      const id = document.getElementById('getId').value;
      const res = await fetch(`${API_URL}/characters/${id}`);
      const data = await res.json();
      document.getElementById('getByIdResult').textContent = JSON.stringify(data, null, 2);
    }
//Atualiza o personagem e a lista
     async function updateCharacter() {
      const id = document.getElementById('updateId').value;
      const body = {
        name: document.getElementById('updateName').value,
        type: document.getElementById('updateType').value,
        race: document.getElementById('updateRace').value,
        weapon: document.getElementById('updateWeapon').value,
        status: document.getElementById('updateStatus').value
      };
      await fetch(`${API_URL}/characters/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      loadCharacters();
    }
//Deleta o personagem e atualiza a lista
    async function deleteCharacter() {
      const id = document.getElementById('deleteId').value;
      await fetch(`${API_URL}/characters/${id}`, { method: "DELETE" });
      loadCharacters();
    }


    loadCharacters();