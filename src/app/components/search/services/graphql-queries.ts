export class GraphQLQueries {
  static SEARCH_PROPERTIES_QUERY = `
    query SearchProperties($filter: HousingFilterOptionsInput!, $page: PageRequestInput!) {
      searchProperties(filter: $filter, page: $page) {
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
