import {
  RouterContext
} from "./chunk-AXCJ6OYR.js";
import {
  require_jsx_runtime
} from "./chunk-CVWYDCK2.js";
import {
  require_react
} from "./chunk-YLDSBLSF.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@toolpad/core/esm/shared/Link.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DefaultLink = React.forwardRef(function Link(props, ref) {
  const {
    children,
    href,
    onClick,
    history,
    ...rest
  } = props;
  const routerContext = React.useContext(RouterContext);
  const handleLinkClick = React.useMemo(() => {
    if (!routerContext) {
      return onClick;
    }
    return (event) => {
      event.preventDefault();
      const url = new URL(event.currentTarget.href);
      routerContext.navigate(url.pathname, {
        history
      });
      onClick == null ? void 0 : onClick(event);
    };
  }, [routerContext, onClick, history]);
  return (0, import_jsx_runtime.jsx)("a", {
    ref,
    href,
    ...rest,
    onClick: handleLinkClick,
    children
  });
});
var Link2 = React.forwardRef(function Link3(props, ref) {
  const routerContext = React.useContext(RouterContext);
  const LinkComponent = (routerContext == null ? void 0 : routerContext.Link) ?? DefaultLink;
  return (0, import_jsx_runtime.jsx)(LinkComponent, {
    ref,
    ...props,
    children: props.children
  });
});

export {
  Link2 as Link
};
//# sourceMappingURL=chunk-Q2457F24.js.map
