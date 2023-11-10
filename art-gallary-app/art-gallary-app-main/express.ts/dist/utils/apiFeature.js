"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api_Feature = void 0;
class Api_Feature {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    filter() {
        const queryValues = Object.assign({}, this.queryString);
        const expectedQuery = ["limit", "fields", "page", "keyword", "sort"];
        expectedQuery.forEach(val => delete queryValues[val]);
        let queryStr = JSON.stringify(queryValues);
        queryStr = queryStr.replace(/\b(gte|ge|eq|lt|lte)\b/g, match => `$${match}`);
        if (this.queryString.keyword) {
            this.filterQuery = JSON.parse(queryStr);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        }
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.select("-__v");
        }
        return this;
    }
    search() {
        if (this.queryString.keyword) {
            this.filterQuery.name = { $regex: this.queryString.keyword, $options: "i" };
            this.mongooseQuery = this.mongooseQuery.find(this.filterQuery);
        }
        return this;
    }
    pagination(documentCount) {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 6;
        const skip = (page - 1) * limit;
        const endPageIndex = page * limit;
        const pagination = {};
        pagination.currentage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(documentCount / limit);
        if (endPageIndex < documentCount) {
            pagination.next = page + 1;
        }
        if (skip > 0) {
            pagination.previous = page - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginateResult = pagination;
        return this;
    }
}
exports.Api_Feature = Api_Feature;
//# sourceMappingURL=apiFeature.js.map