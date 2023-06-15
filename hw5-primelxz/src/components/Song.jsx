import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

//reference: https://reactgo.com/react-change-button-text-onclick/

const Song = (props) => {
const [favorite, setFavorite] = useState();

useEffect(() => {
    const isFavor = props.isFavorite(props.id);
    if (isFavor) {
        setFavorite(true);
    } else {
        setFavorite(false);
    }
}, [])

const handleClick = () => {
    setFavorite(!favorite);
    props.move(favorite, props.id);
};

    return <Card>
        <img width="100%" height="auto" src={props.img} alt={props.title}/>
        <h5 style={{fontSize: "1.2rem"}}>{props.title}</h5>
        <h6 style={{fontSize: "1rem"}}>by {props.artist}</h6>
        <p>{props.genre} | {props.year} | {props.length}</p>
        <Button 
            onClick={handleClick} 
            style={{background : favorite ? "#e03848" : "#2d66ee",
                    fontSize: "0.97rem"}}>
            { favorite ? "Remove from Favorites" : "Add to Favorites"}</Button>
    </Card>
}

export default Song;