// Вам дана заготовка и результат, который вы должны получить.
//  Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

function objFromXml(xml){
	var parser = new DOMParser();
	let arr = [];
	let xmlObj = parser.parseFromString(xml , `text/xml`);
	let xmlList = xmlObj.querySelector(`list`);
	let studentNode = xmlList.querySelectorAll(`student`);
	for(let i = 0;i<studentNode.length;i++){
		let nameNode = studentNode[i].querySelector(`name`);
 		let firstName = nameNode.querySelector(`first`);
 		let lastName = nameNode.querySelector(`second`);
 		let ageNode = studentNode[i].querySelector(`age`);
 		let profNode = studentNode[i].querySelector(`prof`);
		let nameAttr = nameNode.getAttribute(`lang`);
		let nameAndLastName = firstName.textContent + ` ` + lastName.textContent;
		let result = {
			name : nameAndLastName ,
			age : Number(ageNode.textContent),
			prof : profNode.textContent,
			lang : nameAttr
		}
	arr.push(result)
	}
	return arr;
}


let xmlStr = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

console.log(objFromXml(xmlStr));