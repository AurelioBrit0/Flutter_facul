exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "uuid", primaryKey: true },
    name: { type: "varchar(120)", notNull: true },
    email: { type: "varchar(180)", notNull: true, unique: true },
    password_hash: { type: "varchar(255)", notNull: true },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("now()") },
  });

  pgm.createIndex("users", "email", { name: "idx_users_email" });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
