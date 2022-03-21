import React, { useEffect, useState } from "react"
import { ToggleButton } from "react-bootstrap"
// import { Tab, Tabs } from "react-bootstrap"
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import classnames from "classnames"
import Settings from "../repositories/Settings"
import { RecipeCard } from "./RecipeCard"
// import "./RecipeCard.css"


//exports list of ALL recipes
export const RecipeList = (props) => {

    const [activeTab, setActiveTab] = useState('1')
    const [recipes, setRecipes] = useState([])
    //fetches all recipes
    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes`)
                .then(res => res.json())
                .then((data) => {
                    setRecipes(data)
                })
        }, []
    )

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    const recipeTabs = () => {

        return (
            <>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => toggle("1")}>
                            All Recipes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => toggle("2")}>
                            User Recipes
                        </NavLink>
                    </NavItem>

                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId={"1"}>
                        <ul className="cardList">
                            {recipes.map(
                                (recipe =>
                                    <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
                                ))}
                        </ul>
                    </TabPane>
                    <TabPane tabId={"2"}>
                    <ul className="cardList">
                            {recipes.map(
                                (recipe =>
                                    (recipe.userId === parseInt(localStorage.getItem("drink_token"))?

                                        <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
                                :""
                                )))}
                        </ul>
                    </TabPane>

                </TabContent>
            </>
        )

        //(<>
        //         <Tabs
        //             id="recipe-page-tabs"
        //             activeKey={key}
        //             onSelect={(k) => setKey(k)}
        //             className="mb-3"
        //         >
        //             <Tab eventKey="AllRecipes" title="All Recipes">
        //                 <ul className="cardList">
        //                     {recipes.map(
        //                         (recipe =>
        //                             <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
        //                         ))}
        //                 </ul>
        //             </Tab>
        //             <Tab eventKey="UserRecipes" title="User Recipes">
                       
        //             </Tab>

        // </Tabs>
        //             </>)
    }

    //iterates through all recipes and runs them through the RecipeCard function
    return (
        <>
            {recipeTabs()}
        </>

    )

}
