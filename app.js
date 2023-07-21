import Header from "./Header.js";
import Content from "./Content.js";
import data from "./data.js";
import Modal from "./Modal.js";
import utilities from "./utilities.js";

class App {
  container;
  header;
  content;
  modal;
  page = 1;
  data;

  constructor(container, header, content, modal, data) {
    this.container = container;
    this.header = header;
    this.content = content;
    this.modal = modal;
    this.data = data;
  }

  render() {
    this.header.render(this.container);
    this.content.render(this.container);
    this.content.displayData(this.data, true);
    this.modal.render(this.container);
  }
}

const container = document.getElementById("app");
const header = new Header();
const content = new Content();
const modal = new Modal();

const token = localStorage.getItem("token");
if (token) {
  header.div_user_menu_dropdown_ul_li_login.style.display = "none";
}

const app = new App(container, header, content, modal, data);

app.render();
export default app;

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
