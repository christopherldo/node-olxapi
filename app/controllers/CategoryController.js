const {CategoryService} = require('../services');

module.exports = {
  getCategories: async (req, res) => {
    const cats = await CategoryService.find();

    const categories = [];

    for(let category of cats){
      categories.push({
        name: category.name,
        slug: category.slug,
        img: `${req.get('Host')}/assets/images/categories/${category.slug}.webp`,
      });
    };

    res.json({categories});
  },
};