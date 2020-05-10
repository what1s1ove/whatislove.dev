import { TimelimeSkillTypes, TimelimeTypes } from '../common/map/index'

const BASE_COURSES_URL = `files/courses`

const timelineData = [
  {
    skillType: TimelimeSkillTypes.SOFT_SKILLS,
    type: TimelimeTypes.BOOKS,
    title: 'The Miracle Morning (Hal Elrod)',
    origin:
      'https://www.amazon.com/Miracle-Morning-Not-So-Obvious-Guaranteed-Transform/dp/0979019710',
    originDesc: 'Amazon',
    desc:
      'The Miracle Morning: The Not-So-Obvious Secret Guaranteed to Transform Your Life - Before 8AM.',
    date: '2019-02-10T00:00:00+0300',
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.WORKS,
    title: 'Web coder (KIES - SEO company)',
    desc:
      'Rewrote the entire front-end part of the project. Bootstrap and jquery were completely removed from the project. Rewrote everything into pure HTML, CSS, JS. Made indicators Lighthouse 100% in 4 sections, and etc. See more in my CV.',
    date: '2019-02-10T00:00:00+0300',
    endDate: '2019-07-31T00:00:00+0300',
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.COURSES,
    title: 'HTML and CSS. Professional website layout',
    origin: 'https://htmlacademy.ru/intensive/htmlcss',
    originDesc: 'Course link',
    desc:
      'Work with the git version control system. Work with the graphic layout in the Figma editor. Create expressive and accessible markup. Build page layout on CSS grids, work with custom properties, optimize the code and prepare the completed project for publication. At each stage, the work is checked and commented by a personal mentor.',
    link: `${BASE_COURSES_URL}/htmlacademy.html-css1.pdf`,
    linkDesc: `Certificate`,
    date: '2020-01-20T00:00:00+0300',
    endDate: '2020-03-22T00:00:00+0300',
  },
  {
    skillType: TimelimeSkillTypes.HARD_SKILLS,
    type: TimelimeTypes.COURSES,
    title: 'HTML and CSS. Adaptive layout and automation',
    origin: 'https://htmlacademy.ru/intensive/adaptive',
    originDesc: 'Course link',
    desc:
      'Create markup according to the BEM methodology. CSS-code on preprocessors. Make an adaptive grid, work with layout and retin graphics. Prepare project assembly automation for publication. At each stage, the work is checked and commented by a personal mentor.',
    link: `${BASE_COURSES_URL}/htmlacademy.html-css2.pdf`,
    linkDesc: `Certificate`,
    date: '2020-03-23T00:00:00+0300',
    endDate: '2020-05-27T00:00:00+0300',
  },
]

export { timelineData }
