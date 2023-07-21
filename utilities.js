import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import app from "./app.js";

const firebaseConfig = {
  // Your config here
};

class Utilities {
  query_suggestion_list;
  map;
  marker;
  firebaseApp;
  auth;

  constructor() {
    this.map = undefined;
    this.query_suggestion_list = [
      {
        place: "Hanoi, Vietnam",
        coordinate: {
          x: 21.027763,
          y: 105.83416,
        },
      },
      {
        place: "Ho Chi Minh, Vietnam",
        coordinate: {
          x: 10.823099,
          y: 106.629662,
        },
      },
      {
        place: "Da Nang, Vietnam",
        coordinate: {
          x: 16.054407,
          y: 108.202164,
        },
      },
      {
        place: "Nha Trang, Khanh Hoa Province",
        coordinate: {
          x: 12.238791,
          y: 109.196747,
        },
      },
      {
        place: "Thành phố Đà Lạt, Vietnam",
        coordinate: {
          x: 11.940419,
          y: 108.458313,
        },
      },
    ];

    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebaseApp);
  }

  firebaseRegister(email, password) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });
        app.header.div_user_menu_dropdown_ul_li_login.style.display = "none";
        this.showNotification("Register successfull, you're logged in !", true);
        this.closeModal();
      })
      .catch((error) => {
        this.showNotification(error, false);
      });
  }

  firebaseLogin(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          user.getIdToken().then((token) => {
            localStorage.setItem("token", token);
          });
          app.header.div_user_menu_dropdown_ul_li_login.style.display = "none";
          this.showNotification("Login successfull, enjoy your trip !", true);
          this.closeModal();
        }
      })
      .catch((error) => {
        this.showNotification(error, false);
      });
  }

  firebaseLogout() {
    signOut(this.auth)
      .then(() => {
        const token = localStorage.getItem("token");
        if (token) {
          localStorage.removeItem("token");
          app.header.div_user_menu_dropdown_ul_li_login.style.display = "block";
        }
      })
      .catch((error) => {
        this.showNotification(error, false);
      });
  }

  showNotification(message, success) {
    const notification = document.getElementById("notification");
    if (success) {
      notification.classList.remove("bg-danger");
      notification.classList.add("bg-success");
    } else {
      notification.classList.remove("bg-success");
      notification.classList.add("bg-danger");
    }
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(function () {
      notification.classList.remove("show");
    }, 3000);
  }

  createElement(tagName, properties, attributes) {
    const element = document.createElement(tagName);
    if (properties) {
      for (let prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          element[prop] = properties[prop];
        }
      }
    }

    if (attributes) {
      for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
          element.setAttribute(attr, attributes[attr]);
        }
      }
    }

    return element;
  }

  closeModal() {
    let modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
    modal.hide();
  }

  initMap() {
    this.map = L.map("map", {
      center: [
        this.query_suggestion_list[0].coordinate.x,
        this.query_suggestion_list[0].coordinate.y,
      ],
      zoom: 6,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.marker = L.marker([
      this.query_suggestion_list[0].coordinate.x,
      this.query_suggestion_list[0].coordinate.y,
    ]).addTo(this.map);
  }

  changeMarker(place) {
    if (this.map.hasLayer(this.marker)) {
      this.map.removeLayer(this.marker);

      for (let i = 0; i < this.query_suggestion_list.length; i++) {
        if (place == this.query_suggestion_list[i].place) {
          this.marker = L.marker([
            this.query_suggestion_list[i].coordinate.x,
            this.query_suggestion_list[i].coordinate.y,
          ]).addTo(this.map);
          this.map.panTo(
            new L.LatLng(
              this.query_suggestion_list[i].coordinate.x,
              this.query_suggestion_list[i].coordinate.y
            )
          );
        }
      }
    }
  }
}

const utilities = new Utilities();

export default utilities;
