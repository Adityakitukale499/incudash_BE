'use strict';

/**
 * A set of functions called "actions" for `user`
 */

'use strict';

const { logger } = require("strapi-utils");

module.exports = {
  async changePassword(ctx) {
    try {
      const { id, oldPassword, newPassword } = ctx.request.body;

      console.log(id, oldPassword, newPassword);
      // Retrieve the user
      const user = await strapi.query('user', 'users-permissions').findOne({ id });
      // console.log(user);
      if (!user) {
        return ctx.send({ error: 'User not found' });
      }


      const isPasswordValid = await strapi.plugins['users-permissions'].services.user.validatePassword(oldPassword, user.password);
      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return ctx.send({ error: 'Invalid old password' });
      }

      console.log(user.password);


      const updatedAdminUser = await strapi.plugins["users-permissions"].services.user.edit({ id: id }, { password: newPassword });

      console.log(updatedAdminUser.password);
      const res = await strapi.query('user', 'users-permissions').update({ id }, { password: updatedAdminUser.password });

      // console.log(res);
      return ctx.send('Password changed successfully');

    } catch (error) {
      return ctx.send({ error: 'Error while hashing the new password' });
    }

  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    console.log(id, body);

    try {
      const updatedUser = await strapi.query('user', 'users-permissions').update(
        { id },
        { ...body }
      );

      return ctx.send(updatedUser);
    } catch (error) {
      return ctx.badRequest('User update failed');
    }
  },
};

