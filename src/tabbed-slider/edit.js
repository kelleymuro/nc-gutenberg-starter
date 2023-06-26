import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, PanelRow } from "@wordpress/components";

import "./editor.scss";

import { useState, useEffect } from "react";
import API from "../api";
import { useImmer } from "use-immer";
import TabControls from "./controls/TabControls";
import ColorPaletteControl from "../controls/ColorPaletteControl";
import TabbedliderInspectorControls from "./controls/TabbedSliderInspectorControlls";

export default function Edit(props) {
  const { attributes, setAttributes } = props;

  // destruct attributes
  const { dataOne, dataTwo, dataThree, titleTextColor, categoriesTextColor } =
    attributes;

  //state variable
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useImmer({
    tabOne: {
      isLoading: false,
      isError: false,
      currentCategory: null,
      data: [],
    },
    tabTwo: {
      isLoading: false,
      isError: false,
      currentCategory: null,
      data: [],
    },
    tabThree: {
      isLoading: false,
      isError: false,
      currentCategory: null,
      data: [],
    },
  });

  useEffect(() => {
    checkProducts();
  }, [dataOne.category, dataTwo.category, dataThree.category]);

  const checkProducts = async () => {
    let cat1 = dataOne.category;
    let cat2 = dataTwo.category;
    let cat3 = dataThree.category;

    const tabsToUpdate = [];

    if (cat1 !== products.tabOne.currentCategory) {
      tabsToUpdate.push({
        tabName: "tabOne",
        to: cat1,
      });
    }

    if (cat2 !== products.tabTwo.currentCategory) {
      tabsToUpdate.push({
        tabName: "tabTwo",
        to: cat2,
      });
    }

    if (cat3 !== products.tabThree.currentCategory) {
      tabsToUpdate.push({
        tabName: "tabThree",
        to: cat3,
      });
    }

    if (tabsToUpdate.length > 0) {
      for (const tabToUpdate of tabsToUpdate) {
        await fetchProducts(tabToUpdate);
        setTabCategory(tabToUpdate.tabName, tabToUpdate.to);
      }
    }
  };
  const setTabLoding = (tabName, isLoading) => {
    setProducts((draft) => {
      draft[tabName].isLoading = isLoading;
    });
  };
  const setTabError = (tabName, isError) => {
    setProducts((draft) => {
      draft[tabName].isError = isError;
    });
  };
  const setTabData = (tabName, data) => {
    setProducts((draft) => {
      draft[tabName].data = data;
    });
  };
  const setTabCategory = (tabName, category) => {
    setProducts((draft) => {
      draft[tabName].currentCategory = category;
    });
  };

  const fetchProducts = async (category) => {
    let filter = [];
    if (category.to !== "__all__") {
      filter = [
        {
          key: "product_categories.category_id",
          value: category.to,
          operator: "equal",
        },
      ];
    }

    const params = [
      {
        key: "limit",
        value: "3",
      },
    ];

    try {
      setTabLoding(category.tabName, true);
      setTabError(category.tabName, false);
      const products = await API.getProducts(filter, null, params);
      setTabData(category.tabName, products);
    } catch (e) {
      console.error(e);
      setTabError(category.tabName, true);
    } finally {
      setTabLoding(category.tabName, false);
    }
  };

  //set correct class if tab active
  const getTabActiveClass = (index) => {
    if (index === activeTab) {
      return "active";
    }
  };

  //render products
  const RenderProducts = (tab) => {
    let products = [];
    for (let i = 0; i < tab.data.length; i++) {
      let product = tab.data[i];
      products.push(<RenderProduct product={product} key={product.id} />);
    }
    return products;
  };

  //render product
  const RenderProduct = ({ product }) => {
    let categoryList = [];
    const pCategories = product.product_categories;
    for (const category of pCategories) {
      categoryList.push(category.category.name);
    }
    const categories = categoryList.join(", ");

    return (
      <div className="col-md-4">
        <div className="tab-item">
          <div className="tab-fav">
            {RenderProductImage(product)}
            <div className="tab-inner">
              <ul>
                <li>
                  <a href="#">{__("Add to basket", "north-commerce")}</a>
                </li>
                <li>
                  <a href="#">{__("View Product", "north-commerce")}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-cnt">
            <h4 style={{ color: titleTextColor }}>{product.name}</h4>
            <p style={{ color: categoriesTextColor }}>{categories}</p>
          </div>
        </div>
      </div>
    );
  };

  const RenderProductImage = (product) => {
    if (product?.product_images?.length > 0) {
      return <img src={product?.product_images[0]?.image_url} />;
    }
    return <img src="#" />;
  };

  return (
    <>
      <TabbedliderInspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <section
        {...useBlockProps({ className: "tab-area" })}
        data-tabbed-slider-block
      >
        <div className="nc-tab-container">
          <div className="tab-main">
            <div className="tabs">
              <ul className="tab-links">
                <li
                  className={getTabActiveClass(0)}
                  onClick={() => setActiveTab(0)}
                >
                  <a>{dataOne.tabTitle}</a>
                </li>
                <li
                  className={getTabActiveClass(1)}
                  onClick={() => setActiveTab(1)}
                >
                  <a>{dataTwo.tabTitle}</a>
                </li>
                <li
                  className={getTabActiveClass(2)}
                  onClick={() => setActiveTab(2)}
                >
                  <a>{dataThree.tabTitle}</a>
                </li>
              </ul>

              <div className="tab-content">
                <div className={"tab " + getTabActiveClass(0)}>
                  <div>
                    <div className="tab-part">
                      <div className="nc-tab-row">
                        {RenderProducts(products.tabOne)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={"tab " + getTabActiveClass(1)}>
                  <div>
                    <div className="tab-part">
                      <div className="nc-tab-row">
                        {RenderProducts(products.tabTwo)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={"tab " + getTabActiveClass(2)}>
                  <div>
                    <div className="tab-part">
                      <div className="nc-tab-row">
                        {RenderProducts(products.tabThree)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
