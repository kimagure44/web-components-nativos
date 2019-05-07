import './card-hp.js';
import './modal-hp.js';
import './loading-hp.js';
import { HPAPI } from './api.js';
import { UTILS } from './utils.js';

const query = (evt) => {
    const query = evt.target.getAttribute('data-query')
    const loading = document.querySelector('loading-hp');
    const modal = document.querySelector('modal-hp');
    const main = document.querySelector('main');
    if (query === 'characters' || query === 'houses' || query === 'spells') {
        loading.setAttribute('show', true);
        const cardHPCharacters = document.querySelectorAll('card-hp');
        if (cardHPCharacters.length > 0) {
            cardHPCharacters.forEach(data => data.remove());
        }
    }
    HPAPI.query(query).then(response => {
        if (query === 'characters') {
            const totalReg = response.length;
            response.forEach((data, index) => {
                const card = document.createElement('card-hp');
                data.currentlyReg = index + 1;
                data.totalReg = totalReg;
                card.characters = data;
                card.addEventListener('moreInfo', evt => {
                    HPAPI.query('characters', evt.detail.id()).then(response => {
                        modal.setAttribute('show', true);
                        modal.extraInfoCharacters = response;
                    }).catch(err => {
                        UTILS.msn(err)
                    });
                });
                loading.setAttribute('show', false);
                main.appendChild(card);
            });
        }
        if (query === 'hat') {
            const audioHat = document.getElementById('voiceHat');
            audioHat.play();
            loading.setAttribute('show', true);
            modal.setAttribute('show', true);
            modal.setAttribute('title', 'Please wait while I select your house at hogwarts')
            audioHat.onended = () => {
                loading.setAttribute('show', false);
                modal.sortingHat = response;
            }
        }
        if (query === 'houses') {
            response.forEach(data => {
                const card = document.createElement('card-hp');
                card.houses = data;
                card.addEventListener('moreInfo', evt => {
                    HPAPI.query('houses', evt.detail.id()).then(response => {
                        modal.setAttribute('show', true);
                        modal.extraInfoHouses = response[0] || [];
                    }).catch(err => {
                        UTILS.msn(err)
                    });
                });
                loading.setAttribute('show', false);
                main.appendChild(card);
            });
        }
        if (query === 'spells') {
            const totalReg = response.length;
            response.forEach((data, index) => {
                const card = document.createElement('card-hp');
                data.currentlyReg = index + 1;
                data.totalReg = totalReg;
                card.spells = data;
                loading.setAttribute('show', false);
                main.appendChild(card);
            });
        }
    }).catch(err => {
        loading.setAttribute('show', false);
        UTILS.msn(err)
    });
};

window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.button');
    UTILS.addEventlistenerMultiple(buttons, 'click', query);
}, false);

document.getElementById('inputSearch').addEventListener('keyup', e => {
    const filter = e.target.value.toLowerCase();
    const cardHp = document.querySelectorAll('card-hp');
    if (filter.length > 0) {
        cardHp.forEach(data => {
            const search = data.shadowRoot.querySelector('.card').getAttribute('data-name').toLowerCase();
            !search.includes(filter) ? data.classList.add('filter-hide') : data.classList.remove('filter-hide');    
        });
    } else {
        cardHp.forEach(data => data.classList.remove('filter-hide'));
    }
});
