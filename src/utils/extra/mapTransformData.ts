export const transformDataForMap = (data: any) => {
  return data?.map((item: any) => ({
    id: item.property_id,
    propName: item.property_details.project_title,
    propSlug: item.property_details.slug,
    position: [
      parseFloat(item.property_details.latitude),
      parseFloat(item.property_details.longitude),
    ],
    projImage: item.featured_building_images?.[0]?.url || '',
    projDesc: item.property_details.address,
    projType: item.property_type,
  }));
};
