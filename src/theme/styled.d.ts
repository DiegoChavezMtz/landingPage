import "styled-components";
import type { Tokens } from "./tokens";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- required by styled-components' theme typing pattern
  export interface DefaultTheme extends Tokens {}
}
