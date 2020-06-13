import {Route, Switch} from "react-router-dom";
import React from "react"
import Pokemon from "./views/Pokemon/index"


function Routes(){
    return(
        <Switch>
           <Route path={"/"} component={Pokemon}/>
        </Switch>
    )
}

export default Routes;