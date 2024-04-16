import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites,removeFromFavourites } from '@/lib/userData';

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
};

const ArtworkDetailCard = ({ objectID }) => {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID));
    }, [favouritesList, objectID]);

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const { primaryImage, artistDisplayName, creditLine, dimensions, artistWikidata_URL, medium } = data;

    const favouritesClicked = async () => {
        try {
            if (showAdded) {
                await removeFromFavourites(objectID);
                setFavouritesList(current => current.filter(fav => fav !== objectID));
            } else {
                await addToFavourites(objectID);
                setFavouritesList(current => [...current, objectID]);
            }
        } catch (error) {
            console.error('Error updating favourites:', error);
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            <Card.Body>
                <Card.Title>{artistDisplayName || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Medium:</strong> {medium || 'N/A'}<br />
                    <br />
                    {artistDisplayName && (
                        <>
                            <strong>Artist Wikidata:</strong>{' '}
                            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                                wiki
                            </a>
                            <br />
                        </>
                    )}
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}<br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">{objectID}</Button>
                </Link>
                <br />
                <Button 
                    variant={showAdded ? 'primary' : 'outline-primary'} 
                    onClick={favouritesClicked}
                    className="mt-3"
                >
                    {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ArtworkDetailCard;