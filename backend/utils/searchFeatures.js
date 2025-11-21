// backend/utils/searchFeatures.js

class SearchFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Search by product name (keyword search)
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i", // case insensitive
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Filter by category, price, ratings, etc.
    filter() {
        const queryCopy = { ...this.queryString };

        // Remove fields that should not be part of the filter query
        const removeFields = ["keyword", "page", "limit", "subcategory"];
        removeFields.forEach(key => delete queryCopy[key]);

        // Convert price and ratings operators (gt, gte, lt, lte) to MongoDB operators
        // Example: price[gte]=1000 becomes { price: { $gte: 1000 } }
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        // Apply the filter to the query
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    // Filter by subcategory
    subcategoryFilter() {
        if (this.queryString.subcategory) {
            // Filter products where subcategory matches
            this.query = this.query.find({ 
                subcategory: this.queryString.subcategory 
            });
        }
        return this;
    }

    // Pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skipProducts = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
}

module.exports = SearchFeatures;