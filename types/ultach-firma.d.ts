import "react";

type UltachFirmaProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "design" | "powered";
  theme?: "dark" | "light";
  app?: string;
  logo?: "false";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ultach-firma": UltachFirmaProps;
    }
  }
}
