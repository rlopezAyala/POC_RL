import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import PropTypes from "prop-types";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
        color: '#4fc3f7',
     backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

NestedList.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    key: PropTypes.number,
    setOpenInfo:PropTypes.func
};
export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick(e){
    //e.target;
    setOpen(!open);
    props.setOpenInfo(props.url);
  }

  const listItemStyle=classNames(
      classes.item, 
      classes.itemCategory, 
     {[classes.itemActiveItem]:open}
  )
      
  return (<div>
      <ListItem 
        className={listItemStyle}
        button onClick={(e)=>handleClick(e)}>
        <ListItemText primary={props.name} />
        {open ? <ChevronLeft /> : <ChevronRight />}
      </ListItem>
      </div>
  );
}