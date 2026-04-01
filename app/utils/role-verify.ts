export const allowRoles = (user: any, roles: string[]) => {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden: Access denied");
  }
};