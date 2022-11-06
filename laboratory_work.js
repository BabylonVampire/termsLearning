let l = console.log;

let ID = 0;

//создание новой формы
let newForm = document.createElement('div');
newForm.id = 'termCreation';

let fieldSet = document.createElement('div');
fieldSet.className = 'fieldset';

//создание новой легенды
let newLegend = document.createElement('legend');
newLegend.innerHTML = 'Learning new term';
fieldSet.appendChild(newLegend);

//p1

let p1 = document.createElement('p');

//label для ввода названия
let namelabel = document.createElement('label');
namelabel.for = 'text';
namelabel.innerHTML = 'Subject of study:';
p1.appendChild(namelabel);

//input для ввода названия
let nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'subject';
p1.appendChild(nameInput);

fieldSet.appendChild(p1);

//p2

let p2 = document.createElement('p');

//label для ввода текста
let textlabel = document.createElement('label');
namelabel.for = 'text';
textlabel.innerHTML = 'Glossary of terms:';
p2.appendChild(textlabel);

//input для ввода текста
let textInput = document.createElement('input');
textInput.type = 'text';
textInput.id = 'name';
p2.appendChild(textInput);

fieldSet.appendChild(p2)

//кнопка сохранения
let saveButton = document.createElement('button');
saveButton.type = 'button';
saveButton.onclick = createTermObject;
saveButton.innerHTML = 'save';
fieldSet.appendChild(saveButton);

//кнопка удаления снять изученное
let clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.innerHTML = 'clear learned terms';
clearButton.onclick = function() {
    deletedTerms = [];
    localStorage.setItem('deletedTerms', JSON.stringify(deletedTerms));
};
fieldSet.appendChild(clearButton);

newForm.appendChild(fieldSet);
document.body.appendChild(newForm);

class Term {
    constructor(termName, termSubject, id) {
        this.termName = termName;
        this.termSubject = termSubject;
        this.id = id;
    }
    
    addTerm() {
        let newForm = document.createElement('form');

        let fieldSet = document.createElement('div');
        fieldSet.className = 'fieldset'

        let labelBox = document.createElement('div');
        labelBox.className = 'labelBox';

        let termSubjectlabel = document.createElement('label');
        termSubjectlabel.innerHTML = this.termSubject;
        labelBox.appendChild(termSubjectlabel);

        let termNamelabel = document.createElement('label');
        termNamelabel.innerHTML = this.termName;
        labelBox.appendChild(termNamelabel);

        let deleteButton = document.createElement('button');
        deleteButton.id = this.id;
        deleteButton.type = 'button';
        deleteButton.onclick = this.removeTerm;
        deleteButton.innerHTML = 'studied';

        fieldSet.appendChild(labelBox);
        fieldSet.appendChild(deleteButton);

        newForm.appendChild(fieldSet);

        document.body.appendChild(newForm);
    }

    removeTerm() {
        for (let i = 0; i < termList.length; ++i) {
            if (termList[i].id == this.id) {
                deletedTerms.push(termList[i]);
                termList.splice(i, 1);
            }
        }
        printAllTerms();
    }
}

let termList = [];
let deletedTerms = [];

//Смотрим, есть ли записи в localStorage

//Если их нет, создаем два объекта для хранения изучаемых и изученных терминов
if (!JSON.parse(localStorage.getItem('termList')) && !JSON.parse(localStorage.getItem('deletedTerms'))) {
    localStorage.setItem('termList', JSON.stringify(termList));
    localStorage.setItem('deletedTerms', JSON.stringify(deletedTerms));
}

//Если есть, то получаем данные объектов
else {
    parsedTermList = JSON.parse(localStorage.getItem('termList'));
    parsedDeletedTerms = JSON.parse(localStorage.getItem('deletedTerms'));

    for (let i = 0; i < parsedTermList.length; ++i) {
        termList.push(new Term(parsedTermList[i].termName, parsedTermList[i].termSubject, ID));
        ++ID;
    }

    for (let i = 0; i < parsedDeletedTerms.length; ++i) {
        deletedTerms.push(new Term(parsedDeletedTerms[i].termName, parsedDeletedTerms[i].termSubject, ID));
        ++ID;
    }

    printAllTerms();
}

//создание нового термина
function createTermObject() {
    let termName = document.getElementById('name').value;
    let termSubject = document.getElementById('subject').value;

    //проверка на пустые поля ввода
    if (!termName && !termSubject) return;

    //проверка на повторы среди неизученных терминов
    for (let i = 0; i < termList.length; ++i) {
        if (termList[i].termName == termName && termList[i].termSubject == termSubject) return;
    }

    //проверка на повторы среди изученных терминов
    for (let i = 0; i < deletedTerms.length; ++i) {
        if (deletedTerms[i].termName == termName && deletedTerms[i].termSubject == termSubject) return;
    }

    let newTerm = new Term(termName, termSubject, ID);

    termList.push(newTerm);
    ++ID;

    printAllTerms();
}

//обновление всех терминов на странице
function printAllTerms() {
    document.querySelectorAll('form').forEach(e => e.remove());
    for (let i = 0; i < termList.length; ++i) {
        termList[i].addTerm();
    }
    localStorage.setItem('termList', JSON.stringify(termList));
    localStorage.setItem('deletedTerms', JSON.stringify(deletedTerms));
}
