window.onload = function() {
    //Header//
    addMenuHandlers();
    //Slider//
    addSliderHandlers();
    //PHONE//
    addPhoneHandlers();
    //Portfolio//
    addPortfolioHandlers();
    //Form
    AddFormHandlers();
};
//Header//
const addMenuHandlers = () => {
    document.querySelector('#menu').addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__link')) {
            let activeLink = e.target;
            let linkClass = 'menu__link';
            removeActiveLinks(linkClass);
            selectLink(activeLink, linkClass);
        }
    })
};

const removeActiveLinks = (linkClass) => {
    let links = document.querySelectorAll(`.${linkClass}`);

    links.forEach((link) => {
        link.classList.remove(`${linkClass}--active`);
    });
};

const selectLink = (link, linkClass) => {
    link.classList.add(`${linkClass}--active`);
};
//Slider//
const addSliderHandlers = () => {
    document.querySelector('.main__slider').addEventListener('click', (e) => {
        if (e.target.classList.contains('slide')) {
            slider();
        };
    });
};

const slider = () => {
    let slider = document.querySelector('.wrapper_slider');
    let secondSlide = document.querySelector('.slide-2');

    if (secondSlide.classList.contains('hidden')) {
        secondSlide.classList.remove('hidden');
        slider.style.backgroundColor = '#648BF0';
        if (document.querySelector('.black_horizontal')) {
            removeBlackScreen('black_horizontal');
        };  
        if (document.querySelector('.black_vertical')) {
            removeBlackScreen('black_vertical');
        };
         
    } else {
        secondSlide.classList.add('hidden');
        slider.style.backgroundColor = '#f06c64';
    };
};
//Phone//
const addPhoneHandlers = () => {
    document.querySelector('.iphone_vertical').addEventListener('click', () => { 
        let verticalScreen = document.querySelector('.black_vertical');
        if (verticalScreen) {
            removeBlackScreen('black_vertical');
        } else {
            renderBlackScreen('black_vertical');
        };
        addBlackScreenHandler();
    });
    document.querySelector('.iphone_horizontal').addEventListener('click', () => {
        let horizontalScreen = document.querySelector('.black_horizontal');
        if (horizontalScreen) {
            removeBlackScreen('black_horizontal');
        } else {
            renderBlackScreen('black_horizontal');
        };
        addBlackScreenHandler();
    });
};

const renderBlackScreen = (screen) => {
    let div = document.createElement('div');
    let slider = document.querySelector('.main__slider');
    slider.append(div);
    div.className = `${screen} screen`;
};

const removeBlackScreen = (screen) => {
    document.querySelector(`.${screen}`).remove();
};

const addBlackScreenHandler = () => {
    if (document.querySelector('.black_horizontal')) {
        document.querySelector('.black_horizontal').addEventListener('click', () => {
            removeBlackScreen('black_horizontal');
        });
    };
    if (document.querySelector('.black_vertical')) {
        document.querySelector('.black_vertical').addEventListener('click', () => {
            removeBlackScreen('black_vertical');
        });
    }
}
//Portfolio
const addPortfolioHandlers = () => {
    document.querySelector('.portfolio_tabs').addEventListener('click', (e) => {
        let clickedTab = e.target;
        if (clickedTab.classList.contains('portfolio__tab') && !clickedTab.classList.contains('portfolio__tab--active')) {
            let tabClass = 'portfolio__tab';
            removeActiveLinks(tabClass);
            selectLink(clickedTab, tabClass);
            shuffleCards();
            removeActiveLinks('block-image');
        }
    });
    document.querySelector('.portfolio_block-images').addEventListener('click', (e) => {
        let image = e.target;
        if (image.tagName == 'IMG') {
            removeActiveLinks('block-image');
            selectLink(image, 'block-image');
        }
    });
}

const shuffleCards = () => {
    let cards = document.querySelectorAll('.portfolio_block-images div');
    cards.forEach(card => { card.style.order = `${Math.floor(Math.random() * Math.floor(12))}`});
}
//Form
const AddFormHandlers = () => {
    document.querySelector('.form').addEventListener('submit', e => {
        let email = document.querySelector('.input-email');
        let name = document.querySelector('.input-name');
        let subject = document.querySelector('.input-subject')
        let descr = document.querySelector('.input-description');

        email.checkValidity();
        name.checkValidity();
        e.preventDefault();

        if (document.querySelector('.message-block')) {
            document.querySelector('.message-block').remove();
        };

        renderMessageBlock();
        buttonHandler();
        
        if (subject.value) {
            let themeText = document.querySelector('.theme-submit');
            themeText.innerText = subject.value.toString();
        };
        if (descr.value) {
            let descrText = document.querySelector('.descr-submit');
            descrText.innerText = descr.value.toString();
        };
        
    });
}

const renderMessageBlock = () => {
    let wrapper = document.createElement('div');
    let div = document.createElement('div');
    let text = document.createElement('p');
    let theme = document.createElement('p');
    let description = document.createElement('p');
    let button = document.createElement('button');

    wrapper.className = 'message-block';
    div.className = 'message';
    text.className = 'text-submit';
    theme.className = 'theme-submit';
    description.className = 'descr-submit';
    text.innerText = 'Письмо отправлено';
    theme.innerText = 'Без темы';
    description.innerText = 'Без описания';
    button.innerText = 'OK';

    document.body.append(wrapper);
    wrapper.append(div);
    div.append(text, theme, description, button);
}

const buttonHandler = () => {
    document.querySelector('.message button').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.message-block').remove();
        document.querySelector('.form').reset(); 
    });
}