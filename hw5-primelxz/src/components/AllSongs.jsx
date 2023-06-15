import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from './Song'

export default function AllSongs() {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        addSongs();
    }, [])

    function addSongs() {
        fetch("https://cs571.org/s23/hw5/api/songs", {
            headers: {
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSongs(data);
        })
    }

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    const isFavorite = (songId) => {
        if (favorites.some(song => song.id === songId)) {
            return true;
        } else {
            return false;
        }
    }

    const move = (favorite, songId) => {
        if (favorite === false) {
            const favorSong = songs.filter(song => song.id === songId)[0];
            setFavorites([...favorites, favorSong]);
        }

        if (favorite === true) {
            let removeSong = [];
            removeSong = favorites.filter(song => song.id !== songId);
            setFavorites(removeSong);
        }
    }

    function genreCount (currList) {
        const genreTypes = currList.reduce((allGenres, song) => {
            const currCount = allGenres[song.genre] ?? 0;
            return {
                ...allGenres,
                [song.genre]: currCount + 1,
            };
        }, {})
        const count = Object.keys(genreTypes).length;
        return count;
    }
    
    function totalSeconds (currList) {
        const seconds = currList.reduce((accumulator, currentValue) => {
            const secondsSplit = currentValue.length.split(":");
            const seconds = parseInt(secondsSplit[0])*60+parseInt(secondsSplit[1]);
            const result = accumulator + seconds;
            return result;
        }, 0,)
        return seconds;
    }

    return <div>
        <h1>Songs</h1>
        <p>We have {songs.length} songs in {genreCount(songs)} genres for a total of {totalSeconds(songs)} seconds of music!</p>
        <Container fluid>
            <Row>
                {
                    songs.map(song => {
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
};