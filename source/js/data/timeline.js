/* eslint-disable no-script-url */
import { SkillType, TimelineType } from '~/common/enums'

const timelineData = [
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Beginner 2`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2018-08-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Elementary 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2018-11-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `21 true answer. How to change your attitude to life (Andrey Kurpatov)`,
    date: `2018-12-12T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Elementary 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2019-01-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Hold Me Tight (Sue Johnson)`,
    origin: `https://www.amazon.com/Hold-Me-Tight-Conversations-Lifetime/dp/1491513810`,
    originDesc: `Amazon`,
    date: `2019-01-05T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `Kyiv JS Meetup`,
    desc: `❤️☘️`,
    origin: `http://kyivjs.org/`,
    originDesc: `kyivjs`,
    date: `2019-02-07T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.MEETUP,
    title: `Zlit`,
    origin: `https://www.facebook.com/events/344797292768145`,
    originDesc: `Zlit`,
    date: `2019-02-23T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Miracle Morning (Hal Elrod)`,
    origin: `https://www.amazon.com/Miracle-Morning-Not-So-Obvious-Guaranteed-Transform/dp/0979019710`,
    originDesc: `Amazon`,
    date: `2019-02-08T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.WORK,
    title: `Web-Coder (KIES - SEO company)`,
    desc: `Rewrote the entire front-end part of the project. Bootstrap and jquery were completely removed from the project. Made indicators Lighthouse 100% in 4 sections, and etc.`,
    date: `2019-02-12T00:00:00+03:00`,
    endDate: `2019-07-31T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Sleep Smarter: 21 Essential Strategies to Sleep Your Way to A Better Body, Better Health, and Bigger Success (Shawn Stevenson)`,
    origin: `https://www.amazon.com/Sleep-Smarter-Essential-Strategies-Success-ebook/dp/B019G14UQI`,
    originDesc: `Amazon`,
    date: `2019-02-15T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Tipping Point: How Little Things Can Make a Big Difference (Malcolm Gladwell)`,
    origin: `https://www.amazon.com/Tipping-Point-Little-Things-Difference-ebook/dp/B000OT8GD0`,
    originDesc: `Amazon`,
    date: `2019-02-26T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `JavaScript for Kids: A Playful Introduction to Programming (Nick Morgan)`,
    origin: `https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming/dp/1593274084`,
    originDesc: `Amazon`,
    date: `2019-03-10T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `JavaScript: The Good Parts (Douglas Crockford)`,
    origin: `https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742`,
    originDesc: `Amazon`,
    date: `2019-03-22T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Elementary 2`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2019-04-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 1: The Space of Variations (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-1-Space-Variations/dp/1846941229`,
    originDesc: `Amazon`,
    date: `2019-04-22T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `Kyiv JS Meetup`,
    desc: `❤️☘️`,
    origin: `http://kyivjs.org/`,
    originDesc: `kyivjs`,
    date: `2019-04-28T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 2: A Rustle of Morning Stars (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-Rustle-Morning-Stars/dp/1846941318`,
    originDesc: `Amazon`,
    date: `2019-05-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `Zlit Tech: GraphQL`,
    origin: `https://www.facebook.com/events/635302956897916/`,
    originDesc: `Zlit`,
    date: `2019-05-10T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Jedi techniques. How to raise your monkey, empty the inbox and save thought (Maxim Dorofeev)`,
    date: `2019-05-29T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Gift from the Sea (Anne Morrow Lindbergh)`,
    origin: `https://www.amazon.com/Gift-50th-Anniversary-Anne-Morrow-Lindbergh/dp/0679732411`,
    originDesc: `Amazon`,
    date: `2019-06-05T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The 5 Love Languages: The Secret to Love that Lasts (Gary Chapman)`,
    origin: `https://www.amazon.com/Love-Languages-Secret-that-Lasts/dp/080241270X`,
    originDesc: `Amazon`,
    date: `2019-06-15T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Intermediate 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2019-07-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 3: Forward to the Past (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-3-Forward-Past/dp/1846941326`,
    originDesc: `Amazon`,
    date: `2019-07-10T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `Grokking Algorithms: An illustrated guide for programmers and other curious people (Aditya Bhargava)`,
    origin: `https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230`,
    originDesc: `Amazon`,
    date: `2019-07-18T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know Js: Up & Going (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491924462`,
    originDesc: `Amazon`,
    date: `2019-07-24T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `RN Talks #4 - Intro to Flutter & Declarative UI Development in Android`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/262091679/`,
    originDesc: `React Native Ukraine`,
    date: `2019-07-26T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know JS: Scope & Closures (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1449335586`,
    originDesc: `Amazon`,
    date: `2019-07-26T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.MEETUP,
    title: `Zlit`,
    origin: `https://www.facebook.com/events/2336186943281063/`,
    originDesc: `Zlit`,
    date: `2019-08-10T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 4: Ruling Reality (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-4-Ruling/dp/1846946611`,
    originDesc: `Amazon`,
    date: `2019-08-16T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `To Have or To Be? (Erich Fromm)`,
    origin: `https://www.amazon.com/Have-Be-Bloomsbury-Revelations/dp/178093680X`,
    originDesc: `Amazon`,
    date: `2019-08-26T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Intermediate 2`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2019-09-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Art of Loving (Erich Fromm)`,
    origin: `https://www.amazon.com/Art-Loving-Erich-Fromm/dp/0061129739`,
    originDesc: `Amazon`,
    date: `2019-09-03T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `Wix Talks #3. Front-end`,
    origin: `https://www.meetup.com/Wix_Kyiv/events/264307604/`,
    originDesc: `React Kyiv`,
    date: `2019-09-04T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `The JavaScript language. Part 1 (Ilya Kantor)`,
    desc: `P.S. My love ❤️`,
    origin: `https://javascript.info/js`,
    originDesc: `learn.javascript`,
    date: `2019-09-16T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `React Kyiv September Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/264985817/`,
    originDesc: `React Kyiv`,
    date: `2019-10-26T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.WORK,
    title: `Front-End developer (SGroup - Holding)`,
    desc: `Reduced the size of the average project bundle from 8 MB to <1.5 MB. Completely removed jquery, bootstrap, uikit and other libraries/frameWORK on projects where it was necessary(refactoring everything to pure JS), and etc.`,
    date: `2019-08-10T00:00:00+03:00`,
    endDate: `2019-09-30T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `React Native Ukraine #5`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/265208271/`,
    originDesc: `React Native Ukraine`,
    date: `2019-10-08T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know Js: this & Object Prototypes (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904151`,
    originDesc: `Amazon`,
    date: `2019-10-14T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know Js: Types & Grammar (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904194`,
    originDesc: `Amazon`,
    date: `2019-10-24T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know Js: Async & Performance (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904224`,
    originDesc: `Amazon`,
    date: `2019-10-28T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `The JavaScript language. Part 2 - Browser: Document, Events, Interfaces (Ilya Kantor)`,
    origin: `https://javascript.info/ui`,
    originDesc: `learn.javascript`,
    date: `2019-11-02T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `You Don't Know JS: ES6 & Beyond (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904240`,
    originDesc: `Amazon`,
    date: `2019-11-14T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `The JavaScript language. Part 3 - Additional articles (Ilya Kantor)`,
    origin: `https://javascript.info/`,
    originDesc: `learn.javascript`,
    date: `2019-11-28T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Upper Intermediate 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2019-12-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `React Kyiv December Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/267224761/`,
    originDesc: `React Kyiv`,
    date: `2019-12-14T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `Ciklum University: JS Band Internship`,
    origin: `https://ciklum-digital.github.io/internship/#/`,
    originDesc: `JS Band Internship`,
    date: `2019-11-04T00:00:00+03:00`,
    endDate: `2019-12-29T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Tajna - The Secret (Rhonda Byrne)`,
    origin: `https://www.amazon.com/Tajna-Secret-Rhonda-Ronda-Bern/dp/B079YRG9TQ`,
    originDesc: `Amazon`,
    date: `2020-01-02T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 4: Ruling Reality (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-4-Ruling/dp/1846946611`,
    originDesc: `Amazon`,
    date: `2020-01-15T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.WORK,
    title: `JavaScript Developer (Binary Studio)`,
    origin: `https://binary-studio.com/`,
    originDesc: `Binary Studio`,
    desc: `Just love ❤️`,
    date: `2020-01-22T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Think and Grow Rich (Napoleon Hill)`,
    origin: `https://www.amazon.com/Think-Grow-Rich-ebook/dp/B001NGN2D2`,
    originDesc: `Amazon`,
    date: `2020-01-29T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `React Native Ukraine #6`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/268108464/`,
    originDesc: `React Native Ukraine`,
    date: `2020-01-30T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Emotional Agility: Get Unstuck, Embrace Change, and Thrive in Work and Life (Susan David)`,
    origin: `https://www.amazon.com/Emotional-Agility-Unstuck-Embrace-Change/dp/1592409490`,
    originDesc: `Amazon`,
    date: `2020-02-04T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.MEETUP,
    title: `React Kyiv February Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/268602187/`,
    originDesc: `React Kyiv`,
    date: `2020-02-13T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `React in Action (Mark Tielens Thomas)`,
    origin: `https://www.amazon.com/React-Action-Mark-Tielens-Thomas/dp/1617293857`,
    originDesc: `Amazon`,
    date: `2020-02-14T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `HTML and CSS. Professional Website Coding`,
    origin: `https://htmlacademy.ru/intensive/htmlcss`,
    originDesc: `Course link`,
    desc: `Work with the git version control system. Work with the graphic layout in the Figma editor. Create expressive and accessible markup. Build page layout on CSS grids, work with custom properties, optimize the code and prepare the completed project for publication. At each stage, the work is checked and commented by a personal mentor.`,
    link: `https://assets.htmlacademy.ru/certificates/intensive/155/573447.pdf?1583661065`,
    linkDesc: `Certificate`,
    date: `2020-01-20T00:00:00+03:00`,
    endDate: `2020-03-22T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Life-Changing Magic of Tidying Up (Marie Kondo)`,
    origin: `https://www.amazon.com/Life-Changing-Magic-Tidying-Decluttering-Organizing/dp/1607747308`,
    originDesc: `Amazon`,
    date: `2020-02-24T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Upper Intermediate 2`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2020-03-01T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Games People Play: The Basic Handbook of Transactional Analysis (Eric Berne)`,
    origin: `https://www.amazon.com/Games-People-Play-Transactional-Analysis/dp/0345410033`,
    originDesc: `Amazon`,
    date: `2020-03-03T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `HTML and CSS. Adaptive Website Coding and Automation`,
    origin: `https://htmlacademy.ru/intensive/adaptive`,
    originDesc: `Course link`,
    desc: `Create markup according to the BEM methodology. CSS-code on preprocessors. Make an adaptive grid, work with layout and retin graphics. Prepare project assembly automation for publication. At each stage, the work is checked and commented by a personal mentor.`,
    link: `https://assets.htmlacademy.ru/certificates/intensive/157/573447.pdf?1588515571`,
    linkDesc: `Certificate`,
    date: `2020-03-23T00:00:00+03:00`,
    endDate: `2020-05-27T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `HTML5 Pocket Reference: Quick, Comprehensive, Indispensable (Jennifer Robbins)`,
    origin: `https://www.amazon.com/HTML5-Pocket-Reference-Comprehensive-Indispensable/dp/1449363350`,
    originDesc: `Amazon`,
    date: `2020-04-18T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `How to Have Rewarding Relationships (Dale Carnegie)`,
    origin: `https://www.amazon.com/Have-Rewarding-Relationships-Paperback-CARNEGIE/dp/9387383490`,
    originDesc: `Amazon`,
    date: `2020-05-24T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Advanced 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2020-05-24T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `JavaScript. Professional Development of Web Interfaces`,
    origin: `https://htmlacademy.ru/intensive/javascript`,
    originDesc: `Course link`,
    desc: `Code and Magick`,
    link: `https://assets.htmlacademy.ru/certificates/intensive/167/573447.pdf?1593535197`,
    linkDesc: `Certificate`,
    date: `2020-05-26T00:00:00+03:00`,
    endDate: `2020-07-29T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `Eloquent JavaScript (Marijn Haverbeke)`,
    origin: `https://eloquentjavascript.net/`,
    originDesc: `eloquentjavascript.net`,
    date: `2020-07-11T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Skin in the Game (Nassim Nicholas Taleb)`,
    origin: `https://www.amazon.com/Skin-Game-Hidden-Asymmetries-Daily/dp/042528462X`,
    originDesc: `Amazon`,
    date: `2020-07-12T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Master Key System (Charles F. Haanel)`,
    origin: `https://www.amazon.com/Master-Key-System-Charles-Haanel/dp/1604502754`,
    originDesc: `Amazon`,
    date: `2020-07-27T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Advanced 2`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2020-08-03T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Rip it up (Richard Wiseman)`,
    origin: `https://www.amazon.com/Rip-Up-Richard-Wiseman/dp/1531845401`,
    originDesc: `Amazon`,
    date: `2020-08-09T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `CSS Pocket Reference. 5th edition (Eric A. Meyer)`,
    origin: `https://www.amazon.com/CSS-Pocket-Reference-Visual-Presentation/dp/1492033391`,
    originDesc: `Amazon`,
    date: `2020-08-12T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Outward Mindset: Seeing Beyond Ourselves (the Arbinger Institute)`,
    origin: `https://www.amazon.com/Outward-Mindset-Seeing-Beyond-Ourselves/dp/1626567158`,
    originDesc: `Amazon`,
    date: `2020-08-18T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Reality Transurfing 5: Apples Fall to the Sky (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-Apples-Vadim-Zeland/dp/B00DIKWYJ4`,
    originDesc: `Amazon`,
    date: `2020-08-23T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `A Return to Love: Reflections on the Principles of "A Course in Miracles" (Marianne Williamson)`,
    origin: `https://www.amazon.com/Return-Love-Reflections-Principles-Miracles/dp/0060927488`,
    originDesc: `Amazon`,
    date: `2020-08-28T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `JavaScript. Architecture of Front-end Applications`,
    origin: `https://htmlacademy.ru/intensive/ecmascript`,
    originDesc: `Course link`,
    desc: `"Bad programmers worry about the code. Good programmers worry about data structures and their relationships." © Linus Torvalds`,
    link: `https://assets.htmlacademy.ru/certificates/intensive/169/573447.pdf`,
    linkDesc: `Certificate`,
    date: `2020-07-27T00:00:00+03:00`,
    endDate: `2020-09-30T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `The Power of Now (Eckhart Tolle)`,
    origin: `https://www.amazon.com/Power-Now-Guide-Spiritual-Enlightenment/dp/1577314808`,
    originDesc: `Amazon`,
    date: `2020-10-11T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Stillness Speaks (Eckhart Tolle)`,
    origin: `https://www.amazon.com/Stillness-Speaks-Eckhart-Tolle/dp/157731400X`,
    originDesc: `Amazon`,
    date: `2020-10-20T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `React. Development of Complex Front-end Applications`,
    origin: `https://htmlacademy.ru/intensive/react`,
    originDesc: `Course link`,
    desc: `"Does my code work correctly? Depends on what "correctly" means."`,
    link: `https://assets.htmlacademy.ru/certificates/intensive/171/573447.pdf`,
    linkDesc: `Certificate`,
    date: `2020-09-28T00:00:00+03:00`,
    endDate: `2020-12-02T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.COURSE,
    title: `Profession. React Developer`,
    origin: `https://htmlacademy.ru/profession/react`,
    originDesc: `Course link`,
    desc: `⚛️`,
    link: `https://assets.htmlacademy.ru/certificates/profession/13/573447.pdf`,
    linkDesc: `Certificate`,
    date: `2020-01-20T00:00:00+03:00`,
    endDate: `2020-12-02T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.COURSE,
    title: `SpeakUp: Master 1`,
    origin: `https://www.speak-up.com.ua/`,
    originDesc: `SpeakUp`,
    date: `2020-11-08T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Breaking The Habit of Being Yourself: How to Lose Your Mind and Create a New One (Joe Dr. Dispenza)`,
    origin: `https://www.amazon.com/Breaking-Habit-Being-Yourself-Create/dp/1401938094`,
    originDesc: `Amazon`,
    date: `2020-12-12T00:00:00+03:00`,
  },
  {
    skillType: SkillType.HARD_SKILL,
    type: TimelineType.BOOK,
    title: `CSS Secrets: Better Solutions to Everyday Web Design Problems (Lea Verou)`,
    origin: `https://www.amazon.com/CSS-Secrets-Solutions-Everyday-Problems/dp/1449372635`,
    originDesc: `Amazon`,
    date: `2020-12-18T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Emotional Intelligence (Daniel Goleman)`,
    origin: `https://www.amazon.com/Emotional-Intelligence-Matter-More-Than/dp/055338371X`,
    originDesc: `Amazon`,
    date: `2020-12-23T00:00:00+03:00`,
  },
  {
    skillType: SkillType.SOFT_SKILL,
    type: TimelineType.BOOK,
    title: `Man's Search For Meaning (Victor Frankl)`,
    origin: `https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl-ebook/dp/B009U9S6FI`,
    originDesc: `Amazon`,
    date: `2021-01-04T00:00:00+03:00`,
  },
]

export { timelineData }
