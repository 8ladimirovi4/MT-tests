
var timeConditionConfig = {
  id: 'timeConditionCfg',
 
  
      rows: [
        { view: 'label', label: 'Период вызова скрипта:' },
        { id: 'counterDays', name: 'schedule.time.period.span.d', view: 'counter', label: 'дни', value: 0, step: 1, value: 0, min: 0, max: 366, labelWidth: 90 },
        { id: 'counterHours', name: 'schedule.time.period.span.h', view: 'counter', label: 'часы', step: 1, value: 1, min: 0, max: 23, labelWidth: 90 },
        { id: 'counterMinutes', name: 'schedule.time.period.span.m', view: 'counter', label: 'минуты', step: 1, value: 0, min: 0, max: 59, labelWidth: 90 },
        { id: 'counterSeconds', name: 'schedule.time.period.span.s', view: 'counter', label: 'секунды', step: 1, value: 0, min: 0, max: 59, labelWidth: 90 },
      ],

  }

var schedulePeriodTypes = [
  { id: 1, value: 'Период', b: 'PerHour' },
  { id: 2, value: 'Неделя', b: 'PerWeek' },
  { id: 3, value: 'Год', b: 'PerYear' },
];

var timeCondition = {
  rows: [
    {
      id: 'timeSchedulePeriodType',
      name: 'schedule.time.period.type',
      view: 'radio',
      value: 1,
      defaultValue: 1,
      options: schedulePeriodTypes,
      vertical: false,
      on: {
        onChange: function (newv, oldv) {
          var choice = this.config.options.find((x) => x.id.toString() === newv);
          if (choice) $$(timeConditionConfig.id).showBatch(choice.b);
        },
      },
    },
    {
      name: 'schedule.time.t_postpon', //old name - schedule.time.period.t_postpon
      label: 'Смещение времени старта:',
      view: 'select',
      options: [],
      inputWidth: 300,
      labelWidth: 200,
      tooltip: 'Смещение времени старта отсчёта периода от полуночи по UTC',
      defaultValue: '03:00:00',
    },
    { height: 10 },
    timeConditionConfig,
  ],
};


var signUseBody = {
  id: 'signUseBody',
  height: 200,
  width: 850,
  cols: [
    {
      width: 600,
      css: 'sign_expression',
      inputWidth: 600,
      labelWidth: 600,
      name: 'schedule.sign.expr',
      id: 'signExpression',
      view: 'textarea',
      label: 'Условие, при котором будет выполнен скрипт:',
      labelPosition: 'top',
      defaultValue: '',

    },
  ],
};

var apertureUseBody = {
  id: 'apertureUseBody',
  height: 200,
  width: 850,
  cols: [
      {
          id: "signals",
          view: "datatable",
          resizeColumn: { size: 8 },
          resizeRow: false,
         
          headerRowHeight: 30,
          navigation: true,
          editaction: "dblclick",
          select: "cell",
          rowHeight: 24,
          drag: false,
          dragColumn: "order",
          scrollX: true,
          checkboxRefresh: true,
          columns:
              [
                  {
                      id: "signal", header: "Сигнал", width: 350, editor: "text", sort: "string", fillspace: true,
                  },
                  {
                      id: "deviation", header: "Отклонение", width: 150, editor: "text", fillspace: true, number: true
                  },
                  {
                      id: "trash", header: "<span class='webix_icon wxi-trash remove_all' title='fff'></span>", width: 35,
                     
                  }
              ],
          data:[],
          
          
      }
  ],
};

webix.ui({
  view: 'scrollview',
  body: {
  rows:[
{
  view: 'form',
  cols: [
              {
                rows: [
                  { name: 'name', label: 'Название:', view: 'text' },
                  { name: 'desc', label: 'Описание:', view: 'text' },
                  { view: 'label', label: 'Расписание:' },
                 {
                    view: "fieldset",
                    label: "<div id='fooo'></div>",
                    css: 'my-fieldset', // Добавляем пользовательский CSS класс
                    body: {
                        rows: [
                         timeCondition
                        ]
                    }
                },
                  {
                    view: 'fieldset',
                    id: 'signUse',
                    css: 'my-fieldset', // Добавляем пользовательский CSS класс
                    label: "<div id='fooo1'></div>",
                      body: {
                          rows: [
                            signUseBody
                          ]
                      }
                  },
                  {
                    view: 'fieldset',
                    id: 'apertureUse',
                    css: 'my-fieldset', // Добавляем пользовательский CSS класс
                    label: "<div id='fooo2'></div>",
                      body: {
      rows:[
        apertureUseBody
      ]
  },
 height: 200,
                  },
                ],
              }
            ]
}
  ]

  }
  })



//   webix.ui({
//     container:'fooo',
//       view:"checkbox", 
//       id:"field_a", 
//       label:"Second age", 
//       value:1,
//     });

// webix.ui({
//   container:'fooo1',
//     view:"checkbox", 
//     id:"field_a1", 
//     label:"Second age", 
//     value:1,
//   });

//   webix.ui({
//     container:'fooo2',
//       view:"checkbox", 
//       id:"field_a2", 
//       label:"Second age", 
//       value:1,
//     });