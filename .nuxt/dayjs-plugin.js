import dayjs from 'dayjs'

import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

dayjs.locale('en')

export default (context, inject) => {
  context.$dayjs = dayjs
  inject('dayjs', dayjs)
}
