function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    /* Slider */
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container), // для реализации точек
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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

}

export default slider;