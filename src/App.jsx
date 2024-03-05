import { useState } from 'react'
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const handleInput = (event) => {
    let value = event.target.value;
    setCity(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation(city);
  }
  const getLocation = async (city) => {
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city}&format=json`);
    if (!response.data || response.data.length === 0) {
      response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${city}&format=json`);
    }
    console.log(response);
    setResponseData(response.data[0]);
  }

  const handleNext = async (url) => {
    let response = await axios.get(url);
    setResponseData(response.data);
  }

  console.log(responseData);
  return (
    <Container>
      <header className="mt-5 mb-4">
        <h1>Search For a City</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="citySearch">
            <Form.Control type="text" placeholder="Enter a city name" onChange={handleInput} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </header>
      <Card className="mt-3">
        <Card.Body>
          {responseData.display_name
          ? (
            <>
              <Card.Title>{responseData.display_name}</Card.Title>
              <Card.Text>
                Latitude: {responseData.lat} / Longitude: {responseData.lon}
              </Card.Text>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=9`} />
            </>
          )
          : <Card.Text>No results found</Card.Text>
          }
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App