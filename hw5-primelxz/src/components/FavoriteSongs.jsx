import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from './Song'

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    const isFavorite = (songId) => {
        if (favorites.some(song => song.id === songId)) {
            return true;
        } else {
            return false;
        }
    }

    const move = (favorite, songId) => {
        let removeSong = [];
            removeSong = favorites.filter(song => song.id !== songId);
            setFavorites(removeSong);
    }

    const genreTypes = favorites.reduce((allGenres, song) => {
        const currCount = allGenres[song.genre] ?? 0;
        return {
            ...allGenres,
            [song.genre]: currCount + 1,
        };
    }, {})
    const genreCount = Object.keys(genreTypes).length;

    const totalSeconds = favorites.reduce((accumulator, currentValue) => {
        const secondsSplit = currentValue.length.split(":");
        const seconds = parseInt(secondsSplit[0])*60+parseInt(secondsSplit[1]);
        const result = accumulator + seconds;
        return result;
    }, 0,)

    return <div>
        <h1>Favorites</h1>
        <p>You have favorited {favorites.length} songs in {genreCount} genres for a total of {totalSeconds} seconds of music!</p>
        <Container fluid>
            <Row>
                {
                    favorites.map(song => {
                        return <Col 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3} 
                            xl={2} 
                            key= {song.id}>
                                <Song 
                                    {...song}
                                    move={move}
                                    isFavorite={isFavorite}
                                />
                        </Col> 
                    })
                }
            </Row>
        </Container>
    </div>
}

export default FavoriteSongs;