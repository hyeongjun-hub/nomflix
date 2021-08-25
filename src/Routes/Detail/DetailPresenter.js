import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  max-height: 100%;
  border-radius: 5px;
  min-width: 300px;
`;

const Data = styled.div`
  width: 70%;
  height: 99%;
  margin-left: 20px;
  min-width: 50rem;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 700;
`;

const ItemContatiner = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5; //위아래 여백
  width: 50%;
  margin-bottom: 30px;
  height: 10%;
`;

const BtnContainer = styled.div`
  margin-left: 15px;
  display: flex;
  height: 7%;
  margin-bottom: 30px;
`;

const ReviewBtn = styled.div`
  padding: 10px 5px;
  font-size: 13px;
  border: 1px #fff solid;
  border-radius: 3px;
  margin-right: 30px;
  width: 140px;
  text-align: center;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  cursor: pointer;
`;

const UnderConatiner = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.3);
  width: 30%;
  height: 60%;
  border-radius: 4px;
  max-height: 57%;
`;

const YtContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px 10px;
  min-height: 200px;
`;

const A = styled.a`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
`;

const YtTitle = styled.div`
  font-weight: 700;
`;

const Youtube = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 250px;
`;

const OtContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  flex-direction: column;
  justify-content: space-around;
`;

const Collections = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 87%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContatiner>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime >= 0
                ? result.runtime
                : result.episode_run_time[0]}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>⭐</Item>
            {result.adult ? <Divider>• 🔞</Divider> : ""}
          </ItemContatiner>
          <Overview>{result.overview}</Overview>
          <BtnContainer>
            <a
              href={`https://cinemaone.net/title/${result.imdb_id}?utm_source=pt&utm_medium=win&utm_campaign=skusat1`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ReviewBtn>Read Review</ReviewBtn>
            </a>
            <a target="_blank" href={result.homepage} rel="noopener noreferrer">
              <ReviewBtn>Go homepage</ReviewBtn>
            </a>
          </BtnContainer>
          <UnderConatiner>
            <YtContainer>
              <YtTitle>Youtube Trailer</YtTitle>
              <A
                target="_blank"
                rel="noopener noreferrer"
                href={
                  result.videos.results.length >= 1
                    ? `https://www.youtube.com/watch?v=${result.videos.results[0].key}`
                    : "https://www.youtube.com/"
                }
              >
                <Youtube
                  src={
                    result.videos.results.length >= 1
                      ? `https://img.youtube.com/vi/${result.videos.results[0].key}/hqdefault.jpg`
                      : require("../../assets/noPosterSmall.png").default
                  }
                  alt={result.id}
                />
              </A>
              <A
                target="_blank"
                rel="noopener noreferrer"
                href={
                  result.videos.results.length >= 2
                    ? `https://www.youtube.com/watch?v=${result.videos.results[1].key}`
                    : "https://www.youtube.com/"
                }
              >
                <Youtube
                  src={
                    result.videos.results.length >= 2
                      ? `https://img.youtube.com/vi/${result.videos.results[1].key}/hqdefault.jpg`
                      : require("../../assets/noPosterSmall.png").default
                  }
                  alt={result.id}
                />
              </A>
            </YtContainer>
          </UnderConatiner>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
