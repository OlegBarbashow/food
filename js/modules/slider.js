function slider() {
    const currentSlide = document.querySelector('#current'),
        slider = document.querySelector('.offer__slider'),
        totalSlides = document.querySelector('#total'),
        prevArrow = document.querySelector('.offer__slider-prev'),
        nextArrow = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function changeStringToNumber(str) {
        return +str.replace(/\D/g, '')
    }

    function setCurrentSlide() {
        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = `${slideIndex}`;
        }
    }

    setCurrentSlide();

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
    } else {
        totalSlides.textContent = `${slides.length}`;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

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

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', String(i + 1));
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
        if (i === 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    nextArrow.addEventListener('click', () => {
        if (offset === changeStringToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += changeStringToNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrentSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    prevArrow.addEventListener('click', () => {
        if (offset === 0) {
            offset = changeStringToNumber(width) * (slides.length - 1);
        } else {
            offset -= changeStringToNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrentSlide();

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = changeStringToNumber(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentSlide();

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

module.exports = slider;