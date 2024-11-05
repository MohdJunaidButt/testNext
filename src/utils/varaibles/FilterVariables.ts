import { DefaultCondosFilter } from '@/collections/Condos/Variables/DefaultFilter';
import { ParsedUrlQuery } from 'querystring';

export function getValueObjectId(value: string, data: any) {
  let obj = data.find((item: any) => item.value === value);
  return obj ? obj.id : 1;
}

export function getOnlyChangeFilter(
  filter: any,
  defaultFilters: any = DefaultCondosFilter
) {
  let newFilter: any = {};
  for (const key in filter) {
    let value: any = filter[key];
    let defaultValue: any = defaultFilters[key];
    if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      newFilter[key] = filter[key];
    }
  }
  return newFilter;
}

export function processFilters(filter: any) {
  return {
    sales_price: filter.sales_price as string,
    // sales_price_from: SplitRange(filter.sales_price as string).from as string,
    // sales_price_to: SplitRange(filter.sales_price as string).to as string,
    unit_size:
      filter.unit_size && filter.unit_size.length > 0
        ? (filter.unit_size as string)
        : undefined,
    bedroom:
      filter.bedroom && filter.bedroom.length > 0
        ? (filter.bedroom as string)
        : undefined,
    price_per_sqft: filter.price_per_sqft as string,
    // price___sq_ft_from: SplitRange(filter.price_per_sqft as string)
    //   .from as string,
    // price___sq_ft_to: SplitRange(filter.price_per_sqft as string).to as string,
    selling_status:
      filter.selling_status && filter.selling_status.length > 0
        ? (filter.selling_status as string)
        : filter
        ? undefined
        : 'Selling,Pending,Registration',
    construction_status:
      filter.construction_status && filter.construction_status.length > 0
        ? (filter.construction_status as string)
        : undefined,
    address:
      filter.address && filter.address.length > 0
        ? (filter.address as string)
        : undefined,
    city:
      filter.city && filter.city.length > 0
        ? (filter.city as string)
        : undefined,
    title:
      filter.title && filter.title.length > 0
        ? (filter.title as string)
        : undefined,
    occupancy:
      filter.occupancy && filter.occupancy.length > 0
        ? (filter.occupancy as string)
        : undefined,
    type:
      filter.type && filter.type.length > 0
        ? (filter.type as string)
        : undefined,
  };
}

export function processFilterObject(filter: any) {
  for (const key in filter) {
    if (filter[key].min !== undefined && filter[key].max !== undefined)
      filter[key] = filter[key].min + '-' + filter[key].max;
    else filter[key] = filter[key];
  }
  return filter;
}

// ! Under testing for getting filters from url (not finalized - testing in browse map)
export function queryParamsToFilterFormat(query: ParsedUrlQuery) {
  const params: any = {};

  if (
    Object.keys(query).length === 0 ||
    Object.values(query).every((value) => value === '')
  )
    return null;
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      if (!value) continue;
      if (
        typeof value === 'string' &&
        value.includes('-') &&
        !['construction_status', 'latitude', 'longitude'].includes(key)
      ) {
        const [min, max] = value.split('-').map(Number);
        params[key] = { min, max };
      } else {
        params[key] = value;
      }
    }
  }
  return params;
}

export const removeEmptyFieldsFromObj = (obj: any) => {
  const cleanedObj = { ...obj };
  Object.keys(cleanedObj).forEach((key) => {
    const value = cleanedObj[key];
    if (
      value === '' ||
      (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      delete cleanedObj[key];
    }
  });
  return cleanedObj;
};

function isNumeric(value: string): boolean {
  return !isNaN(Number(value));
}
export function convertRangeProps(originalObject: any) {
  const convertedObject: any = {};

  for (const key in originalObject) {
    const value = originalObject[key];
    const match = value.match(/^(\d+)-(\d+)$/);
    if (match && isNumeric(match[1]) && isNumeric(match[2])) {
      const [, min, max] = match;
      convertedObject[key] = { min: parseInt(min), max: parseInt(max) };
    } else {
      convertedObject[key] = value;
    }
  }
  return convertedObject;
}
