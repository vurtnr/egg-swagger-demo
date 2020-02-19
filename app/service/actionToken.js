'use strict';

const { Service } = require('egg');

class ActionTokenService extends Service {

  async apply(_id) {
    return this.ctx.app.jwt.sign({
      data: {
        _id,
      },
      exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7)),
    }, this.ctx.app.config.jwt.secret);
  }

}

module.exports = ActionTokenService;
