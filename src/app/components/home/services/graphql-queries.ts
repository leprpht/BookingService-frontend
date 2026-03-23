export class GraphQLQueries {
  static topPropertiesQuery = `
    query topPropertiesByCity($city: String!, $count: Int) {
      topPropertiesByCity(city: $city, count: $count) {
        id
        name
        address
        city
        state
        country
        price
        pictureUrl
        rating
        rankingScore
        reviewCount
        availableUnits
        tags
      }
    }
  `;
}
