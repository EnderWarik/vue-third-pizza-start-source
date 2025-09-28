export class HttpError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(
    message: string,
    opts?: { status?: number; code?: string; details?: unknown },
  ) {
    super(message);
    this.name = "HttpError";
    Object.assign(this, opts);
  }
}
