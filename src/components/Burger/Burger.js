import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger =(props) =>{
    var transformedIngredients = Object.keys(props.ingredients)
    .map(igkey =>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
           return <BurgerIngredient key={igkey+i} type={igkey} />
        });
    })
    .reduce((arr,el) =>{
        return arr.concat(el)
    },[]);

    if(transformedIngredients.length ===0){
        transformedIngredients =<p>Please start ingredients</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
    }

export default burger;