import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const LoginView = () => {
  const [loading, setLoading] = useState(false);

  const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    setLoading(true);
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then((res) => console.log(res))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-3">
          <button className="btn btn-default" onClick={signInGoogle}>
            <i className="fa fa-google" />{' '}
            {loading ? 'Loading...' : 'Sign in using Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
