import session from 'express-session';

declare module 'express-session' {
  export interface Session {
    company: { [key: string]: any };
  }
}