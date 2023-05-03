fetch('json.json')
  .then((response) => response.json())
  .then((data) => {

    let sortDirection = 'asc';
    let sortedColumnIndex = 0;

    const table = document.createElement('table');
    table.classList.add('main-table')
    document.body.appendChild(table);



    const headerRow = document.createElement('tr');
    headerRow.classList.add('tr-row');
    table.appendChild(headerRow);


    const headers = ['Name', 'Phone', 'Email', 'Date', 'Company', 'Delete'];


    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const th = document.createElement('th');
      headerRow.appendChild(th);

      th.classList.add('sorttable');
      th.addEventListener('click', () => {
        if (sortedColumnIndex === i) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          sortedColumnIndex = i;
          sortDirection = 'asc';
        }
        sortTable();
      });


      th.textContent = header;

      if (i === sortedColumnIndex) {
        th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc', 'none');
      }
    }

    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      table.appendChild(row);

      const item = data[i];
      const keys = Object.keys(item);


      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const cell = document.createElement('td');
        row.appendChild(cell);
        cell.textContent = item[key];
      }


      const deleteButtonCell = document.createElement('td');
      row.appendChild(deleteButtonCell);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');

      deleteButton.textContent = 'Delete';
      deleteButtonCell.appendChild(deleteButton);


      deleteButton.addEventListener('click', () => {
        const rowIndex = Array.from(table.rows).indexOf(row);
        table.deleteRow(rowIndex);
      });
    }


    function sortTable() {
      const rows = Array.from(table.rows).slice(1);
      const sortFunction = getSortFunction(sortedColumnIndex, sortDirection);

      rows.sort(sortFunction);


      while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
      }

      rows.forEach((row) => table.appendChild(row));

      const ths = headerRow.querySelectorAll('th');

      for (let i = 0; i < ths.length; i++) {
        const th = ths[i];

        if (i === sortedColumnIndex) {
          th.classList.remove('sort-asc', 'sort-desc', 'none');
          th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        } else {
          th.classList.remove('sort-asc', 'sort-desc', 'none');
        }
      }
    }


    function getSortFunction(columnIndex, direction) {
      return (row1, row2) => {
        const value1 = row1.cells[columnIndex].textContent.trim().toLowerCase();
        const value2 = row2.cells[columnIndex].textContent.trim().toLowerCase();

        if (value1 === value2) {
          return 0;
        }

        const result = value1 < value2 ? -1 : 1;

        return direction === 'asc' ? result : -result;
      };
    }
  })
  .catch((error) => {
    console.error(error);
  });