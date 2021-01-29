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

/* Получение карточек (menu__item) */
const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) { // проверка, если приходит ошибка
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};