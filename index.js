import { Telegraf, Markup } from "telegraf";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { arrayFunnyWords, funnyWord } from "./utils/arrays/funnyPhrase.js";
dotenv.config();
import { randomTime } from "./utils/random/random.js";
import { createIfNotExist } from "./services/userService.js";
import { badWords, joinWords } from "./utils/words/badWords.js";
// import developer from "./utils/functions/functionsReply.js";
mongoose
  .connect(
    "mongodb+srv://tatarynrm:Aa527465182@baby-shop.koyb4bl.mongodb.net/noris-bot?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is ok"))
  .catch((error) => console.log("Error", error));

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
  const user = ctx.message.from;
  createIfNotExist(user);
  await bot.telegram.sendMessage(
    ctx.chat.id,
    `Привіт @${ctx.message.from.username}
Спілкуйтесь в чаті,та заробляйте бонуси!\nВ подальшому плануються розіграші крутих гаджетів!
`,
    {
      reply_markup: {
        keyboard: [
          [{ text: `Поділитися контактом` }, { text: `Моя статистика` }],
          [{ text: `Зв'язок з розробником` }],
        ],
        resize_keyboard: true,
      },
    }
  );
});
bot.command("check", async (ctx) => {
  const targetChatId = -1001536630827; // ID of the group to check the member status in
  const userId = 5495860479; // ID of the user to check the status of

  // Get information about the user in the target group
  const chatMember = await bot.telegram.getChatMember(targetChatId, userId);

  // Check the user's status
  switch (chatMember.status) {
    case "creator":
      ctx.reply("This user is the creator of the group");
      break;
    case "administrator":
      ctx.reply("This user is an administrator in the group");
      break;
    case "member":
      ctx.reply("This user is a member in the group");
      break;
    case "restricted":
      ctx.reply("This user is restricted in the group");
      break;
    case "left":
      ctx.reply("This user has left the group");
      break;
    case "kicked":
      ctx.reply("This user has been kicked from the group");
      break;
    default:
      ctx.reply("Unable to determine the user status");
  }
});
// bot.on("message", async (ctx) => {
//   const countMembers = [];
//   await ctx.getChatMembersCount(ctx.message.chat.id).then((count) => {
//     console.log("Список усіх юзерів 41 стрічка", count);
//     countMembers.push(count);
//     console.log(count);
//   });
//   await ctx.replyWithHTML(
//     `<i>Учасників в групі</i>: <b>${countMembers[0]}</b>`
//   );
// });
// bot.command("users", async (ctx) => {
//   await ctx.replyWithHTML(`commands`);
// });
bot.hears(`Зв'язок з розробником`, async (ctx) => {
  await ctx.reply(
    "Напишіть свої побажання, щодо покращення , чи розширення функціоналу 🖐️ ",
    Markup.inlineKeyboard([
      Markup.button.callback("Написати розробнику", "all right"),
    ])
  );
});
bot.action("all right", (ctx) => {
  ctx.editMessageText("🤖 Розробник: @web_developer_Ukraine");
});
bot.on("new_chat_members", async (ctx) => {
  for (let i = 0; i < ctx.message.new_chat_members.length; i++) {
    // const message = `Вітаю в нашому чаті, ${ctx.message.new_chat_members[0].username}!`;
    const element = ctx.message.new_chat_members[i];
    // console.log(element.username);
    const message = `Привіт @${element.username}\n${funnyWord(
      arrayFunnyWords
    )}\nТепер ти можеш підписатись на нашого бота.\nКнопка знаходиться в закріпленому повідомленні ⬆️⬆️⬆️`;
    const chat_id = element.id;
    await ctx.sendMessage(message, chat_id, { parse_mode: "HTML" });
  }
});

bot.hears("Поділитися контактом", async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    "Поділіться вашим номером телефону",
    {
      parse_mode: "Markdown",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [
            {
              text: "Поділитись номером телефону",
              request_contact: true,
            },
            {
              text: "Відхилити",
            },
          ],
        ],
        force_reply: true,
      },
    }
  );
});
bot.on("contact", async (ctx) => {
  const user = ctx.message.from;
  const contact = ctx.message.contact.phone_number;
  createIfNotExist(user, contact);

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    "Поділіться вашим номером телефону",
    {
      parse_mode: "Markdown",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [
            {
              text: "/start",
            },
          ],
        ],
        force_reply: true,
      },
    }
  );
});
bot.on("message", async (ctx) => {
  // console.log(ctx.message.chat.id);
  // // console.log(await ctx.getChatMember(ctx.message.from.id));
  // const chatId = ctx.message.from.id;
  // const pass = ctx.getChatMember(chatId);

  // console.log(pass);

  // const targetChatId = "@lachentyt"; // ID of the group to check the member status in
  // const userId = ctx.message.from.id; // ID of the user to check the status of

  // // Get information about the user in the target group
  // const chatMember = await bot.telegram.getChatMember(targetChatId, userId);
  // console.log(chatMember.status);
  if (ctx.message.chat.id === -1001679213988) {
    setTimeout(() => {
      ctx.replyWithHTML(
        `@${ctx.message.from.username} ${funnyWord(
          arrayFunnyWords
        )} \nПідпишись на нашого бота,для подальшого спілкування в чаті`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Підпиcатись🔥",
                  url: "https://t.me/noris_chat_bot",
                },
              ],
            ],
          },
        }
      );
    }, Math.floor(Math.random() * 20000));
  }
  // console.log(ctx);
  // setTimeout(() => {
  //   ctx.sendMessage(
  // `@${ctx.message.from.username} ${funnyWord(
  //   arrayFunnyWords
  // )} \nПідпишись на на бота`
  //   );
  // }, 3000);
  // console.log(ctx.message.from.id);
  // ctx.telegram.sendMessage(ctx.message.from.id, "ok");
});
// bot.hears("user", async (ctx) => {
//   ctx.sendMessage("dsadadsa", -1001679213988);
// });

bot.command("inline", async (ctx) => {
  setTimeout(() => {
    ctx.replyWithHTML(
      `🟢Підпишіться на бота ➡️\n💬В даному чаті,вас чекає багацько різноманітних "плюшок"🎁\nУ нас є рейтингова система🥇\nДля реєстрації,просто необхідно бути підписаним на нашого 🤖\nСписок усіх доступних команд ви зможете знайти в даному боті\nТакож є список заборонених слів,які вам необхідно буде знайти самостійно😈\n🇺🇦🇺🇦🇺🇦СЛАВА УКРАЇНІ!🇺🇦🇺🇦🇺🇦.\nЗапросити друзів,ви можете за цим посиланням,просто клацніть на нього, і воно буде скопійоване 🧲\n👉👉👉  <code>https://t.me/+IYDH75OXpqZlMjky</code>   👈👈👈`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Підпиcатись🔥",
                url: "https://t.me/noris_chat_bot",
              },
            ],
          ],
        },
      }
    );
  }, 1000);
  // Math.floor(Math.random() * 10000)
});

bot.on("message", async (ctx) => {
  if (ctx.message.text) {
    const messages = [];
    const message =
      ctx.message.text.toLowerCase() ||
      ctx.message.text.toUpperCase() ||
      ctx.message.text.charAt(0).toLowerCase() ||
      ctx.message.text.charAt(0).toUpperCase();
    const message_id = ctx.message.message_id;
    let array = messages.push(message_id);
    console.log("array", array);

    for (let item of badWords) {
      if (message.includes(item)) {
        ctx.deleteMessage(message_id);
        for (let i = 0; i < message_id.length; i++) {
          const element = message_id[i];
          ctx.deleteMessage(array);
        }
        ctx.replyWithHTML(
          `@${ctx.message.from.username}🤬🤬🤬\nВи вжили заборонене слово.\nСписок заборонених слів, ви можете переглянути в нашому боті🧘‍♂️🧘‍♂️`
        );
      }
    }
  }
});

// bot.on("message", async (ctx) => {
//   if (ctx.message.text) {
//     const messages = [];
//     const message =
//       ctx.message.text.toLowerCase() ||
//       ctx.message.text.toUpperCase() ||
//       ctx.message.text.charAt(0).toLowerCase() ||
//       ctx.message.text.charAt(0).toUpperCase();
//     const message_id = ctx.message.message_id;
//     let array = messages.push(message_id);
//     console.log("array", array);

//     for (let item of joinWords) {
//       if (message.includes(item)) {
//         ctx.deleteMessage(message_id);
//         for (let i = 0; i < message_id.length; i++) {
//           const element = message_id[i];
//           ctx.deleteMessage(array);
//         }
//         ctx.replyWithHTML(
//           `@${ctx.message.from.username}🤬🤬🤬\nВи вжили заборонене слово.\nСписок заборонених слів, ви можете переглянути в нашому боті🧘‍♂️🧘‍♂️`
//         );
//       }
//     }
//   }
// });

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
