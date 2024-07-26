function tambahToDo(event) {
    event.preventDefault(); 

    const form = document.querySelector('form.todo');
    
    const name = form.querySelector('input[name="name"]').value;
    const jabatan = form.querySelector('input[name="jabatan"]').value;
    const tugas = form.querySelector('textarea[name="tugas"]').value;
    const level = form.querySelector('select[name="level"]').value;
    
    // Membuat waktu untuk tabel To Do List
    const monthArr = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayArr = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();

    const dateManipulation = `${dayArr[day]}, ${date} ${monthArr[month]} ${year}`;
    const tbody = document.getElementById('toDo').querySelector('tbody');

    const row = document.createElement('tr');

    const waktuCell = document.createElement('td');
    waktuCell.textContent = dateManipulation;
    row.appendChild(waktuCell); 

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);
    
    const jabatanCell = document.createElement('td');
    jabatanCell.textContent = jabatan;
    row.appendChild(jabatanCell);
    
    const tugasCell = document.createElement('td');
    tugasCell.textContent = tugas;
    row.appendChild(tugasCell);

    const levelCell = document.createElement('td');
    levelCell.textContent = level;
    row.appendChild(levelCell);

    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', () => toggleStrikethrough(row));
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    tbody.appendChild(row);

    form.reset();
}

function hapusToDo() {
    const tbody = document.getElementById('toDo').querySelector('tbody');
    
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function toggleStrikethrough(row) {
    row.classList.toggle('strikethrough');
}

function completedToDo() {
    const tbody = document.getElementById('toDo').querySelector('tbody');
    const completedRows = [];
    
    tbody.querySelectorAll('tr').forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells).map(cell => cell.textContent);
            completedRows.push(rowData);
        }
    });
    
    localStorage.setItem('completedRows', JSON.stringify(completedRows));
}


function loadCompletedRows() {
    const completedRows = JSON.parse(localStorage.getItem('completedRows')) || [];
    const tbody = document.getElementById('completedToDo').querySelector('tbody');
    
    completedRows.forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

window.onload = loadCompletedRows;
