class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery; // Mongoose query
    this.query = query || {};
  }

  // Search Feature
  search(searchableFields) {
    const searchTerm = this.query.searchTerm || '';
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // Filter Feature
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] == null || queryObj[key] === '') {
        delete queryObj[key];
      }
    });

    // availability → inStock mapping
    if (queryObj.availability) {
      queryObj.inStock = queryObj.availability === 'inStock';
      delete queryObj.availability;
    }

    // priceRange handling
    if (queryObj.priceRange && typeof queryObj.priceRange === 'string') {
      const [min, max] = queryObj.priceRange.split(',').map(Number);
      queryObj.price = {};
      if (!isNaN(min)) queryObj.price.$gte = min;
      if (!isNaN(max)) queryObj.price.$lte = max;
      delete queryObj.priceRange;
    }

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }


  sort() {
    const sortBy = this.query.sortBy || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this.query.fields ? this.query.fields.split(',').join(' ') : '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  execute() {
    return this.modelQuery;
  }
  async countTotal() {
    const filter = this.modelQuery.getFilter ? this.modelQuery.getFilter() : {};
    const total = await this.modelQuery.model.countDocuments(filter);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;