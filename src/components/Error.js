/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

const Error = ({ errors }) => {
  const errorsElem = errors.map(({ message }, i) => (
    <div key={i}>{message}</div>
  ));
  return <pre className="error">{errorsElem}</pre>;
};

export default Error;
