import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    itemCategory: {
    },
  }));
ShortMenu.propTypes = {
    options: PropTypes.array,
    closeFunction:PropTypes.func
};
function ShortMenu(props) {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    setAnchorEl(null);
    if(url){
        props.closeFunction(url);
    }
  };

  return (
    <div  className={classes.itemCategory}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="primary"/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={()=>handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {props.options.map((option, key) => (
          <MenuItem key={key} selected={option === 'Pyxis'} onClick={()=>handleClose(option.url)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


export default ShortMenu;
  