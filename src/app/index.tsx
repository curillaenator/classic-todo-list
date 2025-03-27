import React, { FC } from 'react';

// import type {ComponentProps} from './interfaces'
import styles from './app.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <h1>Hi!</h1>
    </div>
  );
};

export { App };
