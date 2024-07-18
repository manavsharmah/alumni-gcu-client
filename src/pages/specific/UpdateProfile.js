import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

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
        const response = await axiosInstance.get('http://localhost:5000/api/auth/user');
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
      // Handle redirect or further actions for OAuth
      console.log(`Connecting ${platform} account`, response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error connecting ${platform} account:`, error);
      setLoading(false);
      // Optionally show an error message to the user
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
    <Container className="mt-5">
      <h2>Update Profile</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <strong>Name:</strong> {userData.name}
            </Col>
            <Col>
              <strong>Email:</strong> {userData.email}
            </Col>
            <Col>
              <strong>Phone:</strong> {userData.phone}
            </Col>
            <Col>
              <strong>Batch:</strong> {userData.batch}
            </Col>
            <Col>
              <strong>Branch:</strong> {userData.branch}
            </Col>
          </Row>
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
            <Button variant="success" type="submit">
              Update Profile
            </Button>
          </Form>
          {message && (
            <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>
              {message}
            </Alert>
          )}
        </>
      )}
    </Container>
  );
};

export default UpdateProfile;
