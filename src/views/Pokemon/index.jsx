import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPokemonCardsAsync } from "../../actions/pokemon_cards"
import ListItem from "../../component/ListItem/ListItem"
import Loader from "../../component/Loader/Loader"
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import styles from "./Pokemon.scss";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

Pokemon.propTypes = {
    pokemon_cards: PropTypes.object,
};
function Pokemon(props) {  
  const classes = useStyles();
    const [showLoader, setShowLoader] = useState(true);
    
    useEffect(() => {
        const {dispatch} = props;
        dispatch(getPokemonCardsAsync());
    }, []);

    
	const prevPokemon_cards = useRef(props.pokemon_cards);
    useEffect(() => {
      const { pokemon_cards } = props;
      if (pokemon_cards.data && prevPokemon_cards.data !== pokemon_cards.data) {
                setShowLoader(false);
              if(pokemon_cards && pokemon_cards.isError){
              }
      }
      }, [props.pokemon_cards]);

    function renderCards(){
        const { pokemon_cards } = props;

        const listWrapper = classNames(
          classes.root,
          styles.listBorder
        )
        return <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Go cath'em All
                  </ListSubheader>
                }
                className={listWrapper}
              >
              { pokemon_cards && pokemon_cards.data && pokemon_cards.data.results && pokemon_cards.data.results.map(item=>{
                      return <ListItem 
                      name={item.name}
                      url={item.url}
                  />
                  })}
                  </List>
    }
    
    return !showLoader ? (<div>
        {renderCards()}
    </div>):<Loader/>
}

export default connect(state => {
  return {
    pokemon_cards: state.pokemon_cards.get('pokemon_cards'),
  };
}, null)(Pokemon);
