class API {
  PRODUCT_URL = `${this.BASE_URL}/products`;

  /**
   * Get the products from the NorthCommerce API using native fetch API
   */
  static async getProducts(filters = [], expandBy = null, params = []) {
    if (expandBy == null) {
      expandBy = [
        "product_tags",
        "product_images",
        "product_options",
        "product_categories.category",
      ];
    }
    //base link
    let link = `${this.getBaseUrl()}/wp-json/nc-data/v1/products`;

    //if we want to expand the data
    const expand = expandBy.join(",");
    if (expandBy.length > 0) {
      link += `?expand=${expand}`;
    }

    //loop over filters
    let linkFilter = "";
    if (filters.length > 0) {
      linkFilter = `${expandBy.length > 0 ? "&" : "?"}filter=`;

      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        linkFilter += `${filter.key}:${filter.operator}:${filter.value}`;
        if (i < filters.length - 1) {
          linkFilter += ",";
        }
      }
    }

    if (linkFilter.length > 0) {
      link += linkFilter;
    }

    //params
    let linkParams = "";
    if (params.length > 0) {
      linkParams = `${linkFilter.length || expandBy.length > 0 ? "&" : "?"}`;
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        linkParams += `${param.key}=${param.value}`;
        if (i < params.length - 1) {
          linkParams += "&";
        }
      }
    }

    if (linkParams.length > 0) {
      link += linkParams;
    }

    const response = await fetch(link);
    const data = await response.json();
    return data.data;
  }

  /**
   * Get base URL
   */
  static getBaseUrl() {
    return window.location.origin;
  }
}

export default API;
