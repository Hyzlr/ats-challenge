// lib
import { PaginationSearchType } from '../zod/pagination.zod';

const generateWhereClause = (searchOption: PaginationSearchType) => {
  switch (searchOption.fieldType) {
    case 'TEXT':
      switch (searchOption.operation) {
        case 'CONTAINS':
          return `${searchOption.field} ILIKE '%${searchOption.searchValue}%'`;
        case 'DO_NOT_CONTAINS':
          return `${searchOption.field} NOT ILIKE '%${searchOption.searchValue}%'`;
        case 'STARTS_WITH':
          return `${searchOption.field} ILIKE '${searchOption.searchValue}%'`;
        case 'ENDS_WITH':
          return `${searchOption.field} NOT ILIKE '%${searchOption.searchValue}'`;
        case 'EQUALS':
          return `${searchOption.field} = '${searchOption.searchValue}'`;
        case 'NOT_EQUAL':
          return `${searchOption.field} != '${searchOption.searchValue}'`;
      }

    case 'NUMERIC':
      if (['EQUALS', 'NOT_EQUAL'].includes(searchOption.operation)) {
        if (Number.isNaN(searchOption.searchValue)) {
          throw new Error(
            `Invalid search value passed (NaN) for field '${searchOption.field}', value: ${searchOption.searchValue}`,
          );
        }
      }

      switch (searchOption.operation) {
        case 'CONTAINS':
          return `${searchOption.field}::TEXT ILIKE '%${searchOption.searchValue}%'`;
        case 'DO_NOT_CONTAINS':
          return `${searchOption.field}::TEXT NOT ILIKE '%${searchOption.searchValue}%'`;
        case 'STARTS_WITH':
          return `${searchOption.field}::TEXT ILIKE '${searchOption.searchValue}%'`;
        case 'ENDS_WITH':
          return `${searchOption.field}::TEXT NOT ILIKE '%${searchOption.searchValue}'`;
        case 'EQUALS':
          return `${searchOption.field} = '${Number(searchOption.searchValue)}'`;
        case 'NOT_EQUAL':
          return `${searchOption.field} != '${Number(searchOption.searchValue)}'`;
      }

    case 'BOOLEAN':
      switch (searchOption.operation) {
        case 'EQUALS':
          return `${searchOption.field} = '${Boolean(searchOption.searchValue.toLowerCase())}'`;
        case 'NOT_EQUAL':
          return `${searchOption.field} != '${Boolean(searchOption.searchValue.toLowerCase())}'`;
      }
  }
};

export default generateWhereClause;
