import app from "./app.js";
import utilities from "./utilities.js";

class Search {
  div_modal_header;
  div_modal_body;
  form;
  form_where;
  div_row_input;
  div_col_8;
  div_col_8_from;
  div_col_6_checkin;
  form_check_in;
  div_col_8_to;
  div_col_6_checkout;
  form_check_out;
  div_col_4;
  form_guest_number;
  form_map;
  form_btn;

  constructor() {
    this.div_modal_header = utilities.createElement("div", {
      className: "modal-header",
      innerHTML:
        "<h1 class='modal-title fs-5' id='modalLabel'>Search</h1><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' ></button>",
    });

    this.div_modal_body = utilities.createElement("div", {
      className: "modal-body text-start",
      innerHTML:
        "<h3 class='fw-bold'>Where do you wanna go?</h3><p class='text-body-tertiary'>Find the perfect location!</p>",
    });

    this.form = utilities.createElement("form", {
      className: "mt-4",
    });

    this.form_where = utilities.createElement("select", {
      id: "where",
      className: "form-select px-2 py-3 mb-4",
    });

    this.div_row_input = utilities.createElement("div", {
      className: "row justify-content-between align-items-center mb-4",
    });

    this.div_col_8 = utilities.createElement("div", {
      className: "col-8 row align-items-center justify-content-around",
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const dayin = String(today.getDate()).padStart(2, "0");
    const dayout = String(today.getDate() + 1).padStart(2, "0");

    this.div_col_6_checkin = utilities.createElement(
      "div",
      {
        className: "col-6",
      },
      {
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "top",
        "data-bs-title": "Check-in",
      }
    );

    this.form_check_in = utilities.createElement("input", {
      id: "checkin",
      className: "form-control px-2 py-3",
      type: "date",
      value: `${year}-${month}-${dayin}`,
    });

    this.div_col_6_checkout = utilities.createElement(
      "div",
      {
        className: "col-6",
      },
      {
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "top",
        "data-bs-title": "Check-out",
      }
    );

    this.form_check_out = utilities.createElement("input", {
      id: "checkout",
      className: "form-control px-2 py-3",
      type: "date",
      value: `${year}-${month}-${dayout}`,
    });

    this.div_col_4 = utilities.createElement("div", {
      className: "col-4",
    });

    this.form_guest_number = utilities.createElement("input", {
      id: "guest_number",
      className: "form-control px-2 py-3",
      type: "number",
      min: 1,
      placeholder: "How many guest?",
    });

    this.form_map = utilities.createElement("div", {
      id: "map",
      className: "border border-2 rounded-1",
    });

    this.form_btn = utilities.createElement("button", {
      type: "submit",
      className: "btn py-3 my-4",
      style: "background-color: #f53e5e; color: white; width: 100%",
      innerText: "Search",
    });
  }

  render(container) {
    for (let i = 0; i < utilities.query_suggestion_list.length; i++) {
      let option = utilities.createElement("option", {
        value: utilities.query_suggestion_list[i].place,
        innerText: utilities.query_suggestion_list[i].place,
      });

      this.form_where.appendChild(option);
    }

    this.form_where.addEventListener("change", () => {
      utilities.changeMarker(where.value);
    });

    this.form.appendChild(this.form_where);

    // this.form_check_in.onblur = ()

    this.div_col_6_checkin.appendChild(this.form_check_in);
    this.div_col_6_checkout.appendChild(this.form_check_out);
    this.div_col_8.appendChild(this.div_col_6_checkin);
    this.div_col_8.appendChild(this.div_col_6_checkout);
    this.div_col_4.appendChild(this.form_guest_number);
    this.div_row_input.appendChild(this.div_col_8);
    this.div_row_input.appendChild(this.div_col_4);
    this.form.appendChild(this.div_row_input);

    this.form.appendChild(this.form_map);
    this.form.appendChild(this.form_btn);
    this.form.addEventListener("submit", this.search);

    this.div_modal_body.appendChild(this.form);

    container.appendChild(this.div_modal_header);
    container.appendChild(this.div_modal_body);
  }

  search = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      utilities.showNotification("You need login first !!!", false);
      return;
    }
    let search_info = {
      where: this.form_where.value,
      checkin: this.form_check_in.value,
      checkout: this.form_check_out.value,
      guest_number: this.form_guest_number.value,
    };

    const url = `https://airbnb-search.p.rapidapi.com/property/search?query=${search_info.where}&locale=en-US&currency=USD&page=1&checkin=${search_info.checkin}&checkout=${search_info.checkout}&adults=${search_info.guest_number}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c583ac3c75msh5a99732bc42edf2p16e461jsn7ad3cc63d480",
        "X-RapidAPI-Host": "airbnb-search.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        app.data = data;
        app.content.displayData(data, true);
        utilities.closeModal();
      })
      .catch((err) => {
        utilities.showNotification(err, false);
      });
  };
}

export default Search;
