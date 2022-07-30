const { Telegraf, Markup } = require('telegraf')
require('dotenv').config();
const commands = require('./const')
const text0 = require('./const')
const text1 = require('./const')
const text2 = require('./const')
const text3 = require('./const')

const bot = new Telegraf(process.env.BOTOKEN)
bot.start((ctx) => ctx.reply(`Спящий пробудился! Чего изволишь, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'кожаный'} ?!`))
bot.help((ctx) => ctx.reply(commands))

bot.command('course', async (ctx) => {
  try {
      await ctx.replyWithHTML('<b>DozoR</b>', Markup.inlineKeyboard(
        [
          [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')], [Markup.button.callback('3', 'btn_3'), Markup.button.callback('4', 'btn_4')]
        ]
      ))
    } 
  catch (e) {
      console.error(e);
    }
})


function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if(src !== false) {
        await ctx.replyWithPhoto({
          source: src
        })
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true
      })
    } catch (e) {
      console.error(e)
    }
  })
}

addActionBot('btn_1', './img/1.jpg', text0)
addActionBot('btn_2', './img/2.jpg', text1)
addActionBot('btn_3', './img/3.jpg', text2)
addActionBot('btn_4', false, text3)

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

//