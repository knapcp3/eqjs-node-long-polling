export interface Route {
  method: string;
  url: RegExp;
  handler: () => Promise<Response>;
}
