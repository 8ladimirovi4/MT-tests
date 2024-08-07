


function excelToObjects(stringData){
    var stringData = document.querySelector('#excel_data').value
    $('div').html( 
        '<table><tr><td>' + 
        stringData.replace(/\n+$/i, '').replace(/\n/g, '</tr><tr><td>').replace(/\t/g, '</td><td>') + 
        '</tr></table>'
    )
}

   

function removeExtraTabs(string) {
    return string.replace(new RegExp("\t\t", 'g'), "\t");
  }
  
  function generateTable() {
    var data = removeExtraTabs($('#pastein').val());
    var rows = data.split("\n");
    var table = $('<table />');
  
    for (var y in rows) {
      var cells = rows[y].split("\t");
      var row = $('<tr />');
      for (var x in cells) {
        row.append('<td>' + cells[x] + '</td>');
      }
      table.append(row);
    }
  
    // Insert into DOM
    $('#excel_table').html(table);
  }


  data = [
    ['Google', 1998, 807.80],
    ['Apple', 1976, 116.52],
    ['Yahoo', 1994, 38.66],
];

$('#mytable').jexcel({ data:data, colWidths: [ 300, 80, 100 ] });
  

