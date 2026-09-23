const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET =
  "unified_assessment_platform_secret_2026";

/* =========================================================
   REGISTER
========================================================= */

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      institute_code,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters.",
      });
    }

    User.findByEmail(email, async (error, existingUser) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already registered.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      User.create(
        {
          name,
          email,
          password: hashedPassword,
          role,
          institute_code,
        },
        (createError, user) => {
          if (createError) {
            console.error(createError);

            return res.status(500).json({
              success: false,
              message: "Unable to create account.",
            });
          }

          return res.status(201).json({
            success: true,
            message: "Registration successful.",
            user,
          });
        }
      );
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


/* =========================================================
   LOGIN
========================================================= */

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  User.findByEmail(email, async (error, user) => {
    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institute_code: user.institute_code,
      },
    });
  });
};


/* =========================================================
   FORGOT PASSWORD
========================================================= */

const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email address is required.",
    });
  }

  User.findByEmail(email, (error, user) => {
    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    /*
      For this local/project version, we continue directly
      to the password reset page.

      In production, this step should send a secure
      one-time reset token through email.
    */

    return res.json({
      success: true,
      message: "Account found. You can now reset your password.",
    });
  });
};


/* =========================================================
   RESET PASSWORD
========================================================= */

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 6 characters.",
      });
    }

    User.findByEmail(email, async (error, user) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email.",
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      User.updatePassword(
        email,
        hashedPassword,
        (updateError) => {
          if (updateError) {
            console.error(updateError);

            return res.status(500).json({
              success: false,
              message: "Unable to update password.",
            });
          }

          return res.json({
            success: true,
            message: "Password reset successfully.",
          });
        }
      );
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};