export const ARoleEtablissement = (roles, type) => {
  const privilege = roles.map((e) => e.etablissement);

  for (let index = 0; index < privilege.length; index++) {
    if (privilege[index].include(type)) return true;
  }
  return false;
};
