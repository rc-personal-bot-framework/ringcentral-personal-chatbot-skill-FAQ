import Faq from './model'
import extendApp from './app'

export const name = 'Bot skill: FAQ'
export const description = 'Respond to any keywords user defined with corresponding answer'
export const homepage = 'https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-skill-faq#readme'

function hasKeywords (ks, txt) {
  for (let k of ks) {
    if (txt.includes(k)) {
      return true
    }
  }
  return false
}

export const onPostAdd = async ({
  text, // original text
  textFiltered, // text without metion user
  group,
  user,
  handled, // hanlded by prev skills
  shouldUseSignature // should use signature like "send by bot skill xxx" in message.
}) => {
  if (handled) {
    return false
  }
  let faqs = await Faq.findAll({
    where: {
      user_id: user.id
    }
  }).map(r => r.get({
    plain: true
  }))
  let res = ''
  for (let faq of faqs) {
    let ks = faq.keywords.split(',').map(r => r.trim())
    if (hasKeywords(ks, textFiltered)) {
      res = faq.answer
      break
    }
  }
  if (res) {
    let sign = shouldUseSignature
      ? `\n(send by [${exports.name}](${exports.homepage}))`
      : ''
    await user.sendMessage(group.id, {
      text: res + sign
    })
    return true
  } else {
    return false
  }
}

export const appExtend = extendApp
export const settingPath = '/skill/faq/setting'
