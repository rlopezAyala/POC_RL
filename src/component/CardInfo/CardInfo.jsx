import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardAvatar from "../Card/CardAvatar.js";
import CardBody from "../Card/CardBody.js";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../common/capitalizeFirstLetter";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

CardInfo.propTypes = {
    text: PropTypes.string,
    abilities: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  };
export default function CardInfo(props) {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>{capitalizeFirstLetter(props.name)}</h4>
            </CardHeader>
            <CardBody profile>
              <p className={classes.description} dangerouslySetInnerHTML={{ __html: props.text }}/>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="/" onClick={e => e.preventDefault()}>
                <img src={props.url} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Abilities</h4>
              <p className={classes.description} dangerouslySetInnerHTML={{ __html: props.abilities.abilities }}/>
              <h4 className={classes.cardTitle}>Moves</h4>
              <p className={classes.description} dangerouslySetInnerHTML={{ __html: props.abilities.moves }}/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
