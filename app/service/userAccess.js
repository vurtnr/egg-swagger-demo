'use strict';

const { Service } = require('egg');

class UserAccessService extends Service {

  async login(payload) {
    const user = await this.ctx.service.user.findByMobile(payload.mobile);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    const verifyPsw = await this.ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      this.ctx.throw(404, 'user password is error');
    }
    return { token: await this.ctx.service.actionToken.apply(user._id) };
  }

  async logout() {

  }

  async current() {
    const _id = this.ctx.locals.user.data._id;
    const user = await this.ctx.service.user.find(_id);
    if (!user) {
      this.ctx.throw(404, 'user is not found');
    }
    user.password = 'how old are you ';
    return user;
  }

}

module.exports = UserAccessService;
