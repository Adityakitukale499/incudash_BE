'use strict';

const bcrypt = require("bcrypt");
const crypto = require('crypto');

module.exports = {
  async changePassword(ctx) {
    try {
      const { id, oldPassword, newPassword } = ctx.request.body;

      console.log(id, oldPassword, newPassword);
      // Retrieve the user
      const user = await strapi.query('user', 'users-permissions').findOne({ id });
      // console.log(user);
      if (!user) {
        return ctx.send('User not found');
      }

      const isPasswordValid = await strapi.plugins['users-permissions'].services.user.validatePassword(oldPassword, user.password);
      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return ctx.send('Invalid old password');
      }

      console.log(user.password);
      const updatedAdminUser = await strapi.plugins["users-permissions"].services.user.edit({ id: id }, { password: newPassword });

      console.log(updatedAdminUser.password);
      const res = await strapi.query('user', 'users-permissions').update({ id }, { password: updatedAdminUser.password });

      // console.log(res);
      return ctx.send('Password changed successfully');

    } catch (error) {
      console.log(error);
      return ctx.send({ error: 'Error while hashing the new password' });
    }

  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    // console.log(id, body);

    try {
      const updatedUser = await strapi.query('user', 'users-permissions').update(
        { id },
        { ...body }
      );
      console.log('user/update/', updatedUser);
      return ctx.send(updatedUser);
    } catch (error) {
      return ctx.badRequest('User update failed');
    }
  },


  //resetPasswordToken
  async resetPasswordToken(ctx) {
    try {
      //get email from req.body
      const { email } = ctx.request.body;
      console.log(ctx.request.body);
      // Retrieve the user
      const user = await strapi.query('user', 'users-permissions').findOne({ email });

      //check user for this email, email validation
      if (!user) {
        return ctx.send({
          success: false,
          message: 'Your Email is not registered with us.'
        }, 404);
      }

      //generate unique token using crypto module
      const token = crypto.randomUUID();

      //update user by adding token and expiration time

      await strapi.query('user', 'users-permissions').update(
        { id: user.id },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        }
      );

      //create url
      const url = `/user/reset-password/${token}`;

      //send mail containing the url
      await strapi.plugins.email.services.email.send({
        to: email,
        html: `<h1>Hey user, kindly click on the below link to reset the password ${url}</h1>`,
        subject: 'Password Reset Link',
        // text: ` Your Password Reset Link: ${url}`,
      });

      return ctx.send({
        success: true,
        message: 'Email sent successfully, please check email and change password',
      });
    }

    catch (error) {
      console.error(error);
      return ctx.send({
        success: false,
        message: 'Something went wrong while resetting the password.',
      }, 500);
    }
  },

  async resetPassword(ctx) {

    try {
      //data fetch
      const { password, confirmPassowrd, token } = ctx.request.body;

      //validation
      if (password !== confirmPassowrd) {
        return ctx.send({
          success: false,
          message: 'Password not matching',
        });
      }

      //get userDetails from db using token
      const userDetails = await strapi.query('user', 'users-permissions')
        .findOne({ resetPasswordToken: token });

      //if no entry - invalid token
      if (!userDetails) {
        return ctx.send({
          success: false,
          message: "Token is invalid",
        });
      }

      //token time check
      if (userDetails.resetPasswordExpires < Date.now()) {
        return ctx.send({
          success: false,
          message: "Token is expired, please regenerate your token",
        });
      }

      //hash pwd
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update password 
      await strapi.query('user', 'users-permissions').update(
        { resetPasswordToken: token },
        { password: hashedPassword },
        { new: true }
      );

      // Check if the user was found and updated
      const updatedUser = await strapi.query('user', 'users-permissions').findOne({ resetPasswordToken: token });

      if (!updatedUser) {
        return ctx.send({
          success: false,
          message: 'Invalid or expired reset token. Password reset failed.',
        }, 404);
      }
      // Password reset was successful
      return ctx.send({
        success: true,
        message: 'Password reset successfully.',
      });
    }

    catch (error) {
      console.log(error);
      return ctx.send({
        success: false,
        message: 'Something went wrong while resetting the password.',
      }, 500);
    }
  }
};
