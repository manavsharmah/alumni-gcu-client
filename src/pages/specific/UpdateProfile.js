import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import api from "../../services/api"

const UpdateProfile = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    branch: '',
  });
  const [formData, setFormData] = useState({
    biography: '',
    currentWorkingPlace: '',
    linkedin: '',
    facebook: '',
  });

  const { biography, currentWorkingPlace, linkedin, facebook } = formData;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get('http://localhost:5000/api/user/user');
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          batch: user.batch,
          branch: user.branch,
        });
        setFormData({
          biography: user.biography || '',
          currentWorkingPlace: user.currentWorkingPlace || '',
          linkedin: user.socialLinks?.linkedin || '',
          facebook: user.socialLinks?.facebook || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOAuth = async (platform) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`http://localhost:5000/api/auth/${platform}-oauth`);
      console.log(`Connecting ${platform} account`, response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error connecting ${platform} account:`, error);
      setLoading(false);
      setMessage(`Error connecting ${platform} account.`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put('http://localhost:5000/api/auth/update-profile', {
        biography,
        currentWorkingPlace,
        socialLinks: { linkedin, facebook },
      });
      setMessage('Profile Updated!');
      setLoading(false);
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Updating Profile');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center"> 
      <Card style={{ width: '80%' }}>
        <Card.Header as="h2" className="text-center">
          Update Profile
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {/* User Data Section */}
              <Row className="mb-4">
                <Col xs={12} md={6}>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                </Col>
                <Col xs={12} md={6}>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                  <p><strong>Batch:</strong> {userData.batch}</p>
                  <p><strong>Branch:</strong> {userData.branch}</p>
                </Col>
              </Row>

              {/* Update Form */}
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBiography" className="mb-3">
                  <Form.Label>Biography:</Form.Label>
                  <Form.Control as="textarea" name="biography" value={biography} onChange={onChange} />
                </Form.Group>

                <Form.Group controlId="formCurrentWorkingPlace" className="mb-3">
                  <Form.Label>Current Working Place:</Form.Label>
                  <Form.Control type="text" name="currentWorkingPlace" value={currentWorkingPlace} onChange={onChange} />
                </Form.Group>

                <Form.Group controlId="formLinkedin" className="mb-3">
                  <Form.Label>
                    <FaLinkedin size={24} className="mr-2" /> LinkedIn:
                  </Form.Label>
                  <Button variant="primary" onClick={() => handleOAuth('linkedin')}>
                    Connect LinkedIn
                  </Button>
                </Form.Group>

                <Form.Group controlId="formFacebook" className="mb-3">
                  <Form.Label>
                    <FaFacebook size={24} className="mr-2" /> Facebook:
                  </Form.Label>
                  <Button variant="primary" onClick={() => handleOAuth('facebook')}>
                    Connect Facebook
                  </Button>
                </Form.Group>
                
                <div className="d-grid"> {/* Center the button */}
                  <Button variant="success" type="submit">
                    Update Profile
                  </Button>
                </div>
              </Form>

              {/* Message Alert */}
              {message && (
                <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>
                  {message}
                </Alert>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProfile;
