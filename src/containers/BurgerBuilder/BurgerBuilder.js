
import React ,{Component} from 'react';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES ={
    salad:0.5,
    meat:1.3,
    cheese:0.4,
    bacon:0.7
}
class BurgerBuilder extends Component{
    // constructor(){
    //     super(props);
    // }
    state ={
        ingredients:null,
        totalPrice : 4,
        purchaseable: false,
        purchasing: false,
        Loading :false
    }

    purchaseHandler =()=> {
        this.setState({purchasing : true});
    }
    purchaseCancelledHandler =()=> {
        this.setState({purchasing : false});
    }
    purchaseContinueHandler =()=> {
        //this.setState({purchasing : false});
        //alert("order successful");
        this.setState( { loading: true } );
    //    const order ={
    //        ingredients:this.state.ingredients,
    //        price : this.state.totalPrice,
    //        customer:{
    //            name: 'Seema',
    //            address:{
    //                street:'Maan Road',
    //                zipcode:'1234',
    //                city:'Pune',
    //                country:'India'
    //            },
    //            email:'test@test.com'
    //        },
    //        deliveryMethod:'fastest'
    //    }
    //    axios.post('orders.json',order)
    //    .then( response => {
    //     this.setState( { loading: false, purchasing: false } );
    //     } )
    //     .catch( error => {
    //         this.setState( { loading: false, purchasing: false } );
    //     } );
        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+queryString
        });
    }
    updatePurchaseState(ingredients)
    {
       // const ingredients ={...this.state.ingredientsAdded};
        const sum =Object.keys(ingredients)
        .map(igkey =>{
            return ingredients[igkey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchaseable:sum>0});
    }
    addIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const newPrice = INGREDIENT_PRICES[type] + oldPrice;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0)
        return;
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice =oldPrice - INGREDIENT_PRICES[type] ;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    componentDidMount(){
        axios.get('https://react-my-burger-3d8ad-default-rtdb.firebaseio.com/ingredients.json')
        .then(resp =>{
            this.setState({ingredients:resp.data});

        });
    }
    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientsAdded ={this.addIngredientHandler} 
                        ingredientsRemoved ={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                {orderSummary}
                    </Modal>
                {/* <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientsAdded ={this.addIngredientHandler} 
                ingredientsRemoved ={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}/> */}
                {burger}
            </Aux>
        )
    }

}

export default BurgerBuilder;