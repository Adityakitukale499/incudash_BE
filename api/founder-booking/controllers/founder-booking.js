'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getEntriesByUserAndFounder(ctx) {

        const { userId} = ctx.params;
        console.log(userId);     
        // const entries = [];
        const entries = await strapi.query('founder-booking').find({ userId });
        console.log(entries);
        return ctx.send(entries);
    },
    async getCountByUserAndFounder(ctx) {
        const { userId, founderId } = ctx.params;
        console.log(userId, founderId);
        const count = await strapi.query('founder-booking').count({founderId,
        });
        console.log(count);
        return { count };
      },
};
