import { SupportedDepartments, SupportedRoles } from './enums';

export function isAuthorized(roleTitle: string, projectArea: string): boolean {
  const normalizedRole = roleTitle.toUpperCase();
  const normalizedProjectArea = projectArea.toUpperCase();

  if (normalizedRole === SupportedRoles.ADMIN.toUpperCase()) {
    return true;
  }

  if (normalizedRole === normalizedProjectArea) {
    return true;
  }

  if (normalizedProjectArea === SupportedDepartments.LEGAL_AND_ACCOUNTING.toUpperCase()) {
    return (
      normalizedRole === SupportedRoles.LEGAL.toUpperCase() ||
      normalizedRole === SupportedRoles.ACCOUNTING.toUpperCase()
    );
  }

  return false;
}
