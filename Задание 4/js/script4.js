// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.

let inputWidth = document.getElementById(`width`);
let inputHeight = document.getElementById(`height`);
let btn = document.getElementById(`btn`);
let pages = document.getElementById(`pages`);

function display(res){	
 console.log(res)																				//Функция для заполнения картинками 
	 let cards = '';																							//поле для заполнения и подальшей передачи в p		 															//цикл для заполнения cards
	 const cardBlock = `
      			<div class="card">
        			<img src="${res.url}" class="card-image">
      			</div>
   				 `;																								//шаблонная переменная для подальшей передачи в cards
  	pages.innerHTML = cardBlock;																						//Заполнение p																							//создание p в блоке div
}
function request(width , height){
	if(width <= 300 && width >= 100 && height <= 300 && height >= 100){
			fetch(`https://picsum.photos/${width}/${height}`)
					.then((response) => {
						display(response)
    				})
    				.catch(() => { console.log('error') });
		}
		else{
			pages.innerHTML = `<p>одно из чисел вне диапазона от 100 до 300</p>`;
		}
}

btn.addEventListener(`click` , function(){
	request(inputWidth.value , inputHeight.value);
})
