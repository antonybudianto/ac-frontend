import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function IslandView({ match }) {
  const [island, setIsland] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('islands')
      .doc(match.params.name)
      .get()
      .then((res) => {
        const data = res.data();
        setIsland({ ...data, id: res.id, diy: data.diy || [] });
      });
  }, [match.params.name]);

  return (
    <div className="container container-mobile">
      {island ? (
        <>
          <div className="col-md-12 mb-5 mt-5">
            <h1>{island.name}</h1>
            <div>{island.fruit} fruit</div>
          </div>
          <div className="col-md-12 mb-5">
            <div className="gallery-container">
              {!(island.gallery || []).length && (
                <div>There is no gallery yet.</div>
              )}
              <Carousel showArrows={true} dynamicHeight swipeable>
                {(island.gallery || []).map((g, i) => {
                  return (
                    <div key={i}>
                      <img
                        style={{
                          height: '10%',
                          maxHeight: '720px',
                        }}
                        alt={`gallery-` + i}
                        src={g}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default IslandView;
