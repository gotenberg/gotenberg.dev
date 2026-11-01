import React from "react";
import data from "@site/src/data/routes.json";
import Options from "./Options";

// The form fields of src/data/routes.json for one group of routes, or one
// section of it. Each field is an anchor: /docs/reference/chromium#waitDelay.
export default function Fields({ group, section }) {
  const fields = data.fields[group]?.filter(
    (field) => !section || field.section === section,
  );
  if (!fields?.length) {
    throw new Error(`no fields "${group}" "${section ?? ""}" in routes.json`);
  }
  return <Options options={fields} anchored />;
}

// The extensions LibreOffice converts, as one line of code spans.
export function Extensions() {
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
