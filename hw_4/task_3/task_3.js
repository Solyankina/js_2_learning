// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
//     При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//     a. Имя содержит только буквы.
//     b. Телефон имеет вид +7(000)000-0000.
//     c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//     d. Текст произвольный.
//     e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной
// рамкой и сообщить пользователю об ошибке.

class Field {
    constructor(name, input, regex) {
        this._name = name;
        this._input = input;
        this._regex = regex;
    }

    validate() {
        return {
            status: this._regex.test(this._input.textContent),
            message: `Value of field '${this._name}' is incorrect.`
        }
    }

}

function validateForm() {
    const form = document.getElementsByClassName('block_registration')[0];
    validate(form);
}

function validate(form) {
    const fields = [
        new Field("Name", form.getElementsByClassName('form__name')[0], /^[a-z]+$/ig),
        new Field("Phone", form.getElementsByClassName('form__phone')[0], /^\+7\(\d{3}\)\d{3}-\d{4}$/ig),
        new Field("Email", form.getElementsByClassName('form__email')[0], /^\+7\(\d{3}\)\d{3}-\d{4}$/ig),
        new Field("About", form.getElementsByClassName('form__about__you')[0], /\w+/ig)
    ];


    const errorHtml = [];
    fields.map(field => {
            let validation = field.validate();
            if (!validation.status) {
                errorHtml.push(`<span>${validation.message}</span>`);
                field._input.classList.add('invalid');
            }
        })

    const errorsDiv = document.getElementsByClassName('registration__text__info')[0];
    errorsDiv.innerHTML = errorHtml.join('<br>');
    document.getElementsByClassName('registration__text__info')[0].insertAdjacentElement('afterend', errorsDiv);

}


document.getElementsByClassName('registration__button')[0].addEventListener('click', validateForm);
