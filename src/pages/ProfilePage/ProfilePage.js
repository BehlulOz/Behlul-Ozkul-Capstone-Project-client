import React from "react";
import "./ProfilePage.scss";
import linkedinBarcode from "../../assets/images/linkedin-barcode.png";
import gitBarcode from "../../assets/images/git-barcode.png";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <article className="profile-page__card">
      <button className="profile-page__card__button">
        LinkedIn
      </button>
        <img
          src={linkedinBarcode}
          className="profile-page__card__image"
        />
        <button className="profile-page__card__button">
        Github
        </button>
        <img
          src={gitBarcode}
          className="profile-page__card__image"
        />
      </article>
      <button className="profile-page__card__button thank-you">
        Thank You !
      </button>
    </div>

  );
};

export default ProfilePage;

{
  /* <h1 className='presentation__title'>LinkedIn: https://www.linkedin.com/in/behlulozkul/ github: https://github.com/BehlulOz</h1> */
}
