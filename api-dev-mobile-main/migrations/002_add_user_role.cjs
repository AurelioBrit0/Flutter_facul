exports.up = (pgm) => {
  pgm.addColumn("users", {
    role: { type: "varchar(20)", notNull: true, default: "usuario" },
  });

  pgm.addConstraint("users", "chk_users_role", {
    check: "role in ('administrador', 'usuario')",
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint("users", "chk_users_role");
  pgm.dropColumn("users", "role");
};
