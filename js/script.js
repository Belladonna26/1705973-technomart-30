try {
    const ESC_KEY_CODE = 27;

    const page = document.documentElement;
    const modals = Array.from(page.querySelectorAll('.modal'));

    function findModalByName(modalName) {
        return modals.find((modal) => modal.classList.contains(modalName));
    }

    function showModal(modal) {
        page.classList.add('page_modal-visible');
        modal.classList.add('modal_visible');

        const modalClosers = modal.querySelectorAll('[data-modal-closer]');

        const eventHandlers = {
            modalCloserClickHandler: () => {},
            outModalClickHandler: () => {},
            windowEscKeyDownHandler: () => {},
        }

        function removeEventHandlers() {
            page.removeEventListener('click', eventHandlers.outModalClickHandler, true);
            window.removeEventListener('keydown', eventHandlers.windowEscKeyDownHandler);
            modalClosers.forEach((modalCloser) => {
                modalCloser.removeEventListener('click', eventHandlers.modalCloserClickHandler);
            });
        }

        eventHandlers.modalCloserClickHandler = createModalCloserClickHandler(modal, removeEventHandlers);
        eventHandlers.outModalClickHandler = createOutModalClickHandler(modal, removeEventHandlers);
        eventHandlers.windowEscKeyDownHandler = createWindowEscKeyDownHandler(modal, removeEventHandlers);

        modalClosers.forEach((modalCloser) => {
            modalCloser.addEventListener('click', eventHandlers.modalCloserClickHandler);
        });
        page.addEventListener('click', eventHandlers.outModalClickHandler, true);
        window.addEventListener('keydown', eventHandlers.windowEscKeyDownHandler);
    }

    function hideModal(modal) {
        page.classList.remove('page_modal-visible');
        modal.classList.remove('modal_visible');
    }

    function createOutModalClickHandler(modal, eventListenersRemover) {
        return function handleOutModalClick(evt) {
            if (evt.target.closest('.modal') === modal || evt.target.dataset.modal) {
                return;
            }

            hideModal(modal);
            eventListenersRemover();
        }
    }

    function createModalCloserClickHandler(modal, eventListenersRemover) {
        return function handleModalCloserClick(evt) {
            hideModal(modal);
            eventListenersRemover();
        }
    }

    function createWindowEscKeyDownHandler(modal, eventListenersRemover) {
        return function handleWindowEscKeyDown(evt) {
            if (evt.keyCode !== ESC_KEY_CODE) {
                return;
            }

            hideModal(modal);
            eventListenersRemover();
        }
    }

    function handlePageClick(evt) {
        if (!evt.target.dataset.modalOpener) {
            return;
        }

        evt.preventDefault();

        const modalName = evt.target.dataset.modalOpener;
        const modal = findModalByName(modalName);



        if (!modal) {
            console.warn('Модальное окно не найдено');

            return;
        }

        showModal(modal);
    }

    page.addEventListener('click', handlePageClick, true);
} catch (e) {
    console.warn(`Модуль Modal не удалось инициализировать: ${e}`);
}

try {
    let cartItemsCount = window.location.pathname === '/catalog.html' ? 10 : 0;

    const page = document.documentElement;
    const topBarLinkCart = page.querySelector('.top-bar__link_cart');

    function addProductToCart() {
        topBarLinkCart.innerHTML = topBarLinkCart.innerHTML.replace(/Корзина: \d+/, `Корзина: ${++cartItemsCount}`);
    }

    function handlePageClick(evt) {
        if (evt.target.classList.contains('product-card__buy-button')) {
            addProductToCart();

            if (cartItemsCount > 0) {
                topBarLinkCart.classList.add('top-bar__link_amaranth');
            }
        }
    }

    page.addEventListener('click', handlePageClick);
} catch (e) {
    console.warn(`Модуль ProductCard не удалось инициализировать: ${e}`);
}

try {
    const servicesTabButtons = Array.from(document.querySelectorAll('.services__tab-button'));
    const servicesTabContents = document.querySelectorAll('.services__tab-content');
    const servicesTabButtonToServicesTabContent = new Map(
        servicesTabButtons.map((servicesTabButton, index) => [servicesTabContents[index], servicesTabButton])
    );

    function showTabContent(tabContent) {
        hideTabContents();

        tabContent.classList.add('services__tab-content_visible');
        servicesTabButtonToServicesTabContent.get(tabContent).classList.add('services__tab-button_checked');
    }

    function hideTabContent(tabContent) {
        tabContent.classList.remove('services__tab-content_visible');
        servicesTabButtonToServicesTabContent.get(tabContent).classList.remove('services__tab-button_checked');
    }

    function hideTabContents() {
        servicesTabContents.forEach((tabContent) => hideTabContent(tabContent));
    }

    function createServicesTabButtonClickHandler(tabContent) {
        return function handleTabButtonClick() {
            showTabContent(tabContent);
        }
    }

    servicesTabButtonToServicesTabContent.forEach((tabButton, tabContent) => tabButton.addEventListener('click', createServicesTabButtonClickHandler(tabContent)));
} catch (e) {
    console.warn(`Модуль Services не удалось инициализировать: ${e}`);
}

try {
    const SLIDER_SLIDE_CHANGE_DELAY = 3000;

    let currentSliderSlideIndex = 0;
    let intervalId;

    const slider = document.querySelector('.slider');
    const buttonRadioSliderSwitchers = Array.from(slider.querySelectorAll('.button-radio_slider-switcher'));
    const sliderSlides = Array.from(slider.querySelectorAll('.slider__slide'));
    const sliderNextButton = slider.querySelector('.slider__next-button');
    const sliderPreviousButton = slider.querySelector('.slider__previous-button');
    const sliderSlideToButtonRadioSliderSwitcher = new Map(buttonRadioSliderSwitchers.map((buttonRadioSliderSwitcher, index) => [sliderSlides[index], buttonRadioSliderSwitcher]));

    function startSlideShow(sliderSlide) {
        intervalId = setInterval(() => {
            const nextSliderSlide = getNextSliderSlide();

            showSliderSlide(nextSliderSlide);

        }, SLIDER_SLIDE_CHANGE_DELAY);
    }

    function stopSlideShow() {
        clearInterval(intervalId);
        intervalId = undefined;
    }

    function showSliderSlide(sliderSlide) {
        stopSlideShow();
        hideSliderSlides();

        currentSliderSlideIndex = sliderSlides.indexOf(sliderSlide);
        sliderSlide.classList.add('slider__slide_visible');
        sliderSlideToButtonRadioSliderSwitcher.get(sliderSlide).classList.add('button-radio_checked');

        startSlideShow(sliderSlide);
    }

    function hideSliderSlide(sliderSlide) {
        sliderSlide.classList.remove('slider__slide_visible');
        sliderSlideToButtonRadioSliderSwitcher.get(sliderSlide).classList.remove('button-radio_checked');
    }

    function hideSliderSlides() {
        sliderSlides.forEach((sliderSlide) => hideSliderSlide(sliderSlide));
    }

    function getNextSliderSlide(sliderSlide) {
        const nextSliderSlideIndex = sliderSlide ? sliderSlides.indexOf(sliderSlide) + 1 : currentSliderSlideIndex + 1;

        return sliderSlides[nextSliderSlideIndex > sliderSlides.length - 1 ? 0 : nextSliderSlideIndex];
    }

    function getPreviousSliderSlide() {
        const previousSliderSlideIndex = currentSliderSlideIndex - 1;

        return sliderSlides[previousSliderSlideIndex < 0 ? sliderSlides.length - 1 : previousSliderSlideIndex];
    }

    function handleSliderNextButtonClick() {
        const nextSliderSlide = getNextSliderSlide();

        showSliderSlide(nextSliderSlide);
    }

    function handleSliderPreviousButtonClick() {
        const previousSliderSlide = getPreviousSliderSlide();

        showSliderSlide(previousSliderSlide);
    }

    function createButtonRadioSliderSwitcherHandler(sliderSlide) {
        return function handleButtonRadioSliderSwitcherClick() {
            showSliderSlide(sliderSlide);
        }
    }

    sliderSlideToButtonRadioSliderSwitcher.forEach((buttonRadioSliderSwitcher, sliderSlide) => buttonRadioSliderSwitcher.addEventListener('click', createButtonRadioSliderSwitcherHandler(sliderSlide)));
    sliderNextButton.addEventListener('click', handleSliderNextButtonClick);
    sliderPreviousButton.addEventListener('click', handleSliderPreviousButtonClick);

    startSlideShow();
} catch (e) {
    console.warn(`Модуль Slider не удалось инициализировать: ${e}`);
}
