/**
 * API レスポンスヘルパー
 * - 一貫した JSON ボディ形式でレスポンスを返すユーティリティ
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T | null;
  errors?: unknown;
};

const baseHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

const jsonResponse = <T = unknown>(body: ApiResponse<T>, status = 200, headers?: Record<string, string>) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...baseHeaders, ...(headers ?? {}) },
  });
};

export const ok = <T = unknown>(data?: T, message?: string) =>
  jsonResponse<T>({ success: true, message, data: data ?? null }, 200);

export const created = <T = unknown>(data?: T, message?: string) =>
  jsonResponse<T>({ success: true, message, data: data ?? null }, 201);

export const noContent = () => new Response(null, { status: 204 });

export const badRequest = (message = 'Bad Request', errors?: unknown) =>
  jsonResponse({ success: false, message, errors }, 400);

export const unauthorized = (message = 'Unauthorized') =>
  jsonResponse({ success: false, message }, 401);

export const forbidden = (message = 'Forbidden') =>
  jsonResponse({ success: false, message }, 403);

export const notFound = (message = 'Not Found') =>
  jsonResponse({ success: false, message }, 404);

export const validationError = (errors: unknown, message = 'Validation Error') =>
  jsonResponse({ success: false, message, errors }, 422);

export const internalServerError = (message = 'Internal Server Error', details?: unknown) =>
  jsonResponse({ success: false, message, errors: details }, 500);

export const fromError = (err: unknown, message = 'Internal Server Error') => {
  const details = err instanceof Error ? { name: err.name, message: err.message } : err;
  return internalServerError(message, details);
};

export {
  ok,
  created,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  validationError,
  internalServerError,
  fromError,
};
