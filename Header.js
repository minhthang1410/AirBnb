import utilities from "./utilities.js";
import app from "./app.js";
import Login from "./Login.js";
import Search from "./Search.js";

class Header {
  div_header;
  div_logo;
  img_logo;
  div_search;
  div_search_anywhere;
  div_search_anyweek;
  div_search_addguest;
  div_user_menu;
  div_user_menu_airbnb_your_home;
  div_user_menu_dropdown;
  div_user_menu_dropdown_btn;
  div_user_menu_dropdown_ul;
  div_user_menu_dropdown_ul_li_login;
  div_user_menu_dropdown_ul_li_logout;

  constructor() {
    this.div_header = utilities.createElement("div", {
      id: "header",
      className:
        "row align-items-center justify-content-center justify-content-md-around py-3 ps-3 ps-sm-5 ps-md-4 ps-lg-0 border border-bottom fixed-top bg-white",
    });
    // Logo
    this.div_logo = utilities.createElement("div", {
      className: "col-0 col-lg-3 d-none d-lg-block",
    });
    this.img_logo = utilities.createElement("img", {
      id: "logo",
      style: "cursor: pointer",
      src: "./images/logo.png",
      alt: "logo",
    });
    //Search
    this.div_search = utilities.createElement(
      "div",
      {
        id: "search",
        className:
          "col-8 col-lg-4 border border-1 border-dark-subtle py-2 ps-4 pe-0 rounded-pill shadow-sm row align-items-center justify-content-between",
        style: "cursor: pointer",
      },
      {
        "data-bs-toggle": "modal",
        "data-bs-target": "#modal",
      }
    );
    this.div_search_anywhere = utilities.createElement("div", {
      className: "col-2 col-sm-4 small fw-semibold ps-2 pe-3",
      innerText: "Anywhere",
    });
    this.div_search_anyweek = utilities.createElement("div", {
      className:
        "col-0 col-sm-4 small fw-semibold d-none d-sm-block px-3 border-end border-start d-flex flex-grow-1",
      innerText: "Any week",
    });
    this.div_search_addguest = utilities.createElement("div", {
      className:
        "col-2 col-sm-4 small text-secondary-emphasis d-flex flex-row align-items-center justify-content-center justify-content-xl-between",
      innerHTML:
        "<div class='d-none d-xl-block w-75'>Add Guest</div><i class='fa-sharp fa-solid fa-magnifying-glass p-2 rounded-circle text-white' style='background-color: #f53e5e'></i>",
    });
    //User Menu
    this.div_user_menu = utilities.createElement("div", {
      className:
        "col-2 col-lg-3 col-md-2 col-sm-3 d-flex flex-row align-items-center justify-content-center",
    });
    this.div_user_menu_airbnb_your_home = utilities.createElement("div", {
      className:
        "d-none d-lg-block small fw-semibold py-2 px-3 rounded-pill hover-airbnb",
      innerText: "Airbnb your home",
    });
    this.div_user_menu_dropdown = utilities.createElement("div", {
      className: "dropdown ms-2",
    });
    this.div_user_menu_dropdown_btn = utilities.createElement(
      "button",
      {
        className:
          "p-2 p-md-2 border border-1 border-dark-subtle rounded-pill d-flex flex-row align-items-center userMenuIcon bg-white btn",
        innerHTML:
          '<i class="fa-sharp fa-solid fa-bars mx-1"></i><img class="rounded-circle d-none d-md-block ms-2 me-1" src="./images/placeholder.jpg" alt="Avatar" width="30px"/>',
      },
      {
        "data-bs-toggle": "dropdown",
      }
    );
    this.div_user_menu_dropdown_ul = utilities.createElement("ul", {
      className: "dropdown-menu dropdown-menu-end rounded-3",
    });

    this.div_user_menu_dropdown_ul_li_login = utilities.createElement("li", {
      innerHTML:
        '<button class="dropdown-item rounded-top-3" data-bs-toggle="modal" data-bs-target="#modal">Login</button>',
    });

    this.div_user_menu_dropdown_ul_li_logout = utilities.createElement("li", {
      innerHTML:
        '<a class="dropdown-item rounded-bottom-3" href="#">Logout</a>',
    });
  }

  render(container) {
    this.div_logo.appendChild(this.img_logo);

    this.div_search.appendChild(this.div_search_anywhere);
    this.div_search.appendChild(this.div_search_anyweek);
    this.div_search.appendChild(this.div_search_addguest);
    this.div_search.addEventListener("click", this.goToSearch);

    this.div_user_menu.appendChild(this.div_user_menu_airbnb_your_home);
    this.div_user_menu_dropdown.appendChild(this.div_user_menu_dropdown_btn);
    this.div_user_menu_dropdown_ul_li_login.addEventListener(
      "click",
      this.goToLogin
    );
    this.div_user_menu_dropdown_ul.appendChild(
      this.div_user_menu_dropdown_ul_li_login
    );
    this.div_user_menu_dropdown_ul_li_logout.addEventListener(
      "click",
      this.logout
    );
    this.div_user_menu_dropdown_ul.appendChild(
      this.div_user_menu_dropdown_ul_li_logout
    );
    this.div_user_menu_dropdown.appendChild(this.div_user_menu_dropdown_ul);
    this.div_user_menu.appendChild(this.div_user_menu_dropdown);

    this.div_header.appendChild(this.div_logo);
    this.div_header.appendChild(this.div_search);
    this.div_header.appendChild(this.div_user_menu);
    container.appendChild(this.div_header);
  }

  goToLogin = (e) => {
    e.preventDefault();
    const login = new Login();
    app.modal.changeComponent(login, false);
  };

  goToSearch = (e) => {
    e.preventDefault();
    const search = new Search();
    app.modal.changeComponent(search, true);
    utilities.initMap();
    setTimeout(() => {
      utilities.map.invalidateSize();
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 200);
  };

  logout = (e) => {
    e.preventDefault();
    utilities.firebaseLogout();
  };
}

export default Header;
