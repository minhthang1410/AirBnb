import utilities from "./utilities.js";

class HomeCard {
  div_home_item;
  div_carousel_img;
  div_card_body;

  constructor(id, imgs, city, describsion, date, price, rating) {
    this.id = id;
    this.imgs = imgs;
    this.city = city;
    this.date = date;
    this.price = price;
    this.rating = rating;

    this.div_col = utilities.createElement("div", {
      className: "col-10 col-md-5 col-xl-3 p-2",
    });

    this.div_home_item = utilities.createElement("div", {
      className: "card p-0 rounded-4",
    });

    this.div_carousel_img = utilities.createElement("div", {
      id: `home_card_${id}`,
      className: "carousel slide",
    });

    this.div_card_body = utilities.createElement(
      "div",
      {
        className: "card-body row align-items-start",
      },
      {
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "top",
        "data-bs-title": describsion,
      }
    );
  }

  render(container) {
    let carousel_indicators = utilities.createElement("div", {
      className: "carousel-indicators mb-0",
    });
    let carousel_inner = utilities.createElement("div", {
      className: "carousel-inner rounded-top-4",
    });

    for (let i = 0; i < this.imgs.length; i++) {
      let btn_indicator = utilities.createElement(
        "button",
        {
          type: "button",
          ariaCurrent: true,
        },
        {
          "data-bs-target": `#home_card_${this.id}`,
          "data-bs-slide-to": i,
        }
      );

      let div_carousel_item = utilities.createElement("div", {
        className: "carousel-item",
      });
      let img = utilities.createElement("img", {
        src: this.imgs[i].picture,
        className: "card-img-top p-0 rounded-top-4",
      });
      img.onerror = () => {
        img.src = "./images/404.png";
      };
      div_carousel_item.appendChild(img);

      if (i === 0) {
        btn_indicator.classList.add("active");
        div_carousel_item.classList.add("active");
      }

      carousel_inner.appendChild(div_carousel_item);
      carousel_indicators.appendChild(btn_indicator);
    }

    let prev = utilities.createElement(
      "a",
      {
        className: "carousel-control-prev text-decoration-none",
        href: `#home_card_${this.id}`,
        role: "button",
        innerHTML: "<i class='fa-solid fa-circle-chevron-left'></i>",
      },
      {
        "data-bs-slide": "prev",
      }
    );

    let next = utilities.createElement(
      "a",
      {
        className: "carousel-control-next text-decoration-none",
        href: `#home_card_${this.id}`,
        role: "button",
        innerHTML: "<i class='fa-solid fa-circle-chevron-right'></i>",
      },
      {
        "data-bs-slide": "next",
      }
    );

    let price = this.price.replace(/(\$[\d,]+)/g, "<strong>$1</strong>");

    let div_card_body_col1 = utilities.createElement("div", {
      className: "col-8 text-start",
      innerHTML: `<p class="fw-semibold">${this.city}</p>`,
    });

    let div_card_body_col2 = utilities.createElement("div", {
      className: "col-4 text-end fw-light small",
      innerHTML: `<i class="fa-solid fa-star"></i> ${this.rating}`,
    });

    let div_card_body_col3 = utilities.createElement("div", {
      className: "col text-start",
      innerHTML: `<p class="text-secondary small">${this.date}</p><p class="small">${price}</p>`,
    });

    this.div_carousel_img.appendChild(carousel_indicators);
    carousel_inner.appendChild(prev);
    carousel_inner.appendChild(next);
    this.div_carousel_img.appendChild(carousel_inner);

    this.div_card_body.appendChild(div_card_body_col1);
    this.div_card_body.appendChild(div_card_body_col2);
    this.div_card_body.appendChild(div_card_body_col3);

    this.div_home_item.appendChild(this.div_carousel_img);
    this.div_home_item.appendChild(this.div_card_body);
    this.div_col.appendChild(this.div_home_item);
    container.appendChild(this.div_col);
  }
}

export default HomeCard;
