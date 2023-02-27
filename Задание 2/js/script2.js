 // Вам дана заготовка и результат, который вы должны получить. 
 // Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

 let jsonStr = `{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }`;

 function objFromJSON(json){
 	let data = JSON.parse(json);
 	let list = data.list;
 	let result = [];
 	for(let i = 0;i<data[`list`].length;i++){
 		let obj = {
 			name : data[`list`][i][`name`],
 			age : Number(data[`list`][i][`age`]),
 			prof : data[`list`][i][`prof`]
 		}
 		result.push(obj);
 	}
 	return result;	
 }

 console.log(objFromJSON(jsonStr))

