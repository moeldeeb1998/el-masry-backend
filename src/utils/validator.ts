export const validateUUID = (id: string) => {
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  const isValidUUID = uuidPattern.test(id);

  if (isValidUUID) {
    console.log('Valid UUID');
    return {
      status: true,
      message: '',
    };
  } else {
    return {
      status: false,
      message: 'id is not valid',
    };
  }
};
