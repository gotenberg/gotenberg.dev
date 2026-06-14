import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import clsx from "clsx";
import styles from "./ApiEndpoint.module.css";

// Renders a description, turning `backtick`-wrapped literals into subtly
// highlighted value spans (lighter than an inline code block).
function renderValues(text) {
  if (typeof text !== "string" || !text.includes("`")) return text;
  return text.split("`").map((seg, i) =>
    i % 2 === 1 ? (
      <span key={i} className={styles.paramValue}>
        {seg}
      </span>
    ) : (
      seg
    )
  );
}

const MethodBadge = ({ method = "" }) => {
  const colors = {
    GET: { bg: "rgba(97, 175, 254, 0.18)", fg: "#0060a1" },
    POST: { bg: "rgba(73, 204, 144, 0.16)", fg: "#047857" },
    PUT: { bg: "rgba(252, 161, 48, 0.18)", fg: "#92400e" },
    DELETE: { bg: "rgba(249, 62, 62, 0.12)", fg: "#b91c1c" },
    PATCH: { bg: "rgba(80, 227, 194, 0.18)", fg: "#0f766e" },
    HEAD: { bg: "rgba(144, 97, 249, 0.14)", fg: "#6d28d9" },
  };

  const isMultipart = !method;
  const safeMethod = isMultipart ? "multipart/form-data" : method.toUpperCase();
  const color = colors[safeMethod] || {
    bg: "rgba(100, 116, 139, 0.14)",
    fg: "#475569",
  };

  return (
    <span
      className={clsx(styles.methodBadge, isMultipart && styles.multipartBadge)}
      style={{ backgroundColor: color.bg, color: color.fg }}
    >
      {safeMethod}
    </span>
  );
};

const ParamsList = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.paramsSection}>
      <div className={styles.paramsSectionLabel}>{title}</div>
      <div className={styles.listWrapper}>
        {items.map((item, idx) => (
          <div key={idx} className={styles.paramItem}>
            <div className={styles.paramHeader}>
              <span className={styles.paramName}>{item.name}</span>
              <span className={styles.paramType}>{item.type}</span>
              {item.required && (
                <span className={styles.requiredLabel}>required</span>
              )}
            </div>
            {item.description && (
              <div className={styles.paramDescription}>
                {renderValues(item.description)}
              </div>
            )}
            {item.defaultValue && (
              <div className={styles.paramDefault}>
                <span className={styles.defaultLabel}>Default:</span>
                <code>{item.defaultValue}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ApiEndpoint({
  method = "",
  path = "",
  formFields = [],
  formFiles = [],
  headers = [],
  curl = "",
  responses = [],
}) {
  const hasInputs =
    headers?.length > 0 || formFields?.length > 0 || formFiles?.length > 0;
  const hasTechnical = (curl && curl.length > 0) || responses?.length > 0;
  const hasHeader = method || path;

  return (
    <div className={styles.apiContainer}>
      {/* --- HEADER: Only shows if method or path exists --- */}
      {hasHeader && (
        <div className={styles.apiHeader}>
          <MethodBadge method={method} />
          <span className={styles.apiPath}>{path}</span>
        </div>
      )}

      {/* --- INPUT ZONE --- */}
      {hasInputs && (
        <div className={styles.sectionInput}>
          <ParamsList title="Headers" items={headers} />
          <ParamsList title="Form Fields" items={formFields} />
          <ParamsList title="Form Files" items={formFiles} />
        </div>
      )}

      {/* --- TECHNICAL ZONE --- */}
      {hasTechnical && (
        <div className={styles.sectionTechnical}>
          {curl && (
            <>
              <div className={styles.sectionLabel}>Example Request</div>
              <CodeBlock language="bash" title="cURL">
                {curl.trim()}
              </CodeBlock>
            </>
          )}

          {responses?.length > 0 && (
            <div className={styles.responseWrapper}>
              <div className={styles.sectionLabel}>Responses</div>
              <Tabs className={styles.responseTabs}>
                {responses.map((res, idx) => (
                  <TabItem
                    key={idx}
                    value={String(res.status)}
                    label={`${res.status}`}
                  >
                    {res.description && (
                      <div className={styles.responseDescription}>
                        {renderValues(res.description)}
                      </div>
                    )}
                    {res.body && (
                      <CodeBlock language="json">{res.body.trim()}</CodeBlock>
                    )}
                  </TabItem>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
