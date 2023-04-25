let sortDirection = 'asc';
let sortedColumnIndex = 0;


fetch('json.json')
  .then(response => response.json())
  .then(data => {


    const table = document.createElement('table');
    document.body.appendChild(table);


    const headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    const headers = ['Name', 'Phone', 'Email', 'Date', 'Company'];


    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const th = document.createElement('th');
      headerRow.appendChild(th);


      const sortAsc = document.createElement('span');
      sortAsc.classList.add('sort-asc');
      sortAsc.addEventListener('click', () => {
        sortDirection = 'asc';
        sortedColumnIndex = i;
        sortTable();
      });
      th.appendChild(sortAsc);

      const sortDesc = document.createElement('span');
      sortDesc.classList.add('sort-desc');
      sortDesc.addEventListener('click', () => {
        sortDirection = 'desc';
        sortedColumnIndex = i;
        sortTable();
      });
      th.appendChild(sortDesc);

      const headerText = document.createElement('span');
      headerText.textContent = header;
      th.appendChild(headerText);
    }



    const tbody = document.createElement('tbody');
    table.appendChild(tbody);


    for (const row of data) {

      const tr = document.createElement('tr');
      tbody.appendChild(tr);


      const tdName = document.createElement('td');
      tdName.textContent = row.name;
      tr.appendChild(tdName);


      const tdPhone = document.createElement('td');
      tdPhone.textContent = row.phone;
      tr.appendChild(tdPhone);


      const tdEmail = document.createElement('td');
      tdEmail.textContent = row.email;
      tr.appendChild(tdEmail);


      const tdDate = document.createElement('td');
      tdDate.textContent = row.date;
      tr.appendChild(tdDate);


      const tdCompany = document.createElement('td');
      tdCompany.textContent = row.company;
      tr.appendChild(tdCompany);
    }


    function sortTable() {

      const rows = Array.from(tbody.rows);


      rows.sort((aRow, bRow) => {
        const aValue = aRow.cells[sortedColumnIndex].textContent;
        const bValue = bRow.cells[sortedColumnIndex].textContent;
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });


      tbody.innerHTML = '';


      for (const row of rows) {
        tbody.appendChild(row);
      }


      const headers = headerRow.querySelectorAll('th');


      for (const header of headers) {
        header.classList.remove('sort-asc', 'sort-desc');
      }

      const sortedHeader = headers[sortedColumnIndex];

      const sortClass = sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';

      sortedHeader.classList.add(sortClass);
    }

  })
  .catch(error => {
    console.error(error);
  });