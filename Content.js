import HomeCard from "./HomeCard.js";
import utilities from "./utilities.js";

class Content {
  data;
  div_content;
  div_content_row;

  constructor() {
    this.div_content = utilities.createElement("div", {
      id: "content",
      className: "container-fluid text-start pb-5",
    });
    this.div_content_row = utilities.createElement("div", {
      className:
        "row p-0 align-items-center justify-content-center justify-content-xl-start",
    });
  }

  render(container) {
    this.div_content.appendChild(this.div_content_row);
    container.appendChild(this.div_content);
  }

  displayData(data, firstRender) {
    if (firstRender) {
      this.div_content_row.innerHTML = "";
    }
    this.data = data;
    if (data.status) {
      for (let i = 1; i < data.data.homes.length; i++) {
        let rating = data.data.homes[i].listing.avgRatingLocalized;
        if (rating == null) rating = "0";
        else rating = rating.split(" ")[0];

        let date =
          data.data.homes[i].listing.structuredContent.mapSecondaryLine;
        if (date == null) {
          date = "Not avaiable !!!";
        } else {
          date =
            data.data.homes[i].listing.structuredContent.mapSecondaryLine[0]
              .body;
        }

        let home = {
          id: i + 1,
          imgs: data.data.homes[i].listing.contextualPictures,
          city: data.data.homes[i].listing.city,
          describsion: data.data.homes[i].listing.name,
          date: date,
          price:
            data.data.homes[i].pricingQuote.structuredStayDisplayPrice
              .primaryLine.accessibilityLabel,
          rating: rating,
        };

        const homeCard = new HomeCard(
          home.id,
          home.imgs,
          home.city,
          home.describsion,
          home.date,
          home.price,
          home.rating
        );

        homeCard.render(this.div_content_row);
      }
    } else {
      utilities.showNotification(data.message);
    }
  }
}

export default Content;
