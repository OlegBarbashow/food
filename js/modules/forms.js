import {openModal, closeModal} from './modal';
import {postData} from "../services/services";

function forms(formSelector, modalSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thanks. We will contact with you soon!',
        failure: 'Something went wrong.'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    showThanksModal(message.success);
                    statusMessage.remove();})
                .catch(() => {
                    showThanksModal(message.failure);})
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const messageModal = document.createElement('div');
        messageModal.classList.add('modal__dialog');

        messageModal.innerHTML = `
            <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>                
            </div>  
        `;

        document.querySelector('.modal').append(messageModal);

        setTimeout(() => {
            messageModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;