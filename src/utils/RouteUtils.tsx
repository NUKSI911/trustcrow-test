import { LazyExoticComponent } from "react";

type RouteType = {
  path: string;
  element: JSX.Element | LazyExoticComponent<() => JSX.Element>;
  children?: JSX.Element[];
};

export function configureRoutes(
  routes: RouteType[] = [],
  options: Record<string, string | RegExp> = {}
) {
  const { parentPath } = options;

  return routes.map(configure);

  function configure(route: RouteType): RouteType {
    const Element = route.element;
    const element =
      // @ts-ignore
      Element.$$typeof === Symbol.for("react.element") ? Element : <Element />;
    const configured = { ...route, element };
    if (configured.path) {
      configured.path = configured.path.replace(new RegExp(parentPath), "");
    }
    if (route.children?.length) {
      // @ts-ignore
      return { ...configured, children: route.children.map(configure) };
    }
    return configured;
  }
}
