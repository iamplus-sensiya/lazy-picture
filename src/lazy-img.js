import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    styles
} from './styles';

class LazyImg extends LitElement {
    /**
     * TODO: Declare a property.
     */
    static get properties() {
        return {
            fallback: {
                type: String
            },
            src: {
                type: String
            },
            alt: {
                type: String
            },
            rootMargin: {
                type: String
            },
            inView: {
                type: Boolean
            },
            loaded: {
                type: Boolean
            },
        };
    }

    /**
     * TODO: Initialize the property.
     */
    constructor() {
        // Always call superconstructor first
        super();

        // this.message = 'Hello world! From my-element';

    }

    /**
     * TODO: Add a property to your template with a JavaScript expression.
     */
    render() {
        return html `

            ${styles}

            <slot></slot>

            ${ this.inView ? this.pictureTemplate : null }
        `;
    }

    get sourceElements() {
        const slot = this.shadowRoot.querySelector('slot');
        const assignedElements = slot
            .assignedElements()
            .filter(node =>
                node instanceof HTMLSourceElement
            );
        return assignedElements;
    }

    get pictureTemplate() {
        return html `<picture class="${!this.loaded? 'loading' : ''}">
                ${this.sourceElements.map(el => html`<source media="${el.media}" srcset="${el.srcset}">`)}
                <img src="${this.src}" alt="${this.alt}">
            </picture>`;
    }

    // Lifecycle
    //firstUpdated() {
    //    super.firstUpdated();
    //}

    connectedCallback() {
        console.log('connected');
        super.connectedCallback();
        this.createObserver();
    }

    disconnectedCallback() {
        console.log('disconnected');
        super.disconnectedCallback();
        this.observer.disconnect();
    }

    updated(changedProps) {
        // console.log('updated');
        // console.log(changedProps);
        if (changedProps.has('inView') && !!this.inView) {
            this.isInViewUpdate(changedProps);
        }
    }

    ///////////////////////

    isInViewUpdate() {
        const img = this.shadowRoot.querySelector('picture img');

        'decode' in img ?
            img.decode().then(() => this.loaded = true) :
            img.onload = () => this.loaded = true;

        img.onerror = () => this.src = this.fallback;
    }

    showImg() {
        // console.log('showing')
        this.observer.disconnect();
        this.inView = true;
    }

    handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.showImg();
            }
        });
    }

    createObserver() {
        var options = {
            root: null,
            rootMargin: this.rootMargin,
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
        this.observer.observe(this.shadowRoot.host);
    }

}
customElements.define('lazy-img', LazyImg);