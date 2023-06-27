class Product {
  constructor(product) {
    this.product = product;

    this.ncSettings = this._ncSettings();
  }

  //get NC settings
  _ncSettings() {
    const base = {
      currency_symbol: "$",
      currency_code: "USD",
      currency_position: "left",
    };
    //check if north_commerce_settings is object
    if (typeof north_commerce_settings !== "object") {
      return base;
    }

    //check if north_commerce_settings is empty
    if (Object.keys(north_commerce_settings).length === 0) {
      return base;
    }

    return north_commerce_settings;
  }

  getFirstImage(defaultValue = null) {
    const images = this.getImages();
    if (images.length === 0) return defaultValue;
    return images[0];
  }

  hasProductOptions() {
    return this.getProductOptions().length > 0;
  }

  getProductOptions() {
    return this.product.product_options;
  }

  getId = () => {
    return this.product.id;
  };

  getName = () => {
    return this.product.name;
  };

  getHtmlPrice = () => {
    const settings = this.ncSettings;
    const currencySymbol = settings.currency_symbol;
    const currencyCode = settings.currency_code;
    const currencyPosition = settings.currency_position;
    const basePrice = this.product.base_price;

    let htmlPrice = "";

    switch (currencyPosition) {
      case "left":
        htmlPrice = `${currencySymbol}${basePrice}`;
        break;
      case "right":
        htmlPrice = `${basePrice}${currencySymbol}`;
        break;
      case "left_space":
        htmlPrice = `${currencySymbol} ${basePrice}`;
        break;
      case "right_space":
        htmlPrice = `${basePrice} ${currencySymbol}`;
        break;
      default:
        htmlPrice = `${currencySymbol}${basePrice}`;
        break;
    }

    return htmlPrice;
  };

  getImages = () => {
    const imagesCollection = this.product.product_images;
    const images = [];

    for (const image of imagesCollection) {
      images.push(image.image_url);
    }

    return images;
  };
}

export default Product;
