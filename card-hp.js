(() => {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                font-family: 'Montserrat', sans-serif;
            }
            a, 
            .card-action {
                cursor: pointer;
            }
            .card {
                display: grid;
                grid-template-columns: 1fr 50px;
                grid-template-columns: repeat(auto-fit, minmax(1fr, 50px));
                grid-template-rows: auto 1fr;
                grid-template-areas: '.' '.';
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
                position: relative;
                margin: 0;
                background-color: #ffffff;
                border-radius: 2px;
                transition: 300ms ease-in-out;
                color: #000000;
            }
            .card-spells {
                grid-template-columns: 1fr !important;
            }
            .card-action,
            .card-content {
                background-color: inherit;
                border-top: 1px solid rgba(160,160,160,0.2);
                position: relative;
                padding: 10px;
            }
            .card-action {
                border-left: 1px solid rgba(0,0,0,0.20);
                cursor: pointer;
            }
            .card:hover {
                background-color: #1a75dd;
                transition: 300ms ease-in-out;
                color: #ffffff;
            }
            .info-register {
                font-size: 10px;
                float: right;
                padding: 3px 0;
            }
            .text-limit {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 310px;
                cursor: default;
            }
            .capitalize {
                text-transform: capitalize;
            }
        </style>
        <div class='card'>
            <div class='card-content'></div>
            <div class='card-action'></div>
        </div>`;
        class CardHP extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open'});
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this.cardAction = this.shadowRoot.querySelector('.card-action');
                this.card = this.shadowRoot.querySelector('.card');
            }
            dispatchMoreInfo() {
                this.dispatchEvent(new CustomEvent('moreInfo', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: { id: () => this.getAttribute('data-id') }
                    })
                );
            }
             set characters(data) {
                const moreInfo = document.createElement('a');
                const cardContent = document.createElement('template');
                cardContent.innerHTML = `
                    <div class='text-limit' title='${data.name}'>${data.name}</div> 
                    <span class='info-register'>[${data.currentlyReg} of ${data.totalReg}]</span>
                `;
                this.shadowRoot.querySelector('.card-content').appendChild(cardContent.content.cloneNode(true));
                this.cardAction.setAttribute('data-id', data._id);
                this.card.setAttribute('data-bloodStatus', data.bloodStatus);
                this.card.setAttribute('data-deathEater', data.deathEater);
                this.card.setAttribute('data-dumbledoresArmy', data.dumbledoresArmy);
                this.card.setAttribute('data-house', data.house);
                this.card.setAttribute('data-ministryOfMagic', data.ministryOfMagic);
                this.card.setAttribute('data-name', data.name);
                this.card.setAttribute('data-orderOfThePhoenix', data.orderOfThePhoenix);
                this.card.setAttribute('data-role', data.role);
                this.card.setAttribute('data-school', data.school);
                this.card.setAttribute('data-species', data.species);
                this.cardAction.innerHTML = 'Info';
                this.cardAction.addEventListener('click', this.dispatchMoreInfo);
                this.cardAction.appendChild(moreInfo);
            }

            set houses(data) {
                const moreInfo = document.createElement('a');
                const cardContent = document.createElement('template');
                cardContent.innerHTML = `
                    <div class='text-limit' title='${data.name}'>${data.name}</div> 
                `;
                this.shadowRoot.querySelector('.card-content').appendChild(cardContent.content.cloneNode(true));
                this.card.setAttribute('data-name', data.name);
                this.cardAction.setAttribute('data-id', data._id);
                this.cardAction.innerHTML = 'Info';
                this.cardAction.addEventListener('click', this.dispatchMoreInfo);
                this.cardAction.appendChild(moreInfo);
            }

            set spells(data) {
                this.shadowRoot.querySelector('.card').classList.add('card-spells');
                this.shadowRoot.querySelector('.card .card-action').remove();
                const cardContent = document.createElement('template');
                this.card.setAttribute('data-name', data.spell);
                cardContent.innerHTML = `
                    <div class='text-limit capitalize' title='${data.spell}'><b>Spell:</b> ${data.spell}</div>
                    <div class='text-limit capitalize' title='${data.effect}'><b>Effect:</b> ${data.effect}</div>
                    <div class='text-limit capitalize' title='${data.type}'><b>Type:</b> ${data.type}</div>
                    <span class='info-register'>[${data.currentlyReg} of ${data.totalReg}]</span>
                `;
                this.shadowRoot.querySelector('.card-content').appendChild(cardContent.content.cloneNode(true));
            }
        }
        customElements.define('card-hp', CardHP);
})();
