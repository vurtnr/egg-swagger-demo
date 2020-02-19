'use strict';

module.exports = {
  loginRequest: {
    mobile: {
      type: 'string',
      required: true,
      description: '手机号',
      example: '13873838438',
      format: /^1[3456789]\d{9}$/,
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '111111',
    },
  },
};
