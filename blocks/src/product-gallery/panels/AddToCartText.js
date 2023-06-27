import { RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';


export default function AddToCartText({ addToCartText, onChangeText }) {
    return(
        <PanelBody title="Add To Cart Text">
            <RichText
                placeholder="Add to Cart"
                value={ addToCartText }
                onChange={ onChangeText }
            />
        </PanelBody>
    )
}