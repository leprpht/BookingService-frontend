export class GraphQLQueries {
  static getUnitById = `
    query GetUnitById($unitId: UUID!, $period: PeriodRequestInput!) {
      unitById(unitId: $unitId, period: $period) {
        id
        name
        propertyName
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
