import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Bievenue sur mon blog",
  description: "Blog sur mon parcours dans le developpement web & mobile",
  keywords: "javascript, blog developer, dev blog",
};

export default Meta;
