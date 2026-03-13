export class GraphQLQueries {
  topPropertiesQuery: string = `
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

  getPropertyDetails: string = `
    query GetPropertyDetails($propertyId: UUID!, $period: PeriodRequest!) {
      getPropertyDetails(propertyId: $propertyId, period: $period) {
        id
        name
        address
        city
        state
        country
        description
        averageRating
        reviewCount
        pictures
        units {
          id
          name
          capacity
          price
          size
          availableRooms
        }
      }
    }
  `;
}