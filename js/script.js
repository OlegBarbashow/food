import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal, {openModal} from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId),
        50000);
    calc();
    cards();
    forms('form', '.modal', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        currentSlideSelector: '#current',
        sliderSelector: '.offer__slider',
        totalSlidesSelector: '#total',
        prevArrowSelector: '.offer__slider-prev',
        nextArrowSelector: '.offer__slider-next',
        slidesSelector: '.offer__slide',
        slidesWrapperSelector: '.offer__slider-wrapper',
        slidesFieldSelector: '.offer__slider-inner',
    });
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent',
        'tabheader__item_active');
    timer('.timer', '2025-06-29');
});