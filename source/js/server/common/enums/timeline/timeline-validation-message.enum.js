import { SkillType, TimelineType } from '~/common/enums'

const skillTypes = Object.values(SkillType)
const timelineType = Object.values(TimelineType)

const TimelineValidationMessage = {
  SKILL_TYPE_BASE: `Skill type must be a string type`,
  SKILL_TYPE_REQUIRE: `Skill type is a required field`,
  SKILL_TYPE_VALID: `Skill type must be one of: ${skillTypes}`,
  TYPE_BASE: `Type must be a string type`,
  TYPE_REQUIRE: `Type is a required field`,
  TYPE_VALID: `Type must be one of: ${timelineType}`,
  TITLE_BASE: `Title must be a string type`,
  TITLE_REQUIRE: `Title is a required field`,
  DESC_BASE: `Desc must be a string type`,
  DESC_REQUIRE: `Desc is a required field`,
  ORIGIN_BASE: `Origin must be a string type`,
  ORIGIN_REQUIRE: `Origin is a required field`,
  ORIGIN_URL: `Origin must be a valid url`,
  ORIGIN_DESC_BASE: `Origin desc must be a string type`,
  ORIGIN_DESC_REQUIRE: `Origin desc is a required field`,
  LINK_BASE: `Link must be a string type`,
  LINK_REQUIRE: `Link is a required field`,
  LINK_URL: `Link must be a valid url`,
  LINK_DESC_BASE: `Link desc must be a string type`,
  LINK_DESC_REQUIRE: `Link desc is a required field`,
  DATE_REQUIRE: `Date is a required field`,
  END_DATE_REQUIRE: `End Date is a require field`,
}

export { TimelineValidationMessage }
