'use strict';
/**
 * 全局定义
 * @param app
 */

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad() {

  }

  configDidLoad() {

  }

  async didLoad() {

  }
  async willReady() {

  }
  async didReady() {
    const ctx = await this.app.createAnonymousContext();
    await ctx.model.User.remove();
    await ctx.service.user.create({
      mobile: '13915841973',
      password: '123456',
      realName: 'vurtne',
    });
  }

  async serverDidReady() {

  }

  async beforeClose() {

  }

}

module.exports = AppBootHook;
