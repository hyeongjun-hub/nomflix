import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  padding: 10px 20px;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  text-align: center;
  font-size: 28px;
  width: 25%;
  border-bottom: 1px solid white;
  margin-right: 10px;
`;

const Btn = styled.button`
  all: unset;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3498db;
  font-size: 17px;
  opacity: 0.9;
  height: 3em;
  width: 4rem;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    background: #3498db;
    opacity: 0.3;
  }
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm,
}) => (
  <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies or TV Shows.."
        value={searchTerm}
        onChange={updateTerm}
      />
      <Btn>
        <FaSearch></FaSearch>
      </Btn>
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={
                  movie &&
                  movie.length > 0 &&
                  movie.release_date.substring(0, 4)
                }
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV show Results">
            {tvResults.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_title}
                rating={show.vote_average}
                year={
                  show && show.length > 0 && show.first_air_date.substring(0, 4)
                }
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message text="Nothing found" color="#95a5a6" />
          )}
      </>
    )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
