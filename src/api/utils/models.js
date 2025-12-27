export const mockRealEstateType = ['Дом', 'Участок', 'Квартира'];
export const mockAddresses = [
  'ул. Мира 12',
  'ул. Ленина 14',
  'ул. Московская, 11',
];
export const mockOwnership = ['100%', '50%', '25%'];

export const realEstateExample = {
  hasRealEstate: true,
  objects: [
    {
      type: mockRealEstateType[0],
      address: mockAddresses[0],
      ownership: mockOwnership[0],
    },
    {
      type: mockRealEstateType[2],
      address: mockAddresses[1],
      ownership: mockOwnership[2],
    },
  ],
};
