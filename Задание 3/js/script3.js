// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
// При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR 
// по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

let text = document.getElementById(`number`);																	//Находим инпут 
let btn = document.getElementById(`btn`);																		//Находим кнопку
let div = document.querySelector(`.XmlRequest`)																	//Находим див со всеми элементами
let p = document.createElement('p');																			//Создаём элемент p
let xhr = new XMLHttpRequest();																					//Создаём xhr запрос
let display = function(res){																					//Функция для заполнения картинками 
	 let cards = '';																							//поле для заполнения и подальшей передачи в p
				 for(let i = 0;i<res.length;i++){																//цикл для заполнения cards
				 	const cardBlock = `
      			<div class="card">
        			<img src="${res[i].download_url}" class="card-image"/ width="200" height = "150">
        			<p>${res[i].author}</p>
      			</div>
   				 `;																								//шаблонная переменная для подальшей передачи в cards
    			cards = cards + cardBlock;
			 }
  	p.innerHTML = cards;																						//Заполнение p
  	div.append(p);																								//создание p в блоке div
}

btn.addEventListener(`click` , function(){																		//Срабатывание функции по нажатию на кнопку 
	let num = Number(text.value);																				//преобразование содержимого input в число
	if(num > 10 || num < 1){
		p.innerHTML = `число вне диапазона от 1 до 10`; 
		div.append(p);
	}
	else{
		xhr.open('GET',`https://picsum.photos/v2/list?limit=${num}` , true);										//запрос на picsum
		xhr.onload = function(){																				//свойство , если запрос сработал 
			if(xhr.status != 200){																				//если возвращается не код 200
				console.log(`Ошибка`);
			}
			else{//если всё хорошо
				const result = JSON.parse(xhr.response);														//записывает в результ объекты
				display(result);																				//вызов функции , которая заполняет содержимое div
			}
		}
		xhr.send();																								//отправка запроса
	}
})