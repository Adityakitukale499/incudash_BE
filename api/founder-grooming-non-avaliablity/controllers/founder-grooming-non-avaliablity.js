'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // async findByFounderId(ctx){
    //     const { founderId } = ctx.params;
    //     console.log(founderId);
    //     const founderAvaliblity = await strapi.query('founder-grooming-non-avaliablity').findOne({ "founderGroomingNonAvaliablity.founderId": founderId });
    //     return ctx.send(founderAvaliblity)
    // }
    async findByFounderId(ctx){
        const { founderId } = ctx.params;
        console.log(founderId);
        const founderAvaliblity = await strapi.query('founder-grooming-non-avaliablity').findOne({ founderId});
        return ctx.send(founderAvaliblity)
    }
};




