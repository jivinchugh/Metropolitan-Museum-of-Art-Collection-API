import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/userData';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { authenticateUser } from '@/lib/authenticate';
export default function Login() {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) { setWarning(err.message); }
  }
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          <p>Enter your login information below:</p>
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userName">
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        {warning && (
          <Alert variant='danger'>
            {warning}
          </Alert>
        )}
        <br></br>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  );
}