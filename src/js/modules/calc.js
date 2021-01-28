function calc() {
    /* Calculator */
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // сохранение пола в localStorage
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    // сохранение активности в localStorage
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // добавление классов из localStorage для кнопок пола и активности
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active'); // вызов ф-и для пола
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // вызов ф-и для активности

    // подсчет общего результата
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // получение информации и смена классов
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // проверка при клике на активность или пол
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // получение data-атрибута
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // сохранение активности в localStorage
                } else {
                    sex = e.target.getAttribute('id'); // получение id-пола
                    localStorage.setItem('sex', e.target.getAttribute('id')); // сохранение пола в localStorage
                }

                // удаление активного класса 
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass); // добавление активного класса

                calcTotal(); // перерасчет при каждом выборе
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); // вызов ф-и для пола
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // вызов ф-и для активности

    // получение информации с инпутов
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // проверка, если введено не число
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // проверка на выбранный инпут
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal(); // перерасчет при каждом вводе
        });
    }

    getDynamicInformation('#height'); // вызов ф-и для роста
    getDynamicInformation('#weight'); // вызов ф-и для веса
    getDynamicInformation('#age'); // вызов ф-и для возраста
}

module.exports = calc;