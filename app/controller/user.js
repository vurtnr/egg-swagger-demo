/* eslint-disable no-useless-constructor */
'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户 记录用户账户/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;

    ctx.validate(ctx.rule.createUserRequest);

    const payload = ctx.request.body || {};
    const res = await ctx.service.user.create(payload);
    // 设置响应内容
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async destory() {
    const { id } = this.ctx.params;
    await this.ctx.service.user.destory(id);
    this.ctx.helper.success({ ctx: this.ctx });
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /api/user
   * @response 200 baseResponse 创建成功
   * @ignore
   */
  async update() {
    this.ctx.validate(this.ctx.rule.createUserRequest);
    const { id } = this.ctx.params;
    const payload = this.ctx.request.body || {};
    await this.service.user.update(id, payload);
    this.ctx.helper.success({ ctx: this.ctx });
  }

  /**
   * @summary 获取单个用户
   * @description 获取用户信息
   * @router get /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { id } = this.ctx.params;
    const res = await this.service.user.show(id);
    this.ctx.helper.success({ ctx: this.ctx, res });
  }

  /**
   * @summary 获取所有用户（分页/模糊）
   * @description 获取用户新秀
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const payload = this.ctx.query;
    const res = await this.ctx.service.user.index(payload);
    this.ctx.helper.success({ ctx: this.ctx, res });
  }

  /**
   * @summary 删除所选用户
   * @description 获取用户信息
   * @router delete /apo/user/{id}
   * @request path string *id
   * @response 200 baseResponse 创建成功
   */
  async removes() {
    const { id } = this.ctx.request.body;
    const payload = id.split(',') || [];
    const res = await this.service.user.removes(payload);
    this.ctx.helper.success({ ctx: this.ctx,res });
  }
}


module.exports = UserController;
