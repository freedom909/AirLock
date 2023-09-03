const { RESTDataSource } = require("@apollo/datasource-rest");

class ListingsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:4010/";
  }

  getListingsForUser(userId) {
    return this.get(`user/${userId}/listings`);
  }

  getListings({ numOfBeds, page, limit, sortBy }) {
    return this.get(
      `listings?numOfBeds=${numOfBeds}&page=${page}&limit=${limit}&sortBy=${sortBy}`
    );
  }

  getFeaturedListings(limit) {
    return this.get(`featured-listings?limit=${limit}`);
  }

  getListing(listingId) {
    return this.get(`listing/${listingId}`);
  }

  getAllAmenities() {
    return this.get(`listing/amenities`);
  }

  getTotalCost({ id, checkInDate, checkOutDate }) {
    return this.get(
      `listings/${id}/totalCost?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    );
  }

  getListingCoordinates(id) {
    return this.get(`listing/${id}/coordinates`);
  }

  createListing(listing) {
    return this.post(`listings`, { body: { listing } });
  }

  updateListing({ listingId, listing }) {
    return this.patch(`listings/${listingId}`, { body: { listing } });
  }
}

module.exports = ListingsAPI;
