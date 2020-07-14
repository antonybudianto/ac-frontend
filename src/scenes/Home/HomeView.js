import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import { useUser } from '../../context/auth';

const db = firebase.firestore();

const HomeView = (p) => {
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [islandName, setIslandName] = useState('');
  const [islandFruit, setIslandFruit] = useState('');
  const { user } = useUser();
  const [userDb, setUserDb] = useState({});
  const [cover, setCover] = useState('');
  const { uid } = user;

  useEffect(() => {
    if (!uploadLoading) {
      setLoading(true);
    }
    db.collection('users')
      .doc(uid)
      .get()
      .then((res) => {
        const data = res.data();
        setUserDb(data);
        setLoading(false);

        const storageRef = firebase.storage().ref();
        const userCoverRef = storageRef.child(
          `islands/${data.islandId}/cover.jpg`
        );
        userCoverRef.getDownloadURL().then((url) => {
          setCover(url);
        });
      });
  }, [uid, uploadLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('islands')
      .doc(islandName)
      .set({
        fruit: islandFruit,
        name: islandName,
        owner: uid,
      })
      .then((ref) => {
        db.collection('users').doc(uid).update({
          islandId: islandName,
        });

        alert('Island created successfully!');
        window.location.reload();
      });

    setSubmitLoading(true);
  };

  const handleChange = (e) => {
    setUploadLoading(true);
    const storageRef = firebase.storage().ref();
    const userCoverRef = storageRef.child(
      `islands/${userDb.islandId}/cover.jpg`
    );
    userCoverRef
      .put(e.target.files[0])
      .then((res) => {
        alert('Upload success!');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-3">
          <h1>Welcome, {user.displayName}</h1>
          {loading ? (
            <div>loading...</div>
          ) : (
            <>
              {userDb.islandId ? (
                <div className="mt-3">
                  <h3>Upload cover</h3>
                  <input
                    disabled={loading}
                    type="file"
                    onChange={handleChange}
                  />
                  {uploadLoading ? 'Uploading...' : ''}
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
                  <div className="mt-5">
                    <Link to={`/island/${userDb.islandId}`}>
                      Visit island page
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <h3>Create island</h3>
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        value={islandName}
                        onChange={(e) => setIslandName(e.target.value)}
                        placeholder="Your island name"
                      />
                      <input
                        className="form-control"
                        type="text"
                        value={islandFruit}
                        onChange={(e) => setIslandFruit(e.target.value)}
                        placeholder="Your native fruit"
                      />
                      <button
                        disabled={submitLoading}
                        type="submit"
                        className="mt-2 btn btn-primary"
                      >
                        {submitLoading ? 'Creating...' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
