import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import styles from '@/styles/History.module.css';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';

const History = () => {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    // Parse search history
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    // Function to navigate to the searched query
    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    // Function to remove an element from search history
    const removeHistoryClicked = (e, index) => {
        e.stopPropagation();
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1);
            return x;
        });
    };

    return (
        <Card>
            <Card.Body>
                {parsedHistory.length === 0 ? (
                    <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                ) : (
                    <ListGroup>
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)} action>
                                {Object.keys(historyItem).map(key => (
                                    <span key={key}>
                                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                    </span>
                                ))}
                                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
};

export default History;
