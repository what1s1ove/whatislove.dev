import { TimelimeSkillTypes, TimelimeTypes } from '../common/map/index'

const BASE_COURSES_URL = `files/courses`

const timelineData = [
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `21 true answer. How to change your attitude to life (Andrey Kurpatov)`,
    date: `2019-01-01T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Hold Me Tight (Sue Johnson)`,
    origin: `https://www.amazon.com/Hold-Me-Tight-Conversations-Lifetime/dp/1491513810`,
    originDesc: `Amazon`,
    date: `2019-01-05T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Kyiv JS Meetup`,
    desc: `❤️☘️`,
    origin: `http://kyivjs.org/`,
    originDesc: `kyivjs`,
    date: `2019-02-07T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Zlit`,
    origin: `https://www.facebook.com/events/344797292768145`,
    originDesc: `Zlit`,
    date: `2019-02-23T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The Miracle Morning (Hal Elrod)`,
    origin: `https://www.amazon.com/Miracle-Morning-Not-So-Obvious-Guaranteed-Transform/dp/0979019710`,
    originDesc: `Amazon`,
    date: `2019-02-08T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.WORKS,
    title: `Web-Coder (KIES - SEO company)`,
    desc: `Rewrote the entire front-end part of the project. Bootstrap and jquery were completely removed from the project. Rewrote everything into pure HTML, CSS, JS. Made indicators Lighthouse 100% in 4 sections, and etc. See more in my CV.`,
    date: `2019-02-12T00:00:00+03:00`,
    endDate: `2019-07-31T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Sleep Smarter: 21 Essential Strategies to Sleep Your Way to A Better Body, Better Health, and Bigger Success (Shawn Stevenson)`,
    origin: `https://www.amazon.com/Sleep-Smarter-Essential-Strategies-Success-ebook/dp/B019G14UQI`,
    originDesc: `Amazon`,
    date: `2019-02-15T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The Tipping Point: How Little Things Can Make a Big Difference (Malcolm Gladwell)`,
    origin: `https://www.amazon.com/Tipping-Point-Little-Things-Difference-ebook/dp/B000OT8GD0`,
    originDesc: `Amazon`,
    date: `2019-02-26T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `JavaScript for Kids: A Playful Introduction to Programming (Nick Morgan)`,
    origin: `https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming/dp/1593274084`,
    originDesc: `Amazon`,
    date: `2019-03-10T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `JavaScript: The Good Parts (Douglas Crockford)`,
    origin: `https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742`,
    originDesc: `Amazon`,
    date: `2019-03-22T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Reality Transurfing 1: The Space of Variations (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-1-Space-Variations/dp/1846941229`,
    originDesc: `Amazon`,
    date: `2019-04-22T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Kyiv JS Meetup`,
    desc: `❤️☘️`,
    origin: `http://kyivjs.org/`,
    originDesc: `kyivjs`,
    date: `2019-04-28T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Reality Transurfing 2: A Rustle of Morning Stars (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-Rustle-Morning-Stars/dp/1846941318`,
    originDesc: `Amazon`,
    date: `2019-05-01T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Zlit Tech: GtaphQL`,
    origin: `https://www.facebook.com/events/635302956897916/`,
    originDesc: `Zlit`,
    date: `2019-05-10T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Jedi techniques. How to raise your monkey, empty the inbox and save thought (Maxim Dorofeev)`,
    origin: `https://www.amazon.com/%D0%94%D0%B6%D0%B5%D0%B4%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5-%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B8-%D0%B2%D0%BE%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D1%82%D1%8C-%D0%BE%D0%BF%D1%83%D1%81%D1%82%D0%BE%D1%88%D0%B8%D1%82%D1%8C-%D0%BC%D1%8B%D1%81%D0%BB%D0%B5%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%BE-ebook/dp/B06XX85FXM/ref=sr_1_1?dchild=1&qid=1589177160&refinements=p_27%3A%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC+%D0%94%D0%BE%D1%80%D0%BE%D1%84%D0%B5%D0%B5%D0%B2&s=digital-text&sr=1-1&text=%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC+%D0%94%D0%BE%D1%80%D0%BE%D1%84%D0%B5%D0%B5%D0%B2`,
    originDesc: `Amazon`,
    date: `2019-05-29T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Gift from the Sea (Anne Morrow Lindbergh)`,
    origin: `https://www.amazon.com/Gift-50th-Anniversary-Anne-Morrow-Lindbergh/dp/0679732411`,
    originDesc: `Amazon`,
    date: `2019-06-05T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The 5 Love Languages: The Secret to Love that Lasts (Gary Chapman)`,
    origin: `https://www.amazon.com/Love-Languages-Secret-that-Lasts/dp/080241270X`,
    originDesc: `Amazon`,
    date: `2019-06-15T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Reality Transurfing 3: Forward to the Past (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-3-Forward-Past/dp/1846941326`,
    originDesc: `Amazon`,
    date: `2019-07-10T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Grokking Algorithms: An illustrated guide for programmers and other curious people (Aditya Bhargava)`,
    origin: `https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230`,
    originDesc: `Amazon`,
    date: `2019-07-18T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know Js: Up & Going (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491924462`,
    originDesc: `Amazon`,
    date: `2019-07-24T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `RN Talks #4 - Intro to Flutter & Declarative UI Development in Android`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/262091679/`,
    originDesc: `React Native Ukraine`,
    date: `2019-07-26T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know JS: Scope & Closures (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1449335586`,
    originDesc: `Amazon`,
    date: `2019-07-26T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Zlit`,
    origin: `https://www.facebook.com/events/2336186943281063/`,
    originDesc: `Zlit`,
    date: `2019-08-10T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Reality Transurfing 4: Ruling Reality (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-4-Ruling/dp/1846946611`,
    originDesc: `Amazon`,
    date: `2019-08-16T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `To Have or To Be? (Erich Fromm)`,
    origin: `https://www.amazon.com/Have-Be-Bloomsbury-Revelations/dp/178093680X`,
    originDesc: `Amazon`,
    date: `2019-08-26T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The Art of Loving (Erich Fromm)`,
    origin: `https://www.amazon.com/Art-Loving-Erich-Fromm/dp/0061129739`,
    originDesc: `Amazon`,
    date: `2019-09-03T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `Wix Talks #3. Front-end`,
    origin: `https://www.meetup.com/Wix_Kyiv/events/264307604/`,
    originDesc: `React Kyiv`,
    date: `2019-09-04T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The JavaScript language. Part 1 (Ilya Kantor)`,
    desc: `P.S. My love ❤️`,
    origin: `https://javascript.info/js`,
    originDesc: `learn.javascript`,
    date: `2019-09-16T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `React Kyiv September Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/264985817/`,
    originDesc: `React Kyiv`,
    date: `2019-10-26T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.WORKS,
    title: `Front-End developer (SGroup - Holding)`,
    desc: `Reduced the size of the average project bundle from 8 MB to <1.5 MB. Completely removed jquery, bootstrap, uikit and other libraries/frameworks on projects where it was necessary(refactoring everything to pure JS), and etc. See more in my CV.`,
    date: `2019-08-10T00:00:00+03:00`,
    endDate: `2019-09-30T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `React Native Ukraine #5`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/265208271/`,
    originDesc: `React Native Ukraine`,
    date: `2019-10-08T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know Js: this & Object Prototypes (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904151`,
    originDesc: `Amazon`,
    date: `2019-10-14T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know Js: Types & Grammar (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904194`,
    originDesc: `Amazon`,
    date: `2019-10-24T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know Js: Async & Performance (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904224`,
    originDesc: `Amazon`,
    date: `2019-10-28T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The JavaScript language. Part 2 - Browser: Document, Events, Interfaces (Ilya Kantor)`,
    origin: `https://javascript.info/ui`,
    originDesc: `learn.javascript`,
    date: `2019-11-02T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `You Don't Know JS: ES6 & Beyond (Kyle Simpson)`,
    origin: `https://www.amazon.com/gp/product/1491904240`,
    originDesc: `Amazon`,
    date: `2019-11-14T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The JavaScript language. Part 3 - Additional articles (Ilya Kantor)`,
    origin: `https://javascript.info/`,
    originDesc: `learn.javascript`,
    date: `2019-11-28T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `React Kyiv December Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/267224761/`,
    originDesc: `React Kyiv`,
    date: `2019-12-14T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.COURSES,
    title: `Ciklum University: JS Band Internship`,
    origin: `https://ciklum-digital.github.io/internship/#/`,
    originDesc: `JS Band Internship`,
    date: `2019-11-04T00:00:00+03:00`,
    endDate: `2019-12-29T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Tajna - The Secret (Rhonda Byrne)`,
    origin: `https://www.amazon.com/Tajna-Secret-Rhonda-Ronda-Bern/dp/B079YRG9TQ`,
    originDesc: `Amazon`,
    date: `2020-01-02T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Reality Transurfing 5: Apples Fall to the Sky (Vadim Zeland)`,
    origin: `https://www.amazon.com/Reality-Transurfing-Apples-Vadim-Zeland/dp/B00DIKWYJ4`,
    originDesc: `Amazon`,
    date: `2020-01-15T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.WORKS,
    title: `JavaScript Developer (Binary Studio)`,
    origin: `https://binary-studio.com/`,
    originDesc: `Binary Studio`,
    desc: `Just love ❤️`,
    date: `2020-01-22T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Think and Grow Rich (Napoleon Hill)`,
    origin: `https://www.amazon.com/Think-Grow-Rich-ebook/dp/B001NGN2D2`,
    originDesc: `Amazon`,
    date: `2020-01-29T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `React Native Ukraine #6`,
    origin: `https://www.meetup.com/React-Native-Ukraine/events/268108464/`,
    originDesc: `React Native Ukraine`,
    date: `2020-01-30T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Emotional Agility: Get Unstuck, Embrace Change, and Thrive in Work and Life (Susan David)`,
    origin: `https://www.amazon.com/Emotional-Agility-Unstuck-Embrace-Change/dp/1592409490`,
    originDesc: `Amazon`,
    date: `2020-02-04T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.MEETUPS,
    title: `React Kyiv February Meetup`,
    desc: `💜⚛️`,
    origin: `https://www.meetup.com/Kyiv-ReactJS-Meetup/events/268602187/`,
    originDesc: `React Kyiv`,
    date: `2020-02-13T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `React in Action (Mark Tielens Thomas)`,
    origin: `https://www.amazon.com/React-Action-Mark-Tielens-Thomas/dp/1617293857`,
    originDesc: `Amazon`,
    date: `2020-02-14T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.COURSES,
    title: `HTML and CSS. Professional website layout`,
    origin: `https://htmlacademy.ru/intensive/htmlcss`,
    originDesc: `Course link`,
    desc: `Work with the git version control system. Work with the graphic layout in the Figma editor. Create expressive and accessible markup. Build page layout on CSS grids, work with custom properties, optimize the code and prepare the completed project for publication. At each stage, the work is checked and commented by a personal mentor.`,
    link: `${BASE_COURSES_URL}/htmlacademy.html-css1.pdf`,
    linkDesc: `Certificate`,
    date: `2020-01-20T00:00:00+03:00`,
    endDate: `2020-03-22T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `The Life-Changing Magic of Tidying Up (Marie Kondo)`,
    origin: `https://www.amazon.com/Life-Changing-Magic-Tidying-Decluttering-Organizing/dp/1607747308`,
    originDesc: `Amazon`,
    date: `2020-02-24T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.COURSES,
    title: `HTML and CSS. Adaptive layout and automation`,
    origin: `https://htmlacademy.ru/intensive/adaptive`,
    originDesc: `Course link`,
    desc: `Create markup according to the BEM methodology. CSS-code on preprocessors. Make an adaptive grid, work with layout and retin graphics. Prepare project assembly automation for publication. At each stage, the work is checked and commented by a personal mentor.`,
    link: `${BASE_COURSES_URL}/htmlacademy.html-css2.pdf`,
    linkDesc: `Certificate`,
    date: `2020-03-23T00:00:00+03:00`,
    endDate: `2020-05-27T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `Games People Play: The Basic Handbook of Transactional Analysis (Eric Berne)`,
    origin: `https://www.amazon.com/Games-People-Play-Transactional-Analysis/dp/0345410033`,
    originDesc: `Amazon`,
    date: `2020-03-03T00:00:00+03:00`,
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: `HTML5 Pocket Reference: Quick, Comprehensive, Indispensable (Jennifer Robbins)`,
    origin: `https://www.amazon.com/HTML5-Pocket-Reference-Comprehensive-Indispensable/dp/1449363350`,
    originDesc: `Amazon`,
    date: `2020-04-18T00:00:00+03:00`,
  },
]

export { timelineData }
