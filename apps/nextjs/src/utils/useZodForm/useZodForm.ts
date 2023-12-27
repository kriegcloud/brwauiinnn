import { zodResolver } from "@hookform/resolvers/zod";
import type {
  UseFormProps,
  UseFormReturn} from "react-hook-form";
import {
  useForm
} from "react-hook-form";
import type { ZodType } from "zod";

function useZodForm<TSchema extends ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  },
): UseFormReturn<TSchema["_input"]> {
  return useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  }) as UseFormReturn<TSchema["_input"]>;
}

export default useZodForm;
