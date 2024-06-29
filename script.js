/* 
Вопросы:
1. По БЭМ классы элементам с одинаковыми стилями - присваивать одинаковые классы. Для написания скриптов добавлять потом свои классы?
Стилизация элементов - одни классы; Скрипты - другие. Так?
Как вариант, навешивать все обработчики на "document" и искать нужные кнопки (для скриптов) по data-атрибутам.
*/

// ------------------------------------------------- Функции ------------------------------------------------------------ //
// ---------------------------------------------------
function showHideFontSizeMenu(e) {
    let target = e.currentTarget;

    if (!target.dataset.fontSize) { // тут дата-атрибут пишется camelCase, а в html как "font-size"
        return;
    };

    let fontSizeMenu = document.querySelector('.font-size-menu');
    let fontSizeMenuState = fontSizeMenu.style.visibility;

    if (fontSizeMenuState == '') {
        fontSizeMenu.style.visibility = 'visible'; /* При присваивании тут значения переменной
        "fontSizeMenuState = visible" работать не будет, т.к. это будет не стиль а просто переменная со словом "visible"
        Проверь если через const объявлена "fontSizeMenuState" будет ошибка?*/
    }

    else {
        fontSizeMenu.style.visibility = '';
         fontSizeMenu.removeAttribute('style');
    }

    // if (fontSizeMenuState == 'visible') {
    //     fontSizeMenu.style.visibility = '';
    // }
};

// --------------------------------------------------- //

function showHideFontColorMenu(e) {
    let target = e.currentTarget;

    if (!target.dataset.fontColor) {
        return;
    };

    let fontColorMenu = document.querySelectorAll('.font-color-menu')[0];
    let fontColorMenuState = fontColorMenu.style.visibility;

    if (fontColorMenuState == '') {
        fontColorMenu.style.visibility = 'visible';
    }

    else {
        fontColorMenu.style.visibility = '';
        fontColorMenu.removeAttribute('style');
    };
};

// --------------------------------------------------- //
// Закрытие всех активных меню по даблклику:
function hideAllMenus() { // ------------- а по клику ЛКМ, как-то можно закрывать все открытые меню?
    let activeMenusList = document.querySelectorAll('.font-edit-row__menu');

    let activeMenusListArr = Array.from(activeMenusList);

    activeMenusListArr.forEach( (menu) => {
        if ( menu.getAttribute('style') == null ) {
            return;
        }
        
        let menuState = menu.getAttribute('style');

        if (menuState == 'visibility: visible;') {
            menu.style.visibility = '';
            menu. removeAttribute('style');
        };
    });
};

// --------------------------------------------------- //

// стилизация выделенной части текста:
/* Вопрос: текст в div "mail-body-text" остается строкой и внешне и по факту, но из-за добавления тега <b></b>
текст (если стилизуешь его частями, начинает разбиваться на куски - хотя внешне все остается ок) */
// функция "styleOfSelectedFont"

// --------------------------------------------------- //
// скрыть все открытые меню при клике на "mail-body":
function hideActiveMenus() {
    let activeMenusList = document.querySelectorAll('.font-edit-row__menu');

    let activeMenusListArr = Array.from(activeMenusList);

    activeMenusListArr.forEach( (menu) => {
        if ( menu.getAttribute('style') == null ) {
            return;
        }
        
        let menuState = menu.getAttribute('style');

        if (menuState == 'visibility: visible;') {
            menu.style.visibility = '';
            menu. removeAttribute('style');
        };
    });
}

// Открыть / закрыть меню выбора приоритета письма:
function showHideMailPriMenu(e) {
    let target = e.target;

    if (!target.dataset.mailPriorityMenu) {
        return;
    };

    let mailPriMenu = document.querySelector('.mail-priority-menu');
    let mailPriMenuState = mailPriMenu.style.visibility;

    if (mailPriMenuState == '') {
        mailPriMenu.style.visibility = 'visible';
    }

    else {
        mailPriMenu.style.visibility = '';
        mailPriMenu.removeAttribute('style');
    }
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
    
    // if (target.dataset.priorityHigh) {
    //     mailPriorityLabel.style.border = '2px solid #b6b5b5';
    // };

    // if (target.dataset.priorityMedium) {
    //     mailPriorityLabel.style.border = '2px solid #b6b5b5';
    // };

    // if (target.dataset.priorityLow) {
    //     mailPriorityLabel.style.border = '2px solid #b6b5b5';
    // };

    // if (target.dataset.priorityStandard) {
    //     mailPriorityLabel.style.border = '2px solid #b6b5b5';
    // };
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



// ------------------------------------------------- Обработчики ------------------------------------------------------------ //

// кнопка показа и скрытия меню размеров шрифта:
const fontSizeMenuBtn = document.querySelector('.font-size-edit-container');
fontSizeMenuBtn.addEventListener( 'click', showHideFontSizeMenu );

// кнопка показа и скрытия меню цвета шрифта:
const fontColorMenuBtn = document.querySelectorAll('.font-color-edit-container')[0];
fontColorMenuBtn.addEventListener( 'click', showHideFontColorMenu );

// закрыть все активные меню:
document.addEventListener( 'dblclick', hideAllMenus );

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

// скрыть все открытые меню при клике на "mail-body":
document.querySelector('.mail-body-text').addEventListener('mousedown', hideActiveMenus);

// Открыть / закрыть меню выбора приоритета письма:
Array.from( document.querySelectorAll('.footer-btn') ).forEach( (btn) => {
    btn.addEventListener('click', showHideMailPriMenu);
})

// Подсветить элемент выбора приоритета письма:
Array.from( document.querySelectorAll('.mail-priority-menu__elem') ).forEach( (menuElem) => {
    menuElem.addEventListener('mouseover', highLightPriorityBox)})

// Стандартный цвет (серый) рамки выбора приоритета письма:
document.querySelector('.mail-priority-menu').addEventListener('mouseover', standardColor)

// Покрасить фон элемента выбора приоритета письма:
Array.from( document.querySelectorAll('.mail-priority-menu__elem') ).forEach( (menuElem) => {
    menuElem.addEventListener('click', paintPriorityBoxBackground)})
    