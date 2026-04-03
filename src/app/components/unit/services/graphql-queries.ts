export class GraphQLQueries {
  static getUnitById = `
    query GetUnitById($unitId: UUID!, $period: PeriodRequestInput!) {
      getUnitById(unitId: $unitId, period: $period) {
        id
        name
        capacity
        price
        size
        pictures
        customizations {
          type
          text
        }
      }
    }
  `;
}
