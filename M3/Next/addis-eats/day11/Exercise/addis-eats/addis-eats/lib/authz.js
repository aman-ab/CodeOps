// Authorisation ("may THIS person touch THIS record?") lives in one place, used by pages,
// handlers and actions alike. Authentication ("who is it?") is getSession().
export const isStaff = (user) => user?.role === "staff";
export const canViewOrder = (user, order) => isStaff(user) || order.userId === user.id;
