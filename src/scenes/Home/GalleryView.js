import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

function GalleryView({ island, onSuccessUpload }) {
  const [loading, setLoading] = useState(false);
  const gallery = island.gallery || [0, 0, 0, 0, 0, 0];

  const handleUpload = (e, i) => {
    setLoading(true);
    const file = e.target.files[0];
    const newGallery = [...gallery];

    const storageRef = firebase.storage().ref();
    const userCoverRef = storageRef.child(
      `islands/${island.id}/gallery-${i + 1}.jpg`
    );
    userCoverRef
      .put(file)
      .then((res) => {
        return userCoverRef.getDownloadURL().then((url) => {
          newGallery[i] = url;
          return db
            .collection('islands')
            .doc(island.id)
            .update('gallery', newGallery)
            .then(() => {
              onSuccessUpload();
            });
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="gallery-container">
        {gallery.map((g, i) => {
          if (!g) {
            return (
              <div key={i} className="gallery-img img-empty">
                {loading ? (
                  <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <input
                    type="file"
                    disabled={loading}
                    onChange={(e) => handleUpload(e, i)}
                  />
                )}
              </div>
            );
          }
          return (
            <div
              className="gallery-img"
              style={{
                backgroundImage: `url(${g})`,
                backgroundSize: 'cover',
              }}
            >
              {loading ? (
                <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <input
                  type="file"
                  disabled={loading}
                  onChange={(e) => handleUpload(e, i)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GalleryView;
