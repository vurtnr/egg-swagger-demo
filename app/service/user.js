'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  /**
   *
   * @param {删除用户} _id
   */
  async destory(_id) {
    const { ctx } = this;
    const user = await this.find(_id);
    console.log(_id);
    console.log('user:', user);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return ctx.model.User.findByIdAndRemove(_id);
  }

  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
    const { ctx } = this;
    const user = await this.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return this.findByIdAndUpdate(_id, payload);
  }

  /**
   * 查看单个用户
   * @param {*} _id
   */
  async show(_id) {
    const user = this.find(_id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return this.ctx.model.User.findById(_id).populate('role');
  }

  /**
   * 查看用户列表
   * @param {*} payload
   */
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload;
    let res = [];
    let count = 0;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } })
          .populate('role')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      }
    } else {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } })
          .populate('role')
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.User.count({}).exec();
      } else {
        res = await this.ctx.model.User.find({})
          .populate('role')
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.User.count({}).exec();
      }
    }
    const data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.password = 'Are you ok?';
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
      return jsonObject;
    });
    return {
      count,
      list: data,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }

  /**
   * 删除多个用户
   * @param {*} payload
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } });
  }

  /**
   * 根据手机号查找
   * @param {*} mobile
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile });
  }

  /**
   * 更新用户信息
   * @param {*} id
   * @param {*} values
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }

  /**
   * 查找用户
   * @param {*} id
   */
  async find(id) {
    return this.ctx.model.User.findById(this.app.mongoose.Types.ObjectId(id));
  }
}

module.exports = UserService;
