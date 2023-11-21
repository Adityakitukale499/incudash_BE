'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */




module.exports = {
    /**
     * Custom action to find a post by userId.
     *
     * @param {Object} ctx - The Strapi context object.
     * @returns {Object} The found post or an error response.
     */
    async findByUserId(ctx) {
        const { userId } = ctx.params;
        // console.log(userId);
        const idea = await strapi.query('idea').findOne({ userId });
        // console.log(idea);
        if (!idea) {
            return ctx.notFound('Idea not found');
        }
        return ctx.send(idea);
    },

    async updateByUserId(ctx) {
        const { userId } = ctx.params;
        // console.log(ctx.request.body);

        const idea = await strapi.query('idea').findOne({ userId });
    
        if (!idea) {
          return ctx.notFound('Idea not found');
        }
    
        const updatedIdea = await strapi.query('idea').update({ userId }, ctx.request.body);
        console.log(updatedIdea);
    
        return ctx.send(idea);
      },
};
