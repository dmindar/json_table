fetch('json.json')
		.then(response => response.json())
		.then(data => {
			const table = document.getElementById('data-table');

			const headerRow = table.insertRow();
			Object.keys(data[0]).forEach(key => { 
				const th = document.createElement('th'); 
				th.textContent = key; 
				headerRow.appendChild(th); 
			});

			data.forEach(item => { 
				const row = table.insertRow(); 
				Object.values(item).forEach(value => { 
					const cell = row.insertCell(); 
					cell.textContent = value; 
				});
			});
		})
		.catch(error => console.error(error)); 