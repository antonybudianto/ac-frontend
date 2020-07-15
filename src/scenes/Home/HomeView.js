import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import { useUser } from '../../context/auth';
import CoverView from './CoverView';
import GalleryView from './GalleryView';

const db = firebase.firestore();

const HomeView = (p) => {
  const [tab, setTab] = useState('cover');
  const [loading, setLoading] = useState(true);
  const [island, setIsland] = useState({});
  const [islandName, setIslandName] = useState('');
  const [islandFruit, setIslandFruit] = useState('');
  const { user } = useUser();
  const [userDb, setUserDb] = useState({});
  const { uid } = user;

  useEffect(() => {
    db.collection('users')
      .doc(uid)
      .get()
      .then((res) => {
        const data = res.data();
        setUserDb(data);

        return db
          .collection('islands')
          .doc(data.islandId)
          .get()
          .then((res) => {
            const islandData = res.data();
            setIsland(islandData);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-3">
          <h1>Welcome, {user.displayName}</h1>
          {loading ? (
            <div>loading...</div>
          ) : (
            <>
              <div className="float-right">
                <Link to={`/island/${userDb.islandId}`}>Visit island page</Link>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/dashboard"
                    exact
                    onClick={() => setTab('cover')}
                  >
                    Upload cover
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/dashboard/gallery"
                    onClick={() => setTab('gallery')}
                  >
                    Gallery
                  </NavLink>
                </li>
              </ul>
              <div className="mt-3">
                {tab === 'cover' && (
                  <CoverView
                    uid={uid}
                    userDb={userDb}
                    loading={loading}
                    island={island}
                    islandName={islandName}
                    islandFruit={islandFruit}
                    setIslandName={setIslandName}
                    setIslandFruit={setIslandFruit}
                  />
                )}
                {tab === 'gallery' && <GalleryView />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
