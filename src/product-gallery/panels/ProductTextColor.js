import { ColorPalette } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';



export default function ProductTextColor({ textColor, onChangeColor}) {
    return(
        <PanelBody title="Product Name Text Color">
                <ColorPalette 
                    value={ textColor }
                    onChange={ onChangeColor }
                />
        </PanelBody>
    )
}