

document.addEventListener("DOMContentLoaded", function() {

  function getURL(url, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status < 400) return c(null, xhr.responseText);
      var e = new Error(xhr.responseText || "No response");
      e.status = xhr.status;
      c(e);
    };
  }

  var server;
  getURL("codemirror/addon/tern/defs/ecmascript.json", function(err, code) {
    if (err) throw new Error("Request for ecmascript.json: " + err);
    server = new CodeMirror.TernServer({defs: [JSON.parse(code)]});
    editor.setOption("extraKeys", {
      "Ctrl-Space": function(cm) { server.complete(cm); },
      "Ctrl-I": function(cm) { server.showType(cm); },
      "Ctrl-O": function(cm) { server.showDocs(cm); },
      "Alt-.": function(cm) { server.jumpToDef(cm); },
      "Alt-,": function(cm) { server.jumpBack(cm); },
      "Ctrl-Q": function(cm) { server.rename(cm); },
      "Ctrl-.": function(cm) { server.selectName(cm); }
    })
    editor.on("cursorActivity", function(cm) { server.updateArgHints(cm); });
  });

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript",
    theme: "default",
    lineNumbers: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          },
          "Alt-F": "findPersistent",
    },
    autoCloseBrackets: true,
    gutters: [
        "CodeMirror-lint-markers", //линтер
        "CodeMirror-linenumbers", //breake points
        "breakpoints" //breake points
    ],
    //линтер
    lint: {options: {esversion: 2021}}
  });

  //---breake points--------------------------------->
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });
  
  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
  }
  //<---breake points---------------------------------

  //----поиск---------------------------------------->
// Функция для поиска и выделения текста
function findAndSelectText(inputs) {
    const searchText = inputs[0].value;
    const content = editor.getValue();
    const startIndex = content.indexOf(searchText);
  
    if (startIndex !== -1) {
      // Найдено совпадение
        editor.setSelection(
        editor.posFromIndex(startIndex),
        editor.posFromIndex(startIndex + searchText.length)
      );
    } else {
      // Совпадение не найдено
      window.alert("Совпадений не найдено.");
    }
  }

  // Создаем шаблон диалогового окна
const dialogTemplate = document.createElement("div");
dialogTemplate.innerHTML = `
  <label for="searchText">Текст для поиска:</label>
  <input type="text" id="searchText">
  <button id="searchButton">Найти</button>
`;

// Опции для диалогового окна
const dialogOptions = {
    shrinkEditor: true,
    inputBehaviours: [
      {
        closeOnEnter: true,
        closeOnBlur: false,
        callback: findAndSelectText
      }
    ],
    buttonBehaviours: [
        {
          callback: () => {
            const inputs = dialogTemplate.getElementsByTagName("input");
            findAndSelectText(inputs);
          }
        }
      ],
    onClose: (dialog) => {
      dialog.remove();
    }
  };

// Функция для открытия диалогового окна поиска
function openSearchDialog() {
    var modalBox = document.querySelector(".CodeMirror-advanced-dialog");
        if(modalBox){
        modalBox.classList.remove('modalHidden') 
        modalBox.classList.add('modalViaible')
        return
        }
    const dialog = editor.openAdvancedDialog(dialogTemplate, dialogOptions);
  }

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", openSearchDialog); 

  var closeModalButton = document.getElementById("closeButton");
  
  closeModalButton.addEventListener('click', function(){
       
    var modalBox = document.querySelector(".CodeMirror-advanced-dialog");
    if(modalBox){
        modalBox.classList.remove('modalViaible')
    modalBox.classList.add('modalHidden') 
    }
  })
//<----поиск----------------------------------------

//   var searchButton = document.getElementById("searchButton");
//   var replaceButton = document.getElementById("replaceButton");
//   var closeModalButton = document.getElementById("closeButton");
// Обработчик события для кнопки "Поиск"


// closeModalButton.addEventListener("click", function () {
//     var modalBox = document.querySelector(".CodeMirror-advanced-dialog");
// if(modalBox)
// modalBox.classList.remove('modalViaible') 
// modalBox.classList.add('modalHidden')
// })


// searchButton.addEventListener("click", function () {
//     var modalBox = document.querySelector(".CodeMirror-advanced-dialog");
//     if(modalBox){
//     modalBox.classList.remove('modalHidden') 
//     modalBox.classList.add('modalViaible')
//     return
//     }

//     var searchTemplate = document.createElement("div");
//     searchTemplate.classList.add('searchTemplate')
//     const input = document.createElement("input")
//     input.id = "searchInput"
//     input.classList.add('search_Input')
//     input.setAttribute("type", "text")
//     searchTemplate.appendChild(input)
//     const button = document.createElement("button")
//     button.id = "startSearch"
//     button.textContent = 'Начать поиск'
//     searchTemplate.appendChild(button)
// const arr = []
// arr.push(input)


//      editor.openAdvancedDialog(searchTemplate, {
//       shrinkEditor: true,
//       inputBehaviours: 
//         {
//           closeOnEnter: true,
//           closeOnBlur: true,
//           callback: function (arr, event) {
//             console.log(arr)
           
//             performSearch(arr[1].value);
           
//           },
//         },
    
//         buttonBehaviours:{
//             callback: function (arr, event) {
//                 console.log(arr)
               
//                 performSearch(arr[1].value);
               
//               },
//         },
//       onClose: function () {
//         searchTemplate.remove();
//       },
//     });
//   });

  

//   const searchInput = document.getElementById('search-input');
//   searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value;
//     const code = editor.getValue();
    
//     const cursor = editor.getSearchCursor(searchTerm);
//     cursor.findNext()
//   })


// var searchButton = document.getElementById("searchButton");
// var findNextButton = document.getElementById("findNextButton");
// var findPrevButton = document.getElementById("findPrevButton");

// // Обработчик события для кнопки "Поиск"
// searchButton.addEventListener("click", function () {
//   editor.execCommand("findPersistent");
// });

// // Обработчик события для кнопки "Найти следующее"
// findNextButton.addEventListener("click", function () {
//   editor.execCommand("findNext");
// });

// // Обработчик события для кнопки "Найти предыдущее"
// findPrevButton.addEventListener("click", function () {
//   editor.execCommand("findPrev");
// });

})


