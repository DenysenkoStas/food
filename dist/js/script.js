/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");

  tabs();
  timer();
  modal();
  cards();
  forms();
  slider();
  calc();
});

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  /* Calculator */
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio; // сохранение пола в localStorage

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  } // сохранение активности в localStorage


  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  } // добавление классов из localStorage для кнопок пола и активности


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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcTotal(); // получение информации и смена классов

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        // проверка при клике на активность или пол
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio'); // получение data-атрибута

          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // сохранение активности в localStorage
        } else {
          sex = e.target.getAttribute('id'); // получение id-пола

          localStorage.setItem('sex', e.target.getAttribute('id')); // сохранение пола в localStorage
        } // удаление активного класса 


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
      } // проверка на выбранный инпут


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

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
  /* Cards */

  /* Используем классы для карточек */
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // добавление классов с помощью параметра rest

      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div'); // добавление класса по умолчанию

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }

  }
  /* Получение карточек (menu__item) */


  const getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      // проверка, если приходит ошибка
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
  /* Отрисовка карточек (menu__item) */
  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //     });

  /* Отрисовка карточек (menu__item) с использованием б-ки axios */


  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
  /* Отрисовка карточек (menu__item) - альтернативный вариант */
  // getResource('http://localhost:3000/menu')
  //     .then(data => createCard(data));
  //     function createCard(data) {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             const element = document.createElement('div');
  //             element.classList.add('menu__item');
  //             element.innerHTML = `
  //                 <img src=${img} alt=${altimg}>
  //                 <h3 class="menu__item-subtitle">${title}</h3>
  //                 <div class="menu__item-descr">${descr}</div>
  //                 <div class="menu__item-divider"></div>
  //                 <div class="menu__item-price">
  //                     <div class="menu__item-cost">Цена:</div>
  //                     <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
  //                 </div>
  //             `;
  //             document.querySelector('.menu .container').append(element);
  //         });
  //     }
}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
  /* Forms */

  /* Отправка данных форм */
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  }); // ф-я настройки запроса

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json(); // трансформация ответа в json
  };

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      }); // закомментировал из-за ошибки Cannot find module 'core-js/modules/web.dom-collections.iterator'
      // const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращение входящих данных
      // отправка формы с использованием fetch

      postData('http://localhost:3000/requests', JSON.stringify(object)) // вызов postData
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        form.reset(); // оставил здесь из-за ошибки Cannot find module 'core-js/modules/es.promise.finally'

        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }); // закомментировал из-за ошибки Cannot find module 'core-js/modules/es.promise.finally'
      // .finally(() => {
      //     form.reset();
      // });
    });
  } // оформление отправки формы


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  /* Modal */
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'); // открытие попапа

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimeId); // отключение автооткрытия попапа
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  }); // закрытие попапа

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  } // закрытие при клике вне области модального окна


  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  }); // закрытие при нажатии Escape

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }); // автоотркытие попапа при загрузке страницы

  const modalTimeId = setTimeout(openModal, 50000); // открытие попапа при скролле до конца страницы

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  /* Slider */
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        // для реализации точек
  prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0; // проверка на добавление 0 и отображение количества слайдов

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%'; // ширина карусели

  slidesField.style.display = 'flex'; // выравнивание слайдов в ряд

  slidesField.style.transition = '0.5s all'; // плавный переход

  slidesWrapper.style.overflow = 'hidden'; // скрытие слайдов
  // ширина слайда = ширине обертки слайдера

  slides.forEach(slide => {
    slide.style.width = width;
  }); // для точек

  slider.style.position = 'relative'; // создание списка для точек

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
  slider.append(indicators); // создание точек

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
`;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  } // удаление 'px' в ширине


  function deleteNoteDigits(str) {
    return +str.slice(0, width.length - 2); // +str.replace(/\D/g, '')
  } // смещение слайда вперед


  next.addEventListener('click', () => {
    if (offset == deleteNoteDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNoteDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // смена номера

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    } // для переключения точек


    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }); // смещение слайда назад

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNoteDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNoteDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // смена номера

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    } // для переключения точек


    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }); // переключение слайдов по клику на точку

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = deleteNoteDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
  /* Простой вариант слайдера */
  // showSlides(slideIndex); // инициализация слайдера
  // // проверка на добавление 0 и отображение количества слайдов
  // if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  // } else {
  //     total.textContent = slides.length;
  // }
  // function showSlides(n) {
  //     // если последний слайд, то возвращать к первому
  //     if (n > slides.length) {
  //         slideIndex = 1;
  //     }
  //     // если первый - к последнему
  //     if (n < 1) {
  //         slideIndex = slides.length;
  //     }
  //     slides.forEach(item => item.style.display = 'none'); // скрытие слайдов
  //     slides[slideIndex - 1].style.display = 'block'; // отображение первого
  //     // отображение номера текущего слайда
  //     if (slides.length < 10) {
  //         current.textContent = `0${slideIndex}`;
  //     } else {
  //         current.textContent = slideIndex;
  //     }
  // }
  // // переключение слайдов
  // function plusSlides(n) {
  //     showSlides(slideIndex += n);
  // }
  // // переключение назад
  // prev.addEventListener('click', () => {
  //     plusSlides(-1);
  // });
  // // переключение вперед
  // next.addEventListener('click', () => {
  //     plusSlides(1);
  // });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  /* Tabs/Slider */
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    // скрытие .tabcontent
    tabsContent.forEach(item => {
      // item.style.display = 'none';
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); // удаление класса у .tabheader__item

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  } // отображение .tabcontent и добавление класса у .tabheader__item


  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent(); // переключение табов

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  /* Timer */
  const deadline = '2021-05-11'; // расчет временных промежутков

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  } // добавление ноля если время меньше 10-ти


  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  } // установление часов/таймера на страницу


  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock(); // убирание мигания у верстке
    // обновление часов

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=script.js.map