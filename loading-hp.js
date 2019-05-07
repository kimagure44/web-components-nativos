(() => {
    const loading = document.createElement('template');
    loading.innerHTML = `
        <style>
            .hide {
                display: none;
            }
            .show {
                display: inline-block;
            }
            .loading {
                position: fixed;
                width: 64px;
                height: 64px;
                z-index: 200;
                left: calc(50% - 32px);
                top: calc(50% - 32px);
            }
            .loading div {
                position: absolute;
                top: 27px;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                background: #1a75dd;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
            }
            .loading div:nth-child(1) {
                left: 6px;
                animation: loading-1 0.6s infinite;
            }
            .loading div:nth-child(2) {
                left: 6px;
                animation: loading-2 0.6s infinite;
            }
            .loading div:nth-child(3) {
                left: 26px;
                animation: loading-2 0.6s infinite;
            }
            .loading div:nth-child(4) {
                left: 45px;
                animation: loading-3 0.6s infinite;
            }
            @keyframes loading-1 {
                0% {
                transform: scale(0);
                }
                100% {
                transform: scale(1);
                }
            }
            @keyframes loading-3 {
                0% {
                transform: scale(1);
                }
                100% {
                transform: scale(0);
                }
            }
            @keyframes loading-2 {
                0% {
                transform: translate(0, 0);
                }
                100% {
                transform: translate(19px, 0);
                }
            }
        </style>
        <div class='loading'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;
    class LoadingHP extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open'});
            this.shadowRoot.appendChild(loading.content.cloneNode(true));
            this.loading = this.shadowRoot.querySelector('.loading');
        }
        static get observedAttributes() {
            return ['show'];
        }
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (attrName === 'show') {
                if (newValue === 'true') {
                    this.loading.classList.remove('hide');
                    this.loading.classList.add('show');
                } else {
                    this.loading.classList.remove('show');
                    this.loading.classList.add('hide');
                }
            }
        }
        set show(status) {
            this.setAttribute('show', status);
        }
        get show() {
            return this.getAttribute('show');
        }
    }
    customElements.define('loading-hp', LoadingHP);
})();