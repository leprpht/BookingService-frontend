export class GraphQLQueries {
  static getUnitById = `
    query GetUnitById($unitId: UUID!, $period: PeriodRequestInput!) {
      unitById(unitId: $unitId, period: $period) {
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
