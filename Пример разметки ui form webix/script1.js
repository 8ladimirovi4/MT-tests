var form = webix.ui({
    view: "form",
    rows: [ //внутри компонента обязательно должен быть ряд
       { //все ряды в форме - это объекты
        cols: [//внутри ряда возможно расположить элементы во гоизонтали в колонны
        
        { view: "checkbox", labelRight: "Remember Me", labelWidth: 0, name: "remember" },
        { view: "checkbox", labelRight: "Remember Me", labelWidth: 0, name: "remember" },
   
    ],
    },
        {
            cols: [//можно создать несколько вертикальных элементов в колонне
                {
                    rows: [//внутри колонны возможно располоагать элементы по вертикали
                        { view: "button", value: "Login", css: "webix_primary" },
                        { view: "button", value: "Cancel" }
                    ]
                },
                {
                    rows: [
                        { view: "button", value: "Login", css: "webix_primary" },
                        { view: "button", value: "Cancel" }
                    ]
                },
              
            ]
        }
    ]
});
