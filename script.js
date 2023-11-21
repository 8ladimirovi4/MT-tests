const data = []


var datatable = webix.ui({
    view:"datatable", 
    columns:[
        { id:"rank",    header:"",              width:50},
        { id:"title",   header:"Film title",    width:200},
        { id:"year",    header:"Released",      width:80},
        { id:"votes",   header:"Votes",         width:100}
    ],
    data: [],
    ready: function(){
        for(let i = 0; i < 300; i++){
            console.log(i)
             data.push(
                 { id:i, title:"The Shawshank Redemption", year:`19${i}`, votes:678790, rank:i}
             )
         
         }
         this.define('data', data);
        

    },

    
   
});