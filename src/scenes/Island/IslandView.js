import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

function IslandView({ match }) {
  const [island, setIsland] = useState(null);
  const [cover, setCover] = useState('');

  useEffect(() => {
    const storageRef = firebase.storage().ref();

    const db = firebase.firestore();
    db.collection('islands')
      .doc(match.params.name)
      .get()
      .then((res) => {
        const data = res.data();
        setIsland({ ...data, id: res.id, diy: data.diy || [] });
        const userCoverRef = storageRef.child(`islands/${res.id}/cover.jpg`);
        userCoverRef.getDownloadURL().then((url) => {
          setCover(url);
        });
      });
  }, [match.params.name]);

  return (
    <div className="container">
      {island ? (
        <>
          <div
            className="jumbotron text-center"
            style={{
              height: '350px',
              backgroundSize: 'cover',
              backgroundImage: `url(${cover})`,
            }}
          ></div>
          <div className="py-5 px-5 bg-light">
            <h1>{island.name}</h1>
            <div>{island.fruit} fruit</div>
          </div>
          <div className="py-5 px-5 bg-light">
            <h3>Free Items/DIY</h3>
            <div>
              {island.diy.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default IslandView;
