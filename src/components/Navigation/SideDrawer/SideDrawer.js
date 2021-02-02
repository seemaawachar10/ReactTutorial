import React from 'react';
import Logo from '../../Logo/Logo';
import NvaigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxiliary';
const sideDrawer =(props) =>{
    let attachClasses=[classes.SideDrawer, classes.Close];
    if(props.open){
        attachClasses=[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachClasses.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NvaigationItems />
                </nav>
                
            </div>
        </Aux>
    );
}

export default sideDrawer;