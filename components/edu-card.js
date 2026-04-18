/**
 * Educational card — soft gradient surface, academic typography, optional Learn more footer.
 * Usage:
 * <edu-card>
 *   <span slot="arabic">الْعَرَبِيَّة</span>
 *   <span slot="english">Arabic</span>
 * </edu-card>
 * Optional: <span slot="learn-more">LEARN MORE ▼</span>
 */
class EduCard extends HTMLElement {
  static get observedAttributes() {
    return ['interactive'];
  }

  connectedCallback() {
    if (this.shadowRoot) return;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          vertical-align: top;
          min-width: 180px;
          max-width: 100%;
          font-family: var(--font-latin, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          --edu-card-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
          --edu-card-shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        :host([interactive]) {
          cursor: pointer;
        }

        :host(:hover) {
          transform: translateY(-4px);
        }

        :host(:hover) .shell {
          box-shadow: var(--edu-card-shadow-hover);
        }

        :host(:focus-within) {
          outline: none;
        }

        :host([interactive]:focus-visible) {
          outline: 2px solid #3b82f6;
          outline-offset: 3px;
          border-radius: 18px;
        }

        .shell {
          position: relative;
          border-radius: 16px;
          padding: 16px 20px;
          background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
          box-shadow: var(--edu-card-shadow);
          overflow: hidden;
          text-align: center;
          transition: box-shadow 0.25s ease;
        }

        .shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0)
          );
          border-radius: 16px;
        }

        .body {
          position: relative;
          z-index: 1;
        }

        ::slotted([slot="arabic"]) {
          display: block;
          margin: 0;
          font-family: var(--font-arabic, 'KFGQPC Uthmanic Script HAFS', serif);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.35;
          color: #1e293b;
          direction: rtl;
          unicode-bidi: embed;
        }

        ::slotted([slot="english"]) {
          display: block;
          margin: 4px 0 0;
          font-size: 0.9375rem;
          font-weight: 500;
          line-height: 1.35;
          color: #64748b;
        }

        .learn {
          position: relative;
          z-index: 1;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        ::slotted([slot="learn-more"]) {
          display: block;
          margin: 0;
          font: inherit;
          color: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
        }
      </style>
      <div class="shell" part="shell">
        <div class="shine" part="shine" aria-hidden="true"></div>
        <div class="body">
          <slot name="arabic"></slot>
          <slot name="english"></slot>
        </div>
        <div class="learn">
          <slot name="learn-more">LEARN MORE ▼</slot>
        </div>
      </div>
    `;

    this._syncInteractive();
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeydown);
  }

  attributeChangedCallback() {
    this._syncInteractive();
  }

  _onKeydown = (e) => {
    if (!this.hasAttribute('interactive')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
  };

  _syncInteractive() {
    const interactive = this.hasAttribute('interactive');
    if (interactive) {
      this.setAttribute('role', 'button');
      this.tabIndex = 0;
    } else {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
    }
  }
}

if (!customElements.get('edu-card')) {
  customElements.define('edu-card', EduCard);
}
