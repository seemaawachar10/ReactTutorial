import React from 'react';
import Aux from '../../../hoc/auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary =(props) =>{
    const ingredientSummary =Object.keys( props.ingredients)
    .map(igkey =>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
    });
    return(
<Aux>
    <h3>Your order</h3>
    <p>A delicious burger with the following ingredients</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p>Continue to checkout?</p>
    <p><strong>Total Price</strong>: {props.price.toFixed(2)}</p>
    <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
    <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
</Aux>
    );

}

export default orderSummary;