import { PanelBody, TextControl } from "@wordpress/components";
import CategorySelector from "../../controls/CategorySelector";

const TabControls = ({
  initialOpen = false,
  title,
  data,
  onTabTitleChange,
  onCategoryChange,
}) => {
  return (
    <PanelBody initialOpen={initialOpen} title={title}>
      <TextControl
        label="Tab title"
        value={data.tabTitle}
        onChange={(tabTitle) => onTabTitleChange(tabTitle)}
      />
      <CategorySelector
        category={data.category}
        onChangeCategory={(category) => onCategoryChange(category)}
      ></CategorySelector>
    </PanelBody>
  );
};

export default TabControls;
