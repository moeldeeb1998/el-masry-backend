import { JWTPayload } from '../auth/dto/jwt-payload.dto';

export interface TokenPayload extends JWTPayload {
  iat: number;
  exp: number;
  refreshToken?: string;
}

export interface CustomerHeaders extends Headers {
  authorization?: string;
}

export interface CustomRequest extends Request {
  user?: TokenPayload;
  headers: CustomerHeaders;
}
