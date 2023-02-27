// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

let btn = document.getElementById(`btn`);
let page = document.getElementById(`page`);
let limit = document.getElementById(`limit`);
let pages = document.getElementById(`pages`);
let xhr = new XMLHttpRequest();
let myJSON = localStorage.getItem(`myJSON`);
let btnClear = document.getElementById(`btn_clear`);

if(myJSON) {
 	 display(JSON.parse(myJSON));
 }
function request(link , callback){
	xhr.open(`GET` , link , true);
	xhr.onload = function(){																				//свойство , если запрос сработал 
			if(xhr.status != 200){																				//если возвращается не код 200
				console.log(`Ошибка`);
			}
			else{
				let result = JSON.parse(xhr.response);
				localStorage.setItem(`myJSON` , JSON.stringify(result))																							//записывает в результ объекты
				display(result);																			//вызов функции , которая заполняет содержимое div
			}
		}
	xhr.send();
}

 function display(res){	
 console.log(res);																				//Функция для заполнения картинками 
	 let cards = '';																							//поле для заполнения и подальшей передачи в p
				 for(let i = 0;i<res.length;i++){																//цикл для заполнения cards
				 	const cardBlock = `
      			<div class="card">
        			<img src="${res[i].download_url}" class="card-image">
        			<p>${res[i].author}</p>
      			</div>
   				 `;																								//шаблонная переменная для подальшей передачи в cards
    			cards = cards + cardBlock;
			 }
  	pages.innerHTML = cards;																						//Заполнение p																							//создание p в блоке div
}



btn.addEventListener(`click` , function(){
	let myPromise = new Promise((resolve , reject) => {
		if(page.value <= 10 && page.value >= 1 && limit.value <= 10 && limit.value >= 1){
			resolve(`https://picsum.photos/v2/list?page=${page.value}&limit=${limit.value}`);
		}
		else if(page.value > 10 && limit.value < 1){
			reject(`Номер страницы и лимит вне диапазона от 1 до 10`);
		}
		else if(page.value < 1 && limit.value > 10){
			reject(`Номер страницы и лимит вне диапазона от 1 до 10`);
		}
		else if(page.value < 1 && limit.value < 1){
			reject(`Номер страницы и лимит вне диапазона от 1 до 10`);
		}
		else if(page.value > 10 && limit.value > 10){
			reject(`Номер страницы и лимит вне диапазона от 1 до 10`);
		}
		else if(page.value > 10 || page.value < 1){
			reject(`Номер страницы вне диапазона от 1 до 10`);
		}
		else if(limit.value > 10 || limit.value < 1){
			reject(`Лимит вне диапазона от 1 до 10`);
		}
	})
	myPromise
			.then((result) => {
				request(result);
			})
			.catch((error) => {
				pages.innerHTML = error;
			})
})

btnClear.addEventListener(`click`, function(){
	localStorage.removeItem(`myJSON`);
})
