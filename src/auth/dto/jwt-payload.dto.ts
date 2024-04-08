import RoleNames from '../../models/enums/RoleNames';

export class JWTPayload {
  email: string;
  role: RoleNames;
}
