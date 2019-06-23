const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

const { User } = require('../model/user')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要传入正整数', {
        min: 1
      })
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ],
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$")
    ],
    this.password2 = this.password1,
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      }),
    ]
  }

  validatePassword (vals) {
    const password1 = vals.body.password1
    const password2 = vals.body.password2
    if (password1 !== password2) {
      throw new Error('两个密码不一致')
    }
  }

  async validateEmail (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    
    if (user) {
      throw new Error('邮箱已存在')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}