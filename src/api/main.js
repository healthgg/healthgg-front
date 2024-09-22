import { getRequest } from './instance'

// 메인페이지 데이터 조회
export const getMain = () => {
  return getRequest(`/main`)
}
