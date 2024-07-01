/* 
Вопросы:
1. По БЭМ классы элементам с одинаковыми стилями - присваивать одинаковые классы. Для написания скриптов добавлять потом свои классы?
Стилизация элементов - одни классы; Скрипты - другие. Так?
Как вариант, навешивать все обработчики на "document" и искать нужные кнопки (для скриптов) по data-атрибутам.
*/

// ------------------------------------------------- Функции ------------------------------------------------------------ //
// ---------------------------------------------------
// Функция отрисовки / скрытия меню выбора размера шрифта (с помощью "elem.classList.toggle"):
function showHideFontSizeMenu(e) {
    let target = e.currentTarget;

    if (target.id !== 'font-size-btn') {
        return; // если обработчик на "e.currentTarget" эта проверка НЕ нужна
    };

    let fontSizeMenu = document.querySelector('.font-size-menu');
    fontSizeMenu.classList.toggle('menu-active');
}

// --------------------------------------------------- //
// Функция отрисовки / скрытия меню выбора цвета шрифта (с помощью "elem.classList.toggle"):
function showHideFontColorMenu(e) {
    let target = e.currentTarget;

    if (target.id !== 'font-color-btn') {
        return; // если обработчик на "e.currentTarget" эта проверка НЕ нужна
    };

    let fontColorMenu = document.querySelector('.font-color-menu');
    fontColorMenu.classList.toggle('menu-active');
};

// --------------------------------------------------- //
// Закрытие всех активных меню по даблклику:
function hideAllActiveMenus() {
    let activeMenusList = document.querySelectorAll('.menu-active');

    Array.from(activeMenusList).forEach( (menu) => {        
        menu.classList.remove('menu-active');
    })
}

// --------------------------------------------------- //

// стилизация выделенной части текста:
/* Вопрос: текст в div "mail-body-text" остается строкой и внешне и по факту, но из-за добавления тега <b></b>
текст (если стилизуешь его частями, начинает разбиваться на куски - хотя внешне все остается ок) */
// функция "styleOfSelectedFont"

// --------------------------------------------------- //
// скрыть все открытые меню при клике на "mail-body":
function hideActiveMenus() {
    let activeMenusList = document.querySelectorAll('.menu-active');

    Array.from(activeMenusList).forEach( (menu) => {        
        menu.classList.remove('menu-active');
    })
    
    // Таже функция, но через стили:
    // let activeMenusList = document.querySelectorAll('.font-edit-row__menu');

    // let activeMenusListArr = Array.from(activeMenusList);

    // activeMenusListArr.forEach( (menu) => {
    //     if ( menu.getAttribute('style') == null ) {
    //         return;
    //     }
        
    //     let menuState = menu.getAttribute('style');

    //     if (menuState == 'visibility: visible;') {
    //         menu.style.visibility = '';
    //         menu.removeAttribute('style');
    //     };
    // });
}

// Открыть / закрыть меню выбора приоритета письма (с помощью указания стилей и dataset - много кода):
function showHideMailPriMenu() {
    let mailPriorityMenu = document.querySelector('.mail-priority-menu');
    let mailPriorityMenuState = mailPriorityMenu.style.visibility;

    if (mailPriorityMenuState == '') {
        mailPriorityMenu.style.visibility = 'visible';
    }

    else {
        mailPriorityMenu.style.visibility = '';
        mailPriorityMenu.removeAttribute('style');
    };
    
    // Почему-то тут НЕ работает "classList.toggle()"
    // let target = e.currentTarget;

    // if (target.id !== 'mail-priority-btn') {
    //     return; // если обработчик на "e.currentTarget" эта проверка НЕ нужна
    // };

    // let mailPriorityMenu = document.querySelector('.mail-priority-menu');
    // mailPriorityMenu.classList.toggle('menu-active');    
};

// Подсветить элемент выбора приоритета письма:
function highLightPriorityBox(e) {
    let target = e.target;
    let mailPriorityLabel = document.querySelector('.mail-priority-label');
    // проверки на наличие dataset нету, это принципиально?

    if (
        target.dataset.priorityHigh
        || target.dataset.priorityMedium
        || target.dataset.priorityLow
        || target.dataset.priorityStandard
       ) {
        mailPriorityLabel.style.border = '2px solid #b6b5b5';
    }
}

// Стандартный цвет (серый) рамки выбора приоритета письма:
function standardColor(e) {
    let target = e.target;
    let headerMailPriLabel = document.querySelector('.mail-priority-label');    

    if (target.className == 'mail-footer__part mail-priority-menu') {
        headerMailPriLabel.style.border = '2px solid #ededed';        
    };
};

// Покрасить фон элемента выбора приоритета письма:
function paintPriorityBoxBackground(e) {
    let target = e.target;
    let mailPriorityLabel = document.querySelector('.mail-priority-label');
    let mailPriMenu = document.querySelector('.mail-priority-menu');    
    // проверки на наличие dataset нету, это принципиально?
    
    // написать отдельно стили под каждый приоритет, очищать класс, присваивать элементу новый класс из дата атрибута
    // каждому элементу написать: data-priority='high' / medium / low и т.д; const {priority} = target.dataset;
    if (target.dataset.priorityHigh) {
        mailPriorityLabel.style.background = '#edea40';
        mailPriMenu.style.visibility = 'hidden';
        mailPriMenu.removeAttribute('style'); // ----------------------------- его обязательно убирать? По-моему он может иногда мешать скриптам
    };

    if (target.dataset.priorityMedium) {
        mailPriorityLabel.style.background = '#40b3ed';
        mailPriMenu.style.visibility = 'hidden';
        mailPriMenu.removeAttribute('style');
    };

    if (target.dataset.priorityLow) {
        mailPriorityLabel.style.background = '#25c23a';
        mailPriMenu.style.visibility = 'hidden';
        mailPriMenu.removeAttribute('style');
    };

    if (target.dataset.priorityStandard) {
        mailPriorityLabel.style.background = '#ededed';
        mailPriMenu.style.visibility = 'hidden';        
        mailPriMenu.removeAttribute('style');
        mailPriorityLabel.style.border = '2px solid #ededed'; // у письма стандартного приоритета рамки нет
    };
}

// стереть весь текст сообщения:
function deleteAlltext() {    

    let mailText = document.querySelector('.mail-body-text');
    mailText.innerText = '';

    let letterCounter = document.querySelectorAll('.font-edit-row__letter-counter')[0];
    letterCounter.innerText = 0;
}

// подсчет количества букв в сообщении:
function countMsgLetters(e) {
    let target = e.currentTarget;

    if (target.className !== 'mail-body-text') {
        return;
    };

    let letterCounter = 0;

    let msgText = document.querySelector('.mail-body-text').innerText;
   

    for (let i = 0; i < msgText.length - 1; i++) {
        // let msgTextLetter = msgText[i].toLowerCase();

        // if (msgText == '') {
        //     letterCounter = 0;
        // };
        
        letterCounter += 1;
    };

    if (document.getSelection().toString()) {        
        // letterCounter = msgText.length;
        return;
    }

    document.querySelector('.font-edit-row__letter-counter').innerText = letterCounter;
}



// ------------------------------------------------- Обработчики ------------------------------------------------------------ //

// кнопка показа и скрытия меню размеров шрифта:
const showHideFontSizeMenuBtn = document.querySelector('#font-size-btn');
showHideFontSizeMenuBtn.addEventListener('click', showHideFontSizeMenu);

// кнопка показа и скрытия меню цвета шрифта:
const fontColorMenuBtn = document.querySelectorAll('.font-color-edit-container')[0];
fontColorMenuBtn.addEventListener( 'click', showHideFontColorMenu );

// закрыть все активные меню:
document.addEventListener('dblclick', hideAllActiveMenus);

// стилизация выделенной части текста:
const fontStyleBtnsList = document.querySelectorAll('.font-edit-row__elem');

Array.from(fontStyleBtnsList).forEach( (btn) => {    
    function styleOfSelectedFont() {       
        if ( btn.dataset.fontBold ) {
            document.execCommand('bold', false, null); // сделать жирным выделенный шрифт
        };
    
        if ( btn.dataset.fontItalic ) {
            document.execCommand('italic', false, null); // сделать курсивом выделенный шрифт
        };
    
        if ( btn.dataset.fontUnderline ) {
            document.execCommand('underline', false, null); // подчеркнуть выделенный шрифт
        };
    }

    btn.addEventListener( 'mousedown', styleOfSelectedFont ); // как повесить этот обработчик на эвент "click" ? */
})

// скрыть все открытые меню при клике на "mail-body" или "font-edit-row":
document.querySelector('.mail-body-text').addEventListener('mousedown', hideActiveMenus);

// Открыть / закрыть меню выбора приоритета письма:
const mailPriorityBtn = document.querySelector('#mail-priority-btn');
mailPriorityBtn.addEventListener('click', showHideMailPriMenu);

// Подсветить элемент выбора приоритета письма:
Array.from( document.querySelectorAll('.mail-priority-menu__elem') ).forEach( (menuElem) => {
    menuElem.addEventListener('mouseover', highLightPriorityBox)})

// Стандартный цвет (серый) рамки выбора приоритета письма:
document.querySelector('.mail-priority-menu').addEventListener('mouseover', standardColor)

// Покрасить фон элемента выбора приоритета письма:
Array.from( document.querySelectorAll('.mail-priority-menu__elem') ).forEach( (menuElem) => {
    menuElem.addEventListener('click', paintPriorityBoxBackground)})

// стереть весь текст сообщения:
document.querySelector('#delete-text').addEventListener('click', deleteAlltext);

// подсчет количества букв в сообщении:
document.querySelector('.mail-body-text').addEventListener('keydown', countMsgLetters);