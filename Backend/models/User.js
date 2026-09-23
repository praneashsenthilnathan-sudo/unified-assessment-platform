const db = require("../config/database");

const User = {

  /* =====================================================
     CREATE USER
  ===================================================== */

  create: (user, callback) => {

    const sql = `
      INSERT INTO users
      (name, email, password, role, institute_code)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        user.name,
        user.email,
        user.password,
        user.role,
        user.institute_code,
      ],
      function (error) {

        if (error) {
          callback(error, null);
          return;
        }

        callback(null, {
          id: this.lastID,
          name: user.name,
          email: user.email,
          role: user.role,
          institute_code: user.institute_code,
        });

      }
    );
  },


  /* =====================================================
     FIND USER BY EMAIL
  ===================================================== */

  findByEmail: (email, callback) => {

    const sql = `
      SELECT *
      FROM users
      WHERE email = ?
    `;

    db.get(
      sql,
      [email],
      (error, row) => {

        if (error) {
          callback(error, null);
          return;
        }

        callback(null, row);
      }
    );
  },


  /* =====================================================
     UPDATE PASSWORD
  ===================================================== */

  updatePassword: (
    email,
    hashedPassword,
    callback
  ) => {

    const sql = `
      UPDATE users
      SET password = ?
      WHERE email = ?
    `;

    db.run(
      sql,
      [hashedPassword, email],
      function (error) {

        if (error) {
          callback(error);
          return;
        }

        callback(null);
      }
    );
  },

};

module.exports = User;