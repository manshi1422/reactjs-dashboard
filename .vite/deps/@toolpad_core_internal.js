import {
  Link
} from "./chunk-Q2457F24.js";
import "./chunk-AXCJ6OYR.js";
import "./chunk-CVWYDCK2.js";
import {
  require_react
} from "./chunk-YLDSBLSF.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@toolpad/core/esm/internal/demo.js
var React = __toESM(require_react(), 1);
var DUMMY_BASE = "https://example.com";
function useDemoRouter(initialUrl = "/") {
  const [url, setUrl] = React.useState(() => new URL(initialUrl, DUMMY_BASE));
  const router = React.useMemo(() => {
    return {
      pathname: url.pathname,
      searchParams: url.searchParams,
      navigate: (newUrl) => {
        const nextUrl = new URL(newUrl, DUMMY_BASE);
        if (nextUrl.pathname !== url.pathname || nextUrl.search !== url.search) {
          setUrl(nextUrl);
        }
      }
    };
  }, [url.pathname, url.search, url.searchParams]);
  return router;
}

// node_modules/@toolpad/core/esm/internal/context.js
var React2 = __toESM(require_react(), 1);
var DocsContext = React2.createContext(false);
export {
  DocsContext,
  Link,
  useDemoRouter
};
//# sourceMappingURL=@toolpad_core_internal.js.map
