import utilities from "./utilities.js";
import app from "./app.js";
import Register from "./Register.js";

class Login {
  div_modal_header;
  div_modal_body;
  div_modal_body_form;
  div_modal_body_form_email;
  div_modal_body_form_email_input;
  div_modal_body_form_password;
  div_modal_body_form_password_input;
  div_modal_body_form_btn;
  div_modal_body_btn_register;

  constructor() {
    this.div_modal_header = utilities.createElement("div", {
      className: "modal-header",
      innerHTML:
        "<h1 class='modal-title fs-5' id='modalLabel'>Login</h1><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' ></button>",
    });

    this.div_modal_body = utilities.createElement("div", {
      className: "modal-body text-start",
      innerHTML:
        "<h3 class='fw-bold'>Welcome back</h3><p class='text-body-tertiary'>Login to your account!</p>",
    });

    this.div_modal_body_form = utilities.createElement("form", {
      className: "mt-4",
    });

    this.div_modal_body_form_email = utilities.createElement("div", {
      className: "mb-3",
    });

    this.div_modal_body_form_email_input = utilities.createElement("input", {
      type: "email",
      className: "form-control px-2 py-3",
      id: "email",
      placeholder: "Email",
      required: true,
    });

    this.div_modal_body_form_password = utilities.createElement("div", {
      className: "mb-3",
    });

    this.div_modal_body_form_password_input = utilities.createElement("input", {
      type: "password",
      className: "form-control px-2 py-3",
      id: "password",
      placeholder: "Password",
      required: true,
    });

    this.div_modal_body_form_btn = utilities.createElement("button", {
      type: "submit",
      style: "background-color: #f53e5e; color: white; width: 100%",
      className: "btn py-3 my-3",
      innerText: "Continue",
    });

    this.div_modal_body_btn_register = utilities.createElement("p", {
      className: "text-center pt-3 border-top text-body-tertiary",
      innerHTML:
        'First time using Airbnb? <a class="text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover link-offset-2">Create an account</a>',
    });
  }

  render(container) {
    this.div_modal_body_form_email.appendChild(
      this.div_modal_body_form_email_input
    );
    this.div_modal_body_form_password.appendChild(
      this.div_modal_body_form_password_input
    );
    this.div_modal_body_form.appendChild(this.div_modal_body_form_email);
    this.div_modal_body_form.appendChild(this.div_modal_body_form_password);
    this.div_modal_body_form.appendChild(this.div_modal_body_form_btn);

    this.div_modal_body_form.addEventListener("submit", this.login);
    this.div_modal_body.appendChild(this.div_modal_body_form);
    this.div_modal_body_btn_register.addEventListener(
      "click",
      this.goToRegister
    );
    this.div_modal_body.appendChild(this.div_modal_body_btn_register);

    container.appendChild(this.div_modal_header);
    container.appendChild(this.div_modal_body);
  }

  login = (e) => {
    e.preventDefault();
    let email = this.div_modal_body_form_email_input.value;
    let password = this.div_modal_body_form_password_input.value;
    utilities.firebaseLogin(email, password);
  };

  goToRegister = (e) => {
    e.preventDefault();
    const register = new Register();
    app.modal.changeComponent(register);
  };
}

export default Login;
