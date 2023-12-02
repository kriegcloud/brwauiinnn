import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@girth/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@girth/api";
