const serverErrCodes = {
  'Internal Server Error': 500,
  'Not Implemented': 501,
  'Bad Gateway': 502,
  'Service Unavailable': 503,
  'Gateway Timeout': 504,
  'HTTP Version Not Supported': 505,
  'Variant Also Negotiates': 506,
  'Insufficient Storage': 507,
  'Loop Detected': 508,
  'Not Extended': 510,
  'Network Authentication Required': 511,
  'Network Connect Timeout Error': 599,
};

module.exports = serverErrCodes;
