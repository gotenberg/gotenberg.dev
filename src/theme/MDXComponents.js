import MDXComponents from "@theme-original/MDXComponents";
import Request from "@site/src/components/documentation/Request";
import Endpoint from "@site/src/components/documentation/Endpoint";
import { Card, CardGrid } from "@site/src/components/documentation/Cards";

// Components every docs page can use without importing them.
export default {
  ...MDXComponents,
  Request,
  Endpoint,
  CardGrid,
  Card,
};
