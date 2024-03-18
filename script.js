

const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Buscando datos específicos de la tabla HTML
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2.  Ordenar datos de la tabla HTML

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Conversión de tabla HTML a archivo EXCEL

function exportarExcel() {
    const tabla = document.getElementById('tabla');
    const nombreArchivo = 'datos.xlsx';
    
    const wb = XLSX.utils.table_to_book(tabla, {sheet: "Sheet 1"});
    XLSX.writeFile(wb, nombreArchivo);
  }

// 4. alerta
function eliminar(id) {
    // Mostrar el cuadro de confirmación
    swal({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            // Si el usuario confirma, redirige a la URL de eliminación
            window.location.href = "php/funciones.php?eliminar=" + id;
        } else {
            // Si el usuario cancela, no hace nada
            swal("¡Esta persona está a salvo!");
        }
    });
}

//API
const selectPais = document.getElementById('pais');
const selectDep = document.getElementById('departamento');
const selectCiudad = document.getElementById('ciudad');
let accessToken
// Obtener token de acceso
fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "api-token": "5UXYB_2_tzLLZZN2Ba17PfEuyX4h5smVrOeVUljKWB5WnsUM4271PLWR_INuJEw34To",
        "user-email": "mariotiradotovar@gmail.com"
    }
})
    .then(response => response.json())
    .then(data => {
        accessToken = data.auth_token;
        console.log(accessToken)
        // Obtener países
        fetch('https://www.universal-tutorial.com/api/countries', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Accept": "application/json",
            }
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                data.forEach((country) => {
                    const option = document.createElement('option');
                    option.value = country.country_name;
                    option.text = country.country_name;
                    option.setAttribute('data-code', country.country_short_name)
                    selectPais.appendChild(option);
                });
            })
            .catch((error) => console.error('Error:', error));
    })
    .catch((error) => console.error('Error:', error));


// Evento para seleccionar el país
selectPais.addEventListener('change', () => {
    const paisSeleccionado = selectPais.value;

    // Obtener departamentos del país seleccionado
    fetch(`https://www.universal-tutorial.com/api/states/${paisSeleccionado}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Accept": "application/json",
        }
    })
        .then((response) => response.json())
        .then((data) => {
            selectDep.innerHTML = ''; // Limpiar select de departamentos
            data.forEach((state) => {
                const option = document.createElement('option');
                option.value = state.state_name;
                option.text = state.state_name;
                selectDep.appendChild(option);
            });

            selectDep.addEventListener('change', () => {
                const depSeleccionado = selectDep.value;
                fetch(`https://www.universal-tutorial.com/api/cities/${depSeleccionado}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        "Accept": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        selectCiudad.innerHTML = ''; // Limpiar select de ciudades
                        data.forEach((city) => {
                            const option = document.createElement('option');
                            option.value = city.city_name;
                            option.text = city.city_name;
                            selectCiudad.appendChild(option);
                        });
                    })
                    .catch((error) => console.error('Error al obtener ciudades:', error));
            })
        })
        .catch((error) => console.error('Error al obtener departamentos:', error));


});
