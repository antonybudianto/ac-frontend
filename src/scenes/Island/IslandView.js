import React from 'react';

function IslandView(props) {
  return (
    <div className="container">
      <div
        className="jumbotron text-center"
        style={{
          height: '200px',
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/ac-frontend.appspot.com/o/user%2FIHGxvrUvuNSVrdxj2iDq9mIacou2%2Fcover.jpg?alt=media&token=a5fb7809-b12d-4fa1-b155-7ec53c9707cf)',
        }}
      >
        Raftel
      </div>
      <div className="py-5 px-5 bg-light">
        <h1>Raftel</h1>
        <div>Peach fruit</div>
      </div>
      <div className="py-5 px-5 bg-light">
        <h2>Free Items/DIY</h2>
        <div></div>
      </div>
    </div>
  );
}

export default IslandView;
