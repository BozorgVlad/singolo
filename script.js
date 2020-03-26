window.onload = function() {
    //Header//
    addMenuHandlers();
    //Slider//
    addSliderHandler();
    //PHONE//
    addPhoneHandlers();
    //Portfolio//
    addPortfolioHandlers();
    //Form
    AddFormHandlers();
    //Media
    addMediaHandler();
};

window.onscroll = function() {myFunction()}
    
function myFunction() {
    let header = document.querySelector(".header");
    if (window.pageYOffset >=  1) {
        header.classList.add('sticky'); 
    } else {
        header.classList.remove('sticky');
    }
};

const addMediaHandler = () => {
    const menuBtn = document.querySelector('.menu-button')
    const header = document.querySelector('.header__inner');
    const menu = document.querySelector('#menu');
    const logo = document.querySelector('.logo');

    menuBtn.addEventListener('click', e => {

        //e.preventDefault();
        if (e.target.tagName = 'A' && menuBtn.classList.contains('menu-button__active')) {
            header.classList.remove('header--active');
            menuBtn.classList.remove('menu-button__active');
            menu.style.display = 'none';
            logo.classList.remove('burger');
        } else {

            menuBtn.classList.add('menu-button__active');
            header.classList.add('header--active');
            menu.style.display = 'flex';
            logo.classList.add('burger');
        }
        
        
    })
}

//Header//
const addMenuHandlers = () => {
    document.querySelector('#menu').addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__link')) {
            let activeLink = e.target;
            let linkClass = 'menu__link';
            removeActiveLinks(linkClass);
            selectLink(activeLink, linkClass);
        };
    });
    document.addEventListener('scroll', () => {
        let curPos = window.scrollY;
        let blocks = document.querySelectorAll('#home, #services, #portfolio, #about, #contacts');
        let linkClass = document.querySelectorAll('.menu__link');

        blocks.forEach((el) => {
            if ((el.offsetTop - 100) <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
                linkClass.forEach((a) => {
                    a.classList.remove(`menu__link--active`);
                    if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                        a.classList.add(`menu__link--active`);
                    };
                });  
            };
        });
    });
   

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
const addSliderHandler = () => {
    let items = document.querySelectorAll('.item');
    let currentItem = 0;
    let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
};

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('s-active', direction);
  })
}

function showItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add('next', direction);
  if (currentItem==1) {
    document.querySelector('.wrapper_slider').classList.add('blue');
  }
  else {
    document.querySelector('.wrapper_slider').classList.remove('blue');
  }
  items[currentItem].addEventListener('animationend', function () {
   
    this.classList.remove('next', direction);
    this.classList.add('s-active');
    isEnabled = true;
    
  })
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.slide-left').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.slide-right').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

};

//Phone//
const addPhoneHandlers = () => {
    document.querySelector('.home-1').addEventListener('click', (e) => { 
        let verticalScreen = document.querySelector('.black_vertical');
        if (e.target.tagName = 'IMG') {
            if (verticalScreen) {
            removeBlackScreen('black_vertical');
            } else {
            renderBlackScreen('black_vertical', 'iphone_vertical');
            };
        };
    });
    
    document.querySelector('.home-2').addEventListener('click', (e) => {
        let horizontalScreen = document.querySelector('.black_horizontal');
        if (e.target.tagName = 'IMG') {
            if (horizontalScreen) {
            removeBlackScreen('black_horizontal');
            } else {
            renderBlackScreen('black_horizontal', 'iphone_horizontal');
            };
        };
    });
};

const renderBlackScreen = (screen, divClass) => {
    let div = document.createElement('div');
    let phone = document.querySelector(`.${divClass}`);
    phone.append(div);
    div.className = `${screen} screen`;
};

const removeBlackScreen = (screen) => {
    document.querySelector(`.${screen}`).remove();
};
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
            themeText.innerText = 'Тема: ' + subject.value.toString();
        };
        if (descr.value) {
            let descrText = document.querySelector('.descr-submit');
            descrText.innerText = 'Описание: ' + descr.value.toString();
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