const joi=require('joi');
module.exports.listingschema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null),
        url: joi.string().uri().allow("", null)
    }).required(),
});
module.exports.reviewschema=joi.object({
    review:joi.object({
        comment:joi.string().required(),
        rating:joi.number().required().min(0).max(5)
    }).required()
});