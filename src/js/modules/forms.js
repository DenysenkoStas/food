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
            formData.forEach(function (value, key) {
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
}

module.exports = forms;