const data = []


var datatable = webix.ui({
    container: 'data_table',
    view: 'layout',
rows:[
    {
    container: 'data_table',
    view:"datatable", 
    id:'dt',
    autoheight: true,
    columns:[
        { id:"rank",    header:"",              width:200,},
        { id:"title",   header:"Film title",    width:500},
        { id:"year",    header:"Released",      width:200},
        { id:"votes",   header:"Votes",         width:200}
    ],
    data: [],
    ready: function(){
        for(let i = 0; i < 300; i++){
           
             data.push(
                 { id:i, title:"The Shawshank Redemption", year:`19${i}`, votes:678790, rank:i, tags: [
                    {
                        "n": "Тест WebScadaMT\\IEC-104\\Измерения\\Оперативная информация\\Ia",
                        "a": "X0",
                        "s": {
                            "sid": "71fef400-b377-4767-9c9f-e67c50684ef1",
                            "q": 192,
                            "v": "4.439497470855713",
                            "record_ts": "2023-11-21T12:14:02.1163617Z",
                            "ts": "2023-11-21T12:12:04.2960000Z"
                        },
                        "vtype": 14
                    }
                ],}
             )
         
         }
         this.define('data', data);
        

    },
}]
});

//$$('dt').adjustRowHeight();