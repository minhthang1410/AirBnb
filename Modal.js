import utilities from "./utilities.js";

class Modal {
  div_modal;
  div_modal_dialog;
  div_modal_content;
  component;

  constructor() {
    this.div_modal = utilities.createElement("div", {
      className: "modal fade",
      id: "modal",
    });

    this.div_modal_dialog = utilities.createElement("div", {
      className: "modal-dialog modal-dialog-centered modal-fullscreen-md-down",
    });

    this.div_modal_content = utilities.createElement("div", {
      className: "modal-content p-3",
    });
  }

  changeComponent(component, isLarge) {
    this.component = component;
    if (isLarge) {
      this.div_modal_dialog.classList.add("modal-lg");
    } else {
      this.div_modal_dialog.classList.remove("modal-lg");
    }
    this.div_modal_content.innerHTML = "";
    this.component.render(this.div_modal_content);
  }

  render(container) {
    this.div_modal_dialog.appendChild(this.div_modal_content);
    this.div_modal.appendChild(this.div_modal_dialog);
    container.appendChild(this.div_modal);
  }
}

export default Modal;
