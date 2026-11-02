import React from "react";
import data from "@site/src/data/routes.json";

// The extensions LibreOffice converts, as one line of code spans.
export default function Extensions() {
  return (
    <p>
      {data.libreofficeExtensions.map((extension, i) => (
        <React.Fragment key={extension}>
          {i > 0 && " "}
          <code>.{extension}</code>
        </React.Fragment>
      ))}
    </p>
  );
}
