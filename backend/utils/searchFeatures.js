class SearchFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // ===============================
    // Keyword search (Product Name)
    // ===============================
    search() {
        if (this.queryString.keyword) {
            this.query = this.query.find({
                name: {
                    $regex: this.queryString.keyword,
                    $options: "i", // case-insensitive
                },
            });
        }
        return this;
    }

    // ===============================
    // Generic filters (price, ratings)
    // ===============================
    filter() {
        const queryCopy = { ...this.queryString };

        // Remove non-filter fields
        const removeFields = [
            "keyword",
            "page",
            "limit",
            "category",
            "subcategory",
            "productType",
        ];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Convert operators to MongoDB syntax
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (key) => `$${key}`
        );

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // ===============================
    // Category / Subcategory / Type
    // (CASE-INSENSITIVE & SAFE)
    // ===============================
    subcategoryFilter() {
        const filter = {};

        if (this.queryString.category) {
            filter.category = {
                $regex: `^${this.queryString.category}$`,
                $options: "i",
            };
        }

        if (this.queryString.subcategory) {
            filter.subcategory = {
                $regex: `^${this.queryString.subcategory}$`,
                $options: "i",
            };
        }

        if (this.queryString.productType) {
            filter.productType = {
                $regex: `^${this.queryString.productType}$`,
                $options: "i",
            };
        }

        if (Object.keys(filter).length > 0) {
            this.query = this.query.find(filter);
        }

        return this;
    }

    // ===============================
    // Pagination
    // ===============================
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = SearchFeatures;
