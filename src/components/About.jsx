import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  imageButton: {
    cursor: 'pointer',
    maxWidth: '100%',
    maxHeight: '100%',
    border: 'none',
    background: 'none',
    backgroundColor: 'transparent',
    padding: 0,
  },
  image: {
    maxWidth: '70%',
    height: 'auto',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleImageClick = () => {
    if (data?.images && data.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <button
                      onClick={handleImageClick}
                      style={styles.image}
                      aria-label="Profile image"
                      type="button"
                    >
                      <img
                        src={data?.images?.[currentImageIndex]}
                        alt="profile"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </button>
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
