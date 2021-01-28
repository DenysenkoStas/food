window.addEventListener('DOMContentLoaded', () => {
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
        });

        // удаление класса у .tabheader__item
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // отображение .tabcontent и добавление класса у .tabheader__item
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    // переключение табов
    tabsParent.addEventListener('click', (event) => {
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

    /* Timer */
    const deadline = '2020-12-11';

    // расчет временных промежутков
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // добавление ноля если время меньше 10-ти
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // установление часов/таймера на страницу
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

    /* Modal */
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    // открытие попапа
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId); // отключение автооткрытия попапа
    } 

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // закрытие попапа
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // закрытие при клике вне области модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // автоотркытие попапа при загрузке страницы
    const modalTimeId = setTimeout(openModal, 50000);

    // открытие попапа при скролле до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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
            const element = document.createElement('div');
            // добавление класса по умолчанию
            if (this.classes.length === 0) {
                this.element= 'menu__item';
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
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) { // проверка, если приходит ошибка
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
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
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

    /* Отправка данных форм */
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // ф-я настройки запроса
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
        form.addEventListener('submit', (e) => {
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
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            // закомментировал из-за ошибки Cannot find module 'core-js/modules/web.dom-collections.iterator'
            // const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращение входящих данных

            // отправка формы с использованием fetch
            postData('http://localhost:3000/requests', JSON.stringify(object)) // вызов postData
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset(); // оставил здесь из-за ошибки Cannot find module 'core-js/modules/es.promise.finally'
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            });
            // закомментировал из-за ошибки Cannot find module 'core-js/modules/es.promise.finally'
            // .finally(() => {
            //     form.reset();
            // });
        });
    }

    // оформление отправки формы
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

    /* Slider */
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'), // для реализации точек
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    // проверка на добавление 0 и отображение количества слайдов
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
    });

    // для точек
    slider.style.position = 'relative';
    // создание списка для точек
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
    slider.append(indicators);
    // создание точек
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
    }

    // удаление 'px' в ширине
    function deleteNoteDigits(str) {
        return +str.slice(0, width.length - 2); // +str.replace(/\D/g, '')
    }

    // смещение слайда вперед
    next.addEventListener('click', () => {
        if (offset == deleteNoteDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoteDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        // смена номера
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        // для переключения точек
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
    // смещение слайда назад
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoteDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoteDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        // смена номера
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        // для переключения точек
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    // переключение слайдов по клику на точку
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
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
        })
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
});