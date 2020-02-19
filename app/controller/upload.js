'use strict';

const fs = require('fs');
const path = require('path');
const { Controller } = require('egg');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const download = require('image-downloader');

/**
 * @Controller 上传
 */

class UploadController extends Controller {

  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 上传单个文件
   * @description 上传单个文件
   * @router post /api/upload/single
   */
  async create() {
    const { ctx } = this;
    // 要通过ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件
    // 只支持上传一个文件
    // 上传文件必须在所有其他的fields后面，否则在拿到文件流时可能还获取不到fields
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields`获取到
    const filename = path.basename(stream.filename);
    const extname = path.extname(stream.filename).toLowerCase();
    const uuid = (Math.random() * 999999).toFixed();
    // 组装参数stream
    const target = path.join(this.config.baseDir, 'app/public/uploads', `${filename}${uuid}${extname}`);
    const writeStream = fs.createWriteStream(target);
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器会卡斯
      await sendToWormhole(stream);
      throw err;
    }
    ctx.helper.success({ ctx });
  }

}
module.exports = UploadController;
