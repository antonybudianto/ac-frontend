import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

function CoverView({
  uid,
  userDb,
  loading,
  island,
  islandName,
  islandFruit,
  setIslandName,
  setIslandFruit,
}) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

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
        userCoverRef.getDownloadURL().then((url) => {
          db.collection('islands')
            .doc(userDb.islandId)
            .update({
              cover: url,
            })
            .then(() => {
              window.location.reload();
            })
            .catch(() => {
              alert('Error upload. Please try again later.');
            });
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  return (
    <div>
      <div>
        <Link to={`/island/${userDb.islandId}`}>Visit {island.name} page</Link>
      </div>
      {userDb.islandId ? (
        <div className="mt-3">
          {!uploadLoading && (
            <input disabled={loading} type="file" onChange={handleChange} />
          )}
          {uploadLoading ? 'Uploading...' : ''}
          <div>
            {island.cover && (
              <img
                src={island.cover}
                alt="img"
                style={{
                  width: '400px',
                  height: '200px',
                }}
              />
            )}
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
    </div>
  );
}

export default CoverView;
