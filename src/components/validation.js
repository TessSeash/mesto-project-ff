export { enableValidation, clearValidation };

function enableValidation(validationConfig) { // Включить валидацию

    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((form) => { // Для каждой формы

        const formInputs = form.querySelectorAll(validationConfig.inputSelector); // Выбрать все инпуты

        formInputs.forEach(input => {  // Для каждого инпута добавить слушатели

            input.addEventListener("input", () => {

                isValid(input, validationConfig); // Проверка валидности и вывод ошибок
                toggleButtonState(form, validationConfig); // Поведение кнопки после проверки валидности

            });
        });

    });
};

function clearValidation(form, validationConfig) { // Очистка валидации

    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));

    inputList.forEach(input => { // Очистить каждый инпут

        const errorContainer = form.querySelector(`.${input.id}-error`);
        hideInputError(errorContainer, input, validationConfig);
        errorContainer.textContent = "";
        input.style.borderBottomColor = "";

    });

    toggleButtonState(form, validationConfig); // Поведение кнопки после проведения очистки инпутов
    
};

const isValid = (input, validationConfig) => {

    const errorContainer = document.querySelector(`.${input.id}-error`); // Объявить контейнер ошибки, стоящий рядом с активным инпутом, при помощи id

    errorContainer.textContent = input.validationMessage; // Привязать текст ошибки и ошибку из валидности инпута
    if (input.validity.patternMismatch) { // Кастомный текст ошибки если у инпута patternMismatch
        errorContainer.textContent = input.getAttribute("data-pattern-mismatch-message");
    }

    if (input.validity.valid) { // Спрятать ошибку если инпут валидный

        hideInputError(errorContainer, input, validationConfig);

    }
    else {  // Показать ошибку если инпут невалидный

        showInputError(errorContainer, input, validationConfig);

    }

};

function showInputError(errorContainer, input, validationConfig) { // Изменить цвет нижней границы инпута и сделать ошибку видимой

    errorContainer.classList.add(validationConfig.errorClass);
    input.style.borderBottomColor = "red";

};

function hideInputError(errorContainer, input, validationConfig) { // Изменить цвет нижней границы инпута и сделать ошибку НЕвидимой

    errorContainer.classList.remove(validationConfig.errorClass);
    input.style.borderBottomColor = "";

};

function toggleButtonState(form, validationConfig) {

    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    const isFormValid = Array.from(form.querySelectorAll(validationConfig.inputSelector)).every(input => input.validity.valid);
    // Проверка формы на валидность всех инпутов в ней

    if (!isFormValid) { // Дисактивировать кнопку

        submitButton.classList.add(validationConfig.inactiveButtonClass);
        submitButton.disabled = true;

    }
    else { // Активировать кнопку

        submitButton.classList.remove(validationConfig.inactiveButtonClass);
        submitButton.disabled = false;

    }

};