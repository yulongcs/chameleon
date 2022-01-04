import {getUserAgentDevice} from 'src/helpers/device'
import {queryParamsByKey} from 'src/helpers/urlUtil'
import pageStore from 'src/stores/page'
import {EnumDevice} from 'src/types/type'

export const getCommonProps = () => {
  const mock = pageStore.edit ? true : queryParamsByKey('mock') ? true : false
  const device = pageStore.edit
    ? pageStore.device
    : pageStore.device === EnumDevice.other
    ? EnumDevice.other
    : getUserAgentDevice()
  return {
    env: pageStore.contentEnv,
    device,
    mock,
  }
}
