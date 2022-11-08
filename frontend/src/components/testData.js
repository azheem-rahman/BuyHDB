const testData = {
  help: "https://data.gov.sg/api/3/action/help_show?name=datastore_search",
  success: true,
  result: {
    resource_id: "f1765b54-a209-4718-8d38-a39237f502b3",
    fields: [
      { type: "int4", id: "_id" },
      { type: "text", id: "month" },
      { type: "text", id: "town" },
      { type: "text", id: "flat_type" },
      { type: "text", id: "block" },
      { type: "text", id: "street_name" },
      { type: "text", id: "storey_range" },
      { type: "numeric", id: "floor_area_sqm" },
      { type: "text", id: "flat_model" },
      { type: "numeric", id: "lease_commence_date" },
      { type: "text", id: "remaining_lease" },
      { type: "numeric", id: "resale_price" },
    ],
    records: [
      {
        town: "ANG MO KIO",
        flat_type: "2 ROOM",
        flat_model: "Improved",
        floor_area_sqm: "44",
        street_name: "FAKE DATA: ANG MO KIO AVE 10",
        resale_price: "232000",
        month: "2017-01",
        remaining_lease: "61 years 04 months",
        lease_commence_date: "1979",
        storey_range: "10 TO 12",
        _id: 1,
        block: "406",
      },
      {
        town: "TAMPINES",
        flat_type: "3 ROOM",
        flat_model: "New Generation",
        floor_area_sqm: "67",
        street_name: " FAKE DATA: TAMPINES",
        resale_price: "250000",
        month: "2017-01",
        remaining_lease: "60 years 07 months",
        lease_commence_date: "1978",
        storey_range: "01 TO 03",
        _id: 2,
        block: "108",
      },
      {
        town: "TOA PAYOH",
        flat_type: "3 ROOM",
        flat_model: "New Generation",
        floor_area_sqm: "67",
        street_name: "FAKE DATA: TOA PAYOH",
        resale_price: "262000",
        month: "2017-01",
        remaining_lease: "62 years 05 months",
        lease_commence_date: "1980",
        storey_range: "01 TO 03",
        _id: 3,
        block: "602",
      },
      {
        town: "ANG MO KIO",
        flat_type: "3 ROOM",
        flat_model: "New Generation",
        floor_area_sqm: "68",
        street_name: "ANG MO KIO AVE 10",
        resale_price: "265000",
        month: "2017-01",
        remaining_lease: "62 years 01 month",
        lease_commence_date: "1980",
        storey_range: "04 TO 06",
        _id: 4,
        block: "465",
      },
      {
        town: "ANG MO KIO",
        flat_type: "3 ROOM",
        flat_model: "New Generation",
        floor_area_sqm: "67",
        street_name: "ANG MO KIO AVE 5",
        resale_price: "265000",
        month: "2017-01",
        remaining_lease: "62 years 05 months",
        lease_commence_date: "1980",
        storey_range: "01 TO 03",
        _id: 5,
        block: "601",
      },
    ],
    _links: {
      start:
        "/api/action/datastore_search?limit=5&resource_id=f1765b54-a209-4718-8d38-a39237f502b3",
      next: "/api/action/datastore_search?offset=5&limit=5&resource_id=f1765b54-a209-4718-8d38-a39237f502b3",
    },
    limit: 5,
    total: 136976,
  },
};

export default testData;
