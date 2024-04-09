import { SetMetadata } from '@nestjs/common';
import RoleNames from '../models/enums/RoleNames';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

// NOT_USED
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

// This decorator allows specifying what roles are required to access specific resources.
export const Roles = (...roles: RoleNames[]) => SetMetadata(ROLES_KEY, roles);
