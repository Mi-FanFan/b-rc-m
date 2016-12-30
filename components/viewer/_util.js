/**
 * Created by Freeman on 2016/12/29.
 */
export const formatPage = val =>{
  return val.toString().length<2?'0'+val:val;
}