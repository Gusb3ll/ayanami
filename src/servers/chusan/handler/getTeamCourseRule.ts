export default function getTeamCourseRule(req) {
  return {
    userId: req.userId,
    length: 0,
    nextIndex: 0,
    teamCourseRuleList: [],
  }
}
