(() => {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                font-family: 'Montserrat', sans-serif;
            }
            ul {
                list-style: none;
                margin: 0;
                padding: 10px;
            }
            a {
                cursor: pointer;
            }
            .background {
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                opacity: 0;
                z-index: -1;
                background: rgba(0,0,0,0.50);
                transition: 300ms ease-in-out;
            }
            .modal {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(500px, 100%));
                align-self: stretch;
                box-shadow: 0 6px 8px 6px rgba(0,0,0,0.14), 0 7px 9px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
                background-color: #ffffff;
                border-radius: 2px;
                position: fixed;
                top: calc(50% - 200px);
                left: calc(50% - 250px);
                transition: 300ms ease-in-out;
                transform: scale(0, 0);
                z-index: -1;
                opacity: 0;
            }
            .modal-content {
                border-top: 1px solid rgba(160,160,160,0.2);
                border-radius: 0 0 2px 2px;
                width: 100%;
                text-align: center;
                height: 350px;
                transform-style: preserve-3d;
                perspective: 500px;
            }
            .modal-content > ul:nth-of-type(1) > li {
                display: grid;
                grid-template-columns: 0.4fr 0.6fr;
                grid-column-gap: 10px;
                grid-row-gap: 10px;
                justify-items: stretch;
                align-items: start;
                padding-bottom: 10px;
            }
            .modal-content ul li div {
                justify-self: flex-start;
                text-align: start;
            }
            .modal-content ul li div:nth-of-type(1) {
                font-weight: bold;
                text-transform: capitalize;
            }
            .modal-content img {
                margin-top: 25px;
                animation-name: selectHouse;
                animation-timing-function: ease-in-out;
                animation-iteration-count: infinite;
                animation-duration: 1500ms;
            }
            @keyframes selectHouse {
                0% { transform: scale(0.9, 0.9); }
                50% { transform: scale(1, 1); }
                100% { transform: scale(0.9, 0.9); }
              }
            .modal-title {
                display: grid;
                grid-template-columns: 0.9fr 0.1fr;
                grid-column-gap: 10px;
                grid-row-gap: 10px;
                justify-items: stretch;
                align-items: start;
                background-color: inherit;
                border-top: 1px solid rgba(160,160,160,0.2);
                position: relative;
                padding: 16px 0;
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                font-weight: bold;
                color: #ffffff;
                background-color: #1a75dd;
            }
            .modal-title .action {
                cursor: pointer;
            }
            .transition-show-modal {
                transition: 300ms ease-in-out;
                opacity: 1;
                z-index: 100;      
                transform: scale(1, 1);    
            }
            .transition-background-modal {
                transition: 300ms ease-in-out;
                opacity: 1;
                z-index: 99;      
            }
            .locked {
                pointer-events: none;
            }
            .capitalize {
                text-transform: capitalize;
            }
            .container-members {
                border: 1px solid rgba(0,0,0,0.2);
                width: 100%;
                height: 90px; 
                overflow-y: auto;
                overflow-x: hidden;
            }
            .container-members ul li {
                padding: 5px 0;
                transition: 300ms ease-in-out;
            }
            .container-members ul li:hover {
                background-color: #1a75dd;
                transition: 300ms ease-in-out;
                color: #ffffff;
            }
        </style>
        <div class='background'></div>
        <div class='modal'>
            <div class='modal-title'>
                <div class='name'></div>
                <div class='action locked'>X</div>
            </div>
            <div class='modal-content'>
            </div>
        </div>`;
        class ModalHP extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open'});
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this.modal = this.shadowRoot.querySelector('.modal');
                this.titleModal = this.shadowRoot.querySelector('.modal-title > .name');
                this.modalBackground = this.shadowRoot.querySelector('.background');
                this.shadowRoot.querySelector('.action').addEventListener('click', this.action.bind(this), false);
            }
            static get observedAttributes() {
                return ['show', 'title'];
            }
            action() {
                this.show = false;
            }
            attributeChangedCallback(attrName, oldValue, newValue) {
                if (attrName === 'show') {
                    if (newValue === 'true') {
                        this.modal.classList.add('transition-show-modal');
                        this.modalBackground.classList.add('transition-background-modal');
                    } else {
                        this.modal.classList.remove('transition-show-modal');
                        this.modalBackground.classList.remove('transition-background-modal');
                    }
                }
                if (attrName === 'title') {
                    this.titleModal.innerHTML = newValue;
                }
            }
            set show(status) {
                this.resetModal();
                this.enabledClose(true);
                this.setAttribute('show', status);
            }
            get show() {
                return this.getAttribute('show');
            }
            set title(value) {
                this.setAttribute('title', value);
            }
            get title() {
                this.getAttribute('title');
            }
            connectedCallback() {
                if (!this.hasAttribute('show')) {
                }
            }
            resetModal() {
                var infoExtra = this.shadowRoot.querySelectorAll('.modal-content > ul');
                const img = this.shadowRoot.querySelector('.modal-content img');
                if (infoExtra.length > 0) {
                    infoExtra.forEach(data => data.remove());
                }
                if (img) {
                    this.shadowRoot.querySelector('.modal-content img').remove();
                }
                this.titleModal.innerHTML = '';
            }
            enabledClose(status) {
                const classList = this.titleModal.nextElementSibling.classList;
                status ? classList.add('locked') : classList.remove('locked');
            }
            parseBolean(value) {
                return value ? 'Yes' : 'No';
            }
            set extraInfoCharacters(data) {
                this.enabledClose(false);
                this.titleModal.innerHTML = data.name;
                const characterInfo = document.createElement('template');
                characterInfo.innerHTML = `
                    <ul>
                        <li><div>Role</div><div class='capitalize'>${data.role}</div></li>
                        <li><div>House</div><div class='capitalize'>${data.house}</div></li>
                        <li><div>School</div><div class='capitalize'>${data.school}</div></li>
                        <li><div>Ministry of magic</div><div class='capitalize'>${this.parseBolean(data.ministryOfMagic)}</div></li>
                        <li><div>Order of the Phoenix</div><div class='capitalize'>${this.parseBolean(data.orderOfThePhoenix)}</div></li>
                        <li><div>Dumbledor Army</div><div class='capitalize'>${this.parseBolean(data.dumbledoresArmy)}</div></li>
                        <li><div>Death Eater</div><div class='capitalize'>${this.parseBolean(data.deathEater)}</div></li>
                        <li><div>Blood status</div><div class='capitalize'>${data.bloodStatus}</div></li>
                        <li><div>Species</div><div class='capitalize'>${data.species}</div></li>
                    </ul>
                    `;
                this.shadowRoot.querySelector('.modal-content').appendChild(characterInfo.content.cloneNode(true));
            }
            set sortingHat(data) {
                this.enabledClose(false);
                this.titleModal.innerHTML = data;
                const randomHouse = document.createElement('template');
                randomHouse.innerHTML = `<img src='./images/${data}.png' />`;
                this.shadowRoot.querySelector('.modal-content').appendChild(randomHouse.content.cloneNode(true));
            }
            set extraInfoHouses(data) {
                this.enabledClose(false);
                this.titleModal.innerHTML = data.name;
                const housesInfo = document.createElement('template');
                const members = document.createElement('template');
                data.members.forEach(member => {
                    members.innerHTML += `<li>${member.name}</li>`;
                });
                housesInfo.innerHTML = `
                    <ul>
                        <li><div>School</div><div class='capitalize'>${data.school}</div></li>
                        <li><div>Colors</div><div class='capitalize'>${data.colors.join(', ')}</div></li>
                        <li><div>Founder</div><div class='capitalize'>${data.founder}</div></li>
                        <li><div>Head of house</div><div class='capitalize'>${data.headOfHouse}</div></li>
                        <li><div>House ghost</div><div class='capitalize'>${data.houseGhost}</div></li>
                        <li><div>Mascot</div><div class='capitalize'>${data.mascot}</div></li>
                        <li><div>Values</div><div class='capitalize'>${data.values.join(', ')}</div></li>
                        <li>
                            <div>Members</div>
                            <div class='container-members'>
                                <ul></ul>
                            </div>
                        </li>
                    </ul>
                `;
                this.shadowRoot.querySelector('.modal-content').appendChild(housesInfo.content.cloneNode(true));
                this.shadowRoot.querySelector('.container-members ul').appendChild(members.content.cloneNode(true));
            }
        }
        customElements.define('modal-hp', ModalHP);
})();