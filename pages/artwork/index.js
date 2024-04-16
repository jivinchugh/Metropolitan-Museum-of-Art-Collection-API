import validObjectIDList from '@/public/data/validObjectIDList.json';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
const PER_PAGE = 12;

const Artwork = () => {
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const nextPage = () => {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (data) {
            if (data.objectIDs && data.objectIDs.length > 0) {
                let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
                let results = [];
                for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                    const chunk = filteredResults.slice(i, i + PER_PAGE);
                    results.push(chunk);
                }
                setArtworkList(results);
                setPage(1);
            } else {
                // No artwork found
                setArtworkList([]);
            }
        }
    }, [data, validObjectIDList]);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (artworkList === null) {
        // Loading state
        return <div>Loading...</div>;
    }

    return (
        <>
            {artworkList.length > 0 && (
                <Row className="gy-4">
                    {artworkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            )}
            {artworkList.length === 0 && (
                <Card>
                    <Card.Body>
                        <h4>No Artwork Found</h4>
                        Try refining your search criteria.
                    </Card.Body>
                </Card>
            )}
            {artworkList.length > 0 && (
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default Artwork;