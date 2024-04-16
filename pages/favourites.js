import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

const Favourites = () => {
    const [favouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null; 
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {favouritesList.map((objectID, index) => (
                        <Col key={index}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Favourites;