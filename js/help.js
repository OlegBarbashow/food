'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //  Function for aligning blocks by height
    function alignBlocksHeight(blocksSelector) {
        const blocks = document.querySelectorAll(blocksSelector);

        let maxHeight = 0;
        blocks.forEach(item => {
            if (parseInt(window.getComputedStyle(item).height) > maxHeight) {
                maxHeight = parseInt(window.getComputedStyle(item).height);
            }

            console.log(window.getComputedStyle(item).height);
        });

        blocks.forEach(block => {
             block.style.height = `${maxHeight}px`;
        });
    }

    alignBlocksHeight('.menu__item');




});

