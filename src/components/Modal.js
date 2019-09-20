import { html, render } from "lit-html";
import { until } from "lit-html/directives/until";

export function renderAboutModal({ place, unitsRecord }, userRequested) {
    const target = document.getElementById("modal");
    const template = until(
        fetch(`/assets/about/${place.id}/${unitsRecord.id}.html`)
            .then((r) => {
                if (r.status === 200) {
                    return r.text();
                } else if (userRequested) {
                    return "No About Page exists for this project";
                } else {
                    throw new Error(r.statusText);
                }
            })
            .then(
                content => html`
                    <div
                        class="modal-wrapper"
                        @click="${() => render("", target)}"
                    >
                        <div class="modal-content">
                            <button
                                class="button button--transparent button--icon media__close"
                                @click=${() => render("", target)}
                            >
                                <i class="material-icons">
                                    close
                                </i>
                            </button>

                            <h2 class="media__title">${place.name}</h2>
                            <h3 class="media__subtitle">${unitsRecord.name}</h3>
                            ${html([content])}
                        </div>
                    </div>
                `
            ),
        ""
    );
    render(template, target);
}
