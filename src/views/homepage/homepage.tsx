import React, { memo } from "react";

import styles from "./homepage.module.scss";

const Homepage: React.FC = () => {
  return (
    <>
      <div className={styles.homepage}>Homepage</div>
    </>
  );
};

export default memo(Homepage);
