// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRatingStatic from 'src/containers/StarRatingStatic';
import ModalSignIn from 'src/containers/ModalSignIn';
import ModalSignUp from 'src/containers/ModalSignUp';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
// import Marker from 'react-leaflet-animated-marker';
// == Import : local
import Banner from 'src/components/Banner';
import Loading from 'src/components/Loading';
import './results.scss';

// == Component
const Results = ({
  results,
  sport,
  city,
  onClickNewSearch,
  cityCenterLat,
  cityCenterLng,
  buildMap,
  markers,
  getAllReviews,
  isNoResult,
  onBuildMap,
  openLogIn,
  openLogUp,
}) => {
  // console.log('cityCenterLat', cityCenterLat);
  const position = [cityCenterLat, cityCenterLng];
  // console.log('position',position);
  const icons = markers.map((marker) => (
    <Marker
      key={marker[2]}
      position={[marker[1][1], marker[1][0]]}
    >
      <Popup>
        {marker[0]}
      </Popup>
    </Marker>
  ));

  const handleGetAllReviews = () => {
    getAllReviews();
  };
  const handleNewSearch = () => {
    onClickNewSearch();
  };
  // console.log('result.length', results.length);
  // const time = results.length * 150;
  // console.log('time', time);
  useEffect(() => {
    const timer = setTimeout(() => {
      onBuildMap();
    }, 2000);
    return () => clearTimeout(timer);
  }, [markers]);
  return (
    <div className="results">
      <Banner />
      {/* <div className="results__searchform">
        <SearchForm />
      </div> */}
      <Link
        className="results__newSearch"
        onClick={handleNewSearch}
        to="/"
      >
        Nouvelle recherche
      </Link>
      <div className="results__count">
        {isNoResult && <p className="results__count__desc">La recherche pour {sport} dans le département {city} n'a donné aucun résultat.</p>}
        {!isNoResult && <p className="results__count__desc">La recherche pour {sport} dans le département {city} a donné {results.length} résultats.</p>}
      </div>
      <div className="results__all">
        { buildMap && (
          <div className="results__all__list">
            {results.map((result) => (
              <div
                key={result.id}
                className="results__all__list__single"
              >
                <p className="results__all__list__single__name">
                  <Link
                    to={`/single/${result.id}`}
                    onClick={handleGetAllReviews}
                    {...result}
                  >
                    {result.titre}
                  </Link>
                </p>
                <p className="results__all__list__single__adress">
                  {result.adresse_numero_voie}
                  {result.adresse_repetition}
                  {result.adresse_type_voie}
                  {result.adresse_libelle_voie}
                  {result.adresse_code_postal}
                  {result.adresse_libelle_commune}
                </p>
                <div className="results__all__list__single__rating">
                  <StarRatingStatic
                    rating={1}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        { !buildMap && (<Loading />)}
        { buildMap && !isNoResult && (
          <MapContainer
            id="mapid"
            center={position}
            zoom={8}
            scrollWheelZoom
            maxZoom={20}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {icons}
          </MapContainer>
        )}
      </div>
      { openLogIn && <ModalSignIn />}
      { openLogUp && <ModalSignUp />}
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titre: PropTypes.string.isRequired,
      adresse_numero_voie: PropTypes.string,
      adresse_repetition: PropTypes.string,
      adresse_type_voie: PropTypes.string,
      adresse_libelle_voie: PropTypes.string,
      adresse_code_postal: PropTypes.string,
      adresse_libelle_commune: PropTypes.string,
    }),
  ).isRequired,
  cityCenterLat: PropTypes.number.isRequired,
  cityCenterLng: PropTypes.number.isRequired,
  buildMap: PropTypes.bool.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape,
  ).isRequired,
  getAllReviews: PropTypes.func.isRequired,
  sport: PropTypes.string.isRequired,
  city: PropTypes.number.isRequired,
  onClickNewSearch: PropTypes.func.isRequired,
  isNoResult: PropTypes.bool.isRequired,
  onBuildMap: PropTypes.func.isRequired,
  openLogIn: PropTypes.bool.isRequired,
  openLogUp: PropTypes.bool.isRequired,
};

export default Results;
