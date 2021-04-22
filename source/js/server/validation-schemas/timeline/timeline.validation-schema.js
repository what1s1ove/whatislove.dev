import Joi from 'joi'
import { TimelineKey, SkillType, TimelineType } from '~/common/enums'
import { TimelineValidationMessage } from '../../common/enums'

const skillTypes = Object.values(SkillType)
const timelineTypes = Object.values(TimelineType)

const timelineSchema = Joi.object({
  [TimelineKey.SKILL_TYPE]: Joi.string()
    .valid(...skillTypes)
    .required()
    .messages({
      'string.base': TimelineValidationMessage.SKILL_TYPE_BASE,
      'any.required': TimelineValidationMessage.SKILL_TYPE_REQUIRE,
      'any.only': TimelineValidationMessage.SKILL_TYPE_VALID,
    }),
  [TimelineKey.TYPE]: Joi.string()
    .valid(...timelineTypes)
    .required()
    .messages({
      'string.base': TimelineValidationMessage.TYPE_BASE,
      'any.required': TimelineValidationMessage.TYPE_REQUIRE,
      'any.only': TimelineValidationMessage.TYPE_VALID,
    }),
  [TimelineKey.TITLE]: Joi.string().required().messages({
    'string.base': TimelineValidationMessage.TITLE_BASE,
    'any.required': TimelineValidationMessage.TITLE_REQUIRE,
  }),
  [TimelineKey.DESC]: Joi.string().allow(``).required().messages({
    'string.base': TimelineValidationMessage.DESC_BASE,
    'any.required': TimelineValidationMessage.DESC_REQUIRE,
  }),
  [TimelineKey.ORIGIN]: Joi.string()
    .allow(``)
    .required()
    .messages({
      'string.base': TimelineValidationMessage.ORIGIN_BASE,
      'any.required': TimelineValidationMessage.ORIGIN_REQUIRE,
      'string.uri': TimelineValidationMessage.ORIGIN_URL,
    })
    .when(TimelineKey.ORIGIN_DESC, {
      is: Joi.not(``),
      then: Joi.string().empty(``).uri().required(),
    }),
  [TimelineKey.ORIGIN_DESC]: Joi.string().allow(``).required().messages({
    'string.base': TimelineValidationMessage.ORIGIN_DESC_BASE,
    'any.required': TimelineValidationMessage.ORIGIN_DESC_REQUIRE,
  }),
  [TimelineKey.LINK]: Joi.string()
    .allow(``)
    .required()
    .messages({
      'string.base': TimelineValidationMessage.LINK_BASE,
      'any.required': TimelineValidationMessage.LINK_REQUIRE,
      'string.uri': TimelineValidationMessage.LINK_URL,
    })
    .when(TimelineKey.LINK_DESK, {
      is: Joi.not(``),
      then: Joi.string().empty(``).uri().required(),
    }),
  [TimelineKey.LINK_DESK]: Joi.string().allow(``).required().messages({
    'string.base': TimelineValidationMessage.LINK_DESC_BASE,
    'any.required': TimelineValidationMessage.LINK_DESC_REQUIRE,
  }),
  [TimelineKey.DATE]: Joi.string().isoDate().required().messages({
    'any.required': TimelineValidationMessage.DATE_REQUIRE,
  }),
  [TimelineKey.END_DATE]: Joi.string().allow(``).isoDate().required()
    .messages({
      'any.required': TimelineValidationMessage.END_DATE_REQUIRE,
    }),
})

export { timelineSchema }
