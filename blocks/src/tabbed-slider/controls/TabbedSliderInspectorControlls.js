import { __ } from "@wordpress/i18n";

import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow } from "@wordpress/components";

import ColorPaletteControl from "../../controls/ColorPaletteControl";
import TabControls from "./TabControls";

const TabbedliderInspectorControls = (props) => {
  const { attributes, setAttributes } = props;

  // destruct attributes
  const { dataOne, dataTwo, dataThree, titleTextColor, categoriesTextColor } =
    attributes;

  const alltabs = [
    {
      tabTitle: __("Tab One", "north-commerce"),
      dataName: "dataOne",
      data: dataOne,
    },
    {
      tabTitle: __("Tab Two", "north-commerce"),
      dataName: "dataTwo",
      data: dataTwo,
    },
    {
      tabTitle: __("Tab Three", "north-commerce"),
      dataName: "dataThree",
      data: dataThree,
    },
  ];

  const onTabTitleChange = (tabTitle, dataName) => {
    setAttributes({ [dataName]: { ...attributes[dataName], tabTitle } });
  };
  const onCategoryChange = (category, dataName) => {
    setAttributes({ [dataName]: { ...attributes[dataName], category } });
  };

  //render tab controls
  const RenderTabsControls = () => {
    let panels = [];
    for (let i = 0; i < alltabs.length; i++) {
      let tab = alltabs[i];
      panels.push(
        <TabControls
          title={tab.tabTitle}
          data={tab.data}
          onTabTitleChange={(tabTitle) =>
            onTabTitleChange(tabTitle, tab.dataName)
          }
          onCategoryChange={(category) =>
            onCategoryChange(category, tab.dataName)
          }
          key={tab.dataName}
        ></TabControls>
      );
    }
    return panels;
  };

  return (
    <InspectorControls>
      {RenderTabsControls()}
      <PanelBody title="General Settings">
        <PanelRow>
          <ColorPaletteControl
            color={titleTextColor}
            onChangeColor={(titleTextColor) =>
              setAttributes({ titleTextColor })
            }
            label={__("Title text color", "north-commerce")}
          ></ColorPaletteControl>
        </PanelRow>
        <PanelRow>
          <ColorPaletteControl
            color={categoriesTextColor}
            onChangeColor={(categoriesTextColor) =>
              setAttributes({ categoriesTextColor })
            }
            label={__("Category text color", "north-commerce")}
          ></ColorPaletteControl>
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  );
};

export default TabbedliderInspectorControls;
