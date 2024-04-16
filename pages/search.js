import { Form, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai'; // Import useAtom hook
import { searchHistoryAtom } from '../store'; // Import searchHistoryAtom
import { addToHistory } from '@/lib/userData';

const AdvancedSearch = () => {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Get searchHistory and setSearchHistory from the atom

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function submitForm(data) {
        let queryString = '';
        queryString += `${data.searchBy || 'title'}=true`;
        queryString += data.geoLocation ? `&geoLocation=${data.geoLocation}` : '';
        queryString += data.medium ? `&medium=${data.medium}` : '';
        queryString += `&isOnView=${data.isOnView || false}`;
        queryString += `&isHighlight=${data.isHighlight || false}`;
        queryString += data.q ? `&q=${data.q}` : '';
        setSearchHistory(current => [...current, queryString]); // Add the queryString to searchHistory
        router.push(`/artwork?${queryString}`);
        setSearchHistory(await addToHistory(queryString));
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control type="text" placeholder="" name="q" {...register("q", { required: true })} className={errors.q ? 'is-invalid' : ''} />
                        {errors.q && <div className="invalid-feedback">This field is required.</div>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" placeholder="" name="medium" {...register("medium")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check type="checkbox" label="Highlighted" name="isHighlight" {...register("isHighlight")} />
                    <Form.Check type="checkbox" label="Currently on View" name="isOnView" {...register("isOnView")} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AdvancedSearch;
