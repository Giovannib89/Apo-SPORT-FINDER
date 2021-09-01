/* eslint-disable no-plusplus */
// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './single.scss';
import Review from 'src/containers/Review';
import ModalAddReview from 'src/containers/ModalAddReview';
import ModalUpdateReview from 'src/containers/ModalUpdateReview';
import ModalDeleteReview from 'src/containers/ModalDeleteReview';
import ModalSignIn from 'src/containers/ModalSignIn';
import ModalSignUp from 'src/containers/ModalSignUp';
import sportsData from 'src/assets/sportsData';

const Single = ({
  result,
  sport,
  onClickModalAddReview,
  openAddReview,
  allReviews,
  openUpdateReview,
  openDeleteReview,
  getSingleAssociationName,
  getSingleAssociationKey,
  history,
  logged,
  openLogIn,
  openLogUp,
}) => {
  const image = sportsData.find((sportData) => (
    sportData.name.toLowerCase() === sport.toLowerCase()
  ));
  const handleModalAddReview = () => {
    onClickModalAddReview();
    getSingleAssociationName(result.titre);
    getSingleAssociationKey(result.id);
    // console.log('id:', result.id, 'titre:', result.titre);
  };
  const reviewFilter = allReviews.filter(
    (review) => review.association.key_association.includes(result.id),
  );
  // const tabStar = [];

  // const pushStar = () => {
  //   for (let index = 0; index < reviewFilter.length; index++) {
  //     tabStar.push(reviewFilter[index].star);
  //   }
  // };
  // pushStar();

  // let sum = 0;
  // for (let index = 0; index < tabStar.length; index++) {
  //   sum += tabStar[index];
  // }
  // console.log('sum', sum);
  // const avg = sum / tabStar.length;
  // console.log(Math.round(avg));
  // const roundAvg = Math.round(avg);
  // console.log('tabStar', tabStar);

  // console.log('result', result);
  console.log('reviewFilter:', reviewFilter);
  return (
    <div className="single">
      <div className="single__infos">
        <div className="single__infos__header">
          <div
            className="single__infos__header__picture"
            style={{ backgroundImage: `url(${image.image})` }}
          >
            <h1 className="single__infos__header__picture__title">{sport.toUpperCase()}</h1>
          </div>
        </div>
        <div className="single__infos__content">
          <p className="single__infos__content__name">{result.titre}</p>
          <p className="single__infos__content__desc">Pour toute demande de renseignements complémentaires, n'hésitez pas à visiter le site web de l'association sportive ou rapprochez vous de la maire de <span className="single__infos__content__desc__city">{result.adresse_libelle_commune}</span>.</p>
          <div className="single__infos__content__association">
            <div className="single__infos__content__association__properties">
              <p className="single__infos__content__association__properties__adress">Adresse postale:</p>
              <p className="single__infos__content__association__properties__web">Site web:</p>
              <p className="single__infos__content__association__properties__object">Description:</p>
            </div>
            <div className="single__infos__content__association__values">
              <p className="single__infos__content__association__values__adress">{result.adresse_numero_voie} {result.adresse_repetition} {result.adresse_type_voie} {result.adresse_libelle_voie} {result.adresse_code_postal} {result.adresse_libelle_commune}</p>
              <p className="single__infos__content__association__values__web"> {result.site_web ? result.site_web : '-'}</p>
              <p className="single__infos__content__association__values__object">{result.objet}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="single__buttons">
        <button
          type="button"
          className="single__buttons__back"
          onClick={() => history.push('/results')}
        >
          Retour aux résultats
        </button>
        {logged && (
          <button
            type="button"
            className="single__buttons__addReview"
            onClick={handleModalAddReview}
          >
            Ajouter un avis
          </button>
        )}
      </div>
      <div className="single__reviews">
        {reviewFilter.map((reviewResult) => (
          <Review
            key={reviewResult.id}
            {...reviewResult}
          />
        ))}
      </div>
      { openAddReview && <ModalAddReview /> }
      { openUpdateReview && <ModalUpdateReview /> }
      { openDeleteReview && <ModalDeleteReview /> }
      { openLogIn && <ModalSignIn />}
      { openLogUp && <ModalSignUp />}
    </div>
  );
};

Single.propTypes = {
  result: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired,
  onClickModalAddReview: PropTypes.func.isRequired,
  openAddReview: PropTypes.bool.isRequired,
  allReviews: PropTypes.array.isRequired,
  openUpdateReview: PropTypes.bool.isRequired,
  openDeleteReview: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  getSingleAssociationName: PropTypes.func.isRequired,
  getSingleAssociationKey: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  openLogIn: PropTypes.bool.isRequired,
  openLogUp: PropTypes.bool.isRequired,
};

export default Single;
