import MDXComponents from "@theme-original/MDXComponents";
import Request from "@site/src/components/documentation/Request";
import { Card, CardGrid } from "@site/src/components/documentation/Cards";

// Components every docs page can use without importing them.
export default {
  ...MDXComponents,
  Request,
  CardGrid,
  Card,
};
