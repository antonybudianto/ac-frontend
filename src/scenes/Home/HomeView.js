import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import { useUser } from '../../context/auth';

const HomeView = (p) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [cover, setCover] = useState('');
  const { uid } = user;

  useEffect(() => {
    const storageRef = firebase.storage().ref();
    const userCoverRef = storageRef.child(`user/${uid}/cover.jpg`);
    userCoverRef.getDownloadURL().then((url) => {
      console.log('tws');
      setCover(url);
    });
  }, [loading, uid]);

  const handleChange = (e) => {
    setLoading(true);
    const storageRef = firebase.storage().ref();
    const userCoverRef = storageRef.child(`user/${uid}/cover.jpg`);
    userCoverRef
      .put(e.target.files[0])
      .then((res) => {
        alert('Upload success!');
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-3">
          <h1>Welcome, {user.displayName}</h1>
          <div className="mt-3">
            <h3>Upload cover</h3>
            <input disabled={loading} type="file" onChange={handleChange} />
            {loading ? 'Uploading...' : ''}
            <div>
              {cover && (
                <img
                  src={cover}
                  alt="img"
                  style={{
                    width: '400px',
                    height: '200px',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
