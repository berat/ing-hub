import {LitElement, html, css} from 'lit';
import * as constants from '../../helpers/constants';

export class PaginationView extends LitElement {
  static properties = {
    currentPage: {type: Number},
    totalPages: {type: Number},
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
  }

  render() {
    return html`
      <div class="pagination">
        <button
          @click=${() => this.changePage(this.currentPage - 1)}
          ?disabled=${this.currentPage === 1}
        >
          ◀
        </button>

        ${this._renderPageNumbers().map((page) =>
          page === '...'
            ? html`<span>...</span>`
            : html`
                <button
                  class=${this.currentPage === page ? 'active' : ''}
                  @click=${() => this.changePage(page)}
                >
                  ${page}
                </button>
              `
        )}

        <button
          @click=${() => this.changePage(this.currentPage + 1)}
          ?disabled=${this.currentPage === this.totalPages}
        >
          ▶
        </button>
      </div>
    `;
  }

  changePage(page) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent('page-changed', {
          detail: {page},
          bubbles: true,
          composed: true,
        })
      );
      this.currentPage = page;
    }
  }

  _renderPageNumbers() {
    const pages = [];

    const total = this.totalPages;
    const current = this.currentPage;
    const max = constants.MAX_VISIBLE_PAGES;
    const half = Math.floor(max / 2);

    let start = Math.max(1, current - half);
    let end = Math.min(total, current + half);

    if (current <= half) {
      end = Math.min(total, max);
    }

    if (current + half >= total) {
      start = Math.max(1, total - max + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }
    console.log(pages);

    return pages;
  }

  static styles = css`
    .pagination {
      display: flex;
      gap: 6px;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      flex-wrap: wrap;
    }

    button {
      padding: 6px 10px;
      border: 1px solid #ccc;
      background-color: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      min-width: 32px;
    }

    button.active {
      background-color: #f36f22;
      color: white;
      font-weight: bold;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
}

customElements.define('pagination-view', PaginationView);
