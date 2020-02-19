'use strict';

const { Controller } = require('egg');

/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {

  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 用户登入
   * @description 用户登入
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async login() {
    this.ctx.validate(this.ctx.rule.loginRequest);
    const payload = this.ctx.request.body || {};
    const res = await this.ctx.service.userAccess.login(payload);
    this.ctx.helper.success({ ctx: this.ctx, res });
  }

  /**
   * @summary 用户登出
   * @description 用户登出
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async logout() {
    await this.ctx.service.userAccess.logout();
    this.ctx.helper.success({ ctx: this.ctx });
  }

}

module.exports = UserAccessController;

