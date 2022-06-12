export default function getTeamCourseSetting(req) {
  return {
    userId: req.userId,
    length: 0,
    nextIndex: 0,
    teamCourseSettingList: [],
  }
}
