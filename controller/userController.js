const db = require('../config/db')

/**
 * 注册接口逻辑
 */
exports.registerController = (req,res) => {
  // 用户名或者密码判空的校验
  let { userName, password } = req.body;
  if (!userName || !password) {
      return res.send({ code: 1, message: '用户名或者密码不能为空' })
  }
  // 用户名查重的逻辑
  const userSelectSql = 'select * from user where name=?';
	db.query(userSelectSql, userName, (err, results) => {
    if (err) {
        return res.send({ code: 1, message: err.message })
    }

    // 判断用户是否存在
    if (results.length > 0) {
        return res.send({ code: 1, message: '用户名已存在' });
    }

    //用户密码加密
    const bcrypt = require('bcryptjs')
    const passwordB = bcrypt.hashSync(password, 10);

    //随机生成用户的头像
    const imgList = [
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
    ];
    const num = Math.floor(Math.random() * 10 + 1);

    //用户信息插入数据库
    const userInsertSql = 'insert into user (name,pwd,head_img) value (?,?,?)';
    db.query(
      userInsertSql,
      [userName, passwordB, imgList[num]],
      (err, results) => {
        if (err) {
          return res.send({ code: 1, message: err.message });
        }
        res.send({
          code: 0,
          message: '注册成功',
        });
      }
    );
    })
};