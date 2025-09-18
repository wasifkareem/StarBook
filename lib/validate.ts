import { NextResponse } from "next/server";
import { ZodType } from "zod";

export const validateQuery = <T>(
  schema: ZodType<T>,
  searchParams: URLSearchParams,
) => {
  const queryObject = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(queryObject);

  if (!result.success) {
    console.error("Zod validation error:", result.error.issues);
    return {
      success: false,
      error: NextResponse.json({ error: result.error.issues }, { status: 400 }),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateBody = <T>(schema: ZodType<T>, body: any) => {
  const result = schema.safeParse(body);

  if (!result.success) {
    console.error("Zod validation error:", result.error.issues);
    return {
      success: false,
      error: NextResponse.json({ error: result.error.issues }, { status: 400 }),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
