import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPokemonCardsAsync, getPokemonDataAsync, getPokemonFormInfo } from "../../actions/pokemon_cards";
import ListItemComponent from "../../component/ListItem/ListItem";
import Loader from "../../component/Loader/Loader";
import CardInfo from "../../component/CardInfo/CardInfo";
import ShortMenu from "../../component/ShortMenu/ShortMenu";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import "./Pokemon.css";
import classNames from "classnames";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#404854",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

Pokemon.propTypes = {
    pokemon_cards: PropTypes.object,
    pokemon_data: PropTypes.object,
    pokemon_form: PropTypes.object,
};
function Pokemon(props) {  
  const classes = useStyles();
    const [showLoader, setShowLoader] = useState(true);
    const [expandedText, setExpandedText] = useState(true);
    
    useEffect(() => {
        const {dispatch} = props;
        dispatch(getPokemonCardsAsync());
    }, []);

  function setOpenInfo(url){
    const {dispatch} = props;
    dispatch(getPokemonDataAsync(url));
  }

  function closeFunction(url){
    const {dispatch} = props;
    dispatch(getPokemonDataAsync(url));
  }


  const prevPokemon_data = useRef(props.pokemon_data);
  useEffect(() => {
    const { pokemon_data, dispatch } = props;
    if(pokemon_data.data && prevPokemon_data.current.data !== pokemon_data.data){
      if(pokemon_data && pokemon_data.isError){
      }else{
        const forms = pokemon_data.data && pokemon_data.data.species.url;
        forms && dispatch(getPokemonFormInfo(forms));

      }
    }
    }, [props.pokemon_data]);
    
	const prevPokemon_cards = useRef(props.pokemon_cards);
    useEffect(() => {
      const { pokemon_cards} = props;
      if (pokemon_cards.data && prevPokemon_cards.current.data !== pokemon_cards.data) {
                setShowLoader(false);
      }
    }, [ props.pokemon_cards]);
      
    const prevPokemon_form = useRef(props.pokemon_form);
    useEffect(() => {
      const { pokemon_form} = props;
      if(pokemon_form.data && prevPokemon_form.current.data !== pokemon_form.data){
        if(pokemon_form && !pokemon_form.isError){
          let text= "";

          pokemon_form && pokemon_form.data && pokemon_form.data.flavor_text_entries && 
          pokemon_form.data.flavor_text_entries.map((item)=>{
            if(item.language.name === "en"){
              text+=`<li key=${item}>${item.version.name}: ${item.flavor_text}<br></li>`;
            }
          }) 

          setExpandedText(text);
        }
      }
    }, [ props.pokemon_form]);

    function renderCards(){
        const { pokemon_cards } = props;

        const listWrapper = classNames(
          classes.root,
          classes.itemCategory,
          "root",
        )

        return <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={listWrapper}
              >
              <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
                Gotta cath'em All
              </ListItem>
                { pokemon_cards && pokemon_cards.data && pokemon_cards.data.results && renderListItemComponent(pokemon_cards.data.results) }
              </List>
    }

    
    const matches = useMediaQuery('(max-width:600px)');
    function renderListItemComponent(data){
      if(matches){
        return <ShortMenu
                  options={ data }
                  closeFunction={(e)=>closeFunction(e)}
                />
      }else{
        return  data.map((item, key)=>{
                  return <ListItemComponent 
                  setOpenInfo={(e)=>setOpenInfo(e)}
                  key={key}
                  name={item.name}
                  url={item.url}
                />
                })
      }
    }

    function renderData(){
      const {pokemon_data} = props;
      return pokemon_data && pokemon_data.data ? renderFullData(pokemon_data.data) : renderImageDefault()
    }

    function renderFullData(){
      const {pokemon_data, pokemon_form} = props;
      return <div className={"cardWrapper"}>
        {pokemon_data && pokemon_data.data && pokemon_form.data &&<CardInfo text={expandedText} name={pokemon_form.data.name} url={pokemon_data.data.sprites.front_default}/>}
      </div>
    }
    
    function renderImageDefault(){
      return  <div>
        <img className={"imageStyle"} src="https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-gotta-catch-em-all-pokemon-logos-pinterest-pokemon-1600.png"/>
      </div>
    }

    return !showLoader ? (<div className={"wrapper"}>
        {renderCards()}
        {renderData()}
    </div>):<Loader/>
}

export default connect(state => {
  return {
    pokemon_cards: state.pokemon_cards.get('pokemon_cards'),
    pokemon_data: state.pokemon_cards.get('pokemon_data'),
    pokemon_form: state.pokemon_cards.get('pokemon_form'),
  };
}, null)(Pokemon);
