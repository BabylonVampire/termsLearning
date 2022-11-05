let l = console.log;

let ID = 0;

let termList = [];

function createTermObject() {
    let termName = document.getElementById('name');
    let termSubject = document.getElementById('subject');
    if (!termName.value && !termSubject.value) return;
    let newTerm = new Term(termName.value, termSubject.value, ID);
    let isInArr = false;
    for (let i = 0; i < termList.length; ++i) {
        if (termList[i].termName == newTerm.termName && termList[i].termSubject == newTerm.termSubject) isInArr = !isInArr;
    }
    if (!isInArr) {
        termList.push(newTerm);
        ++ID;
    }
    l(termList);
    printAllTerms();
}

function printAllTerms() {
    document.querySelectorAll('form').forEach(e => e.remove());
    for (let i = 0; i < termList.length; ++i) {
        termList[i].addTerm();
    }
}

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
namelabel.innerHTML = 'Subject of study:<br>';
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
textlabel.innerHTML = 'Glossary of terms:<br>';
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
        deleteButton.innerHTML = 'remove term';

        fieldSet.appendChild(labelBox);
        fieldSet.appendChild(deleteButton);

        newForm.appendChild(fieldSet);

        document.body.appendChild(newForm);
    }

    removeTerm() {
        for (let i = 0; i < termList.length; ++i) {
            if (termList[i].id == this.id) {
                termList.splice(i, 1);
            }
        }
        printAllTerms();
    }
}
