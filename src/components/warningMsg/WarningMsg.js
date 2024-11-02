import React from 'react';

import './WarningMsg.scss';

const WarningMsg = props => (
  <div className="warning-message">{props.message}</div>
);

export default WarningMsg;
