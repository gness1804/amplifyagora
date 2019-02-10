import React from 'react';

const Error = ({ errors }) => {
  const errorsElem = errors.map(({ message }, i) => (
    <div key={i}>{message}</div>
  ));
  return <pre className="error">{errorsElem}</pre>;
};

export default Error;
