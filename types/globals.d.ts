export {};

declare global {
  interface CustomJwtSessionClaims {
    email?: string;
  }
}
