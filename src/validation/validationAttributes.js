const validationAtributtes = (param1, param2, param3) => {
  // const IF_THREE = 3;
  // const IF_FIVE = 5;

  if (!param1 || !param2 || !param3) {
    return true;    
  }

  return false;
};

module.exports = validationAtributtes;
