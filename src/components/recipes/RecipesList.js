import React, { useEffect, useState } from "react"
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import classnames from "classnames"
import Settings from "../repositories/Settings"
import { RecipeCard } from "./RecipeCard"



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
                {localStorage.getItem("drink_token") != null ?
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
                                        (recipe.userId === parseInt(localStorage.getItem("drink_token")) ?

                                            <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
                                            : ""
                                        )))}
                                </ul>
                            </TabPane>

                        </TabContent>
                    </>
                    : 
                    //tabs don't show if no user
                    <>
                    <ul className="cardList">
                        {recipes.map(
                            (recipe =>
                                <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />                           
                            ))}
                    </ul>
                    </>}
            </>
        )

    }


    return (
        <>
            {recipeTabs()}
        </>

    )

}
