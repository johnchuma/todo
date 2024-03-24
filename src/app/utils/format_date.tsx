import moment from "moment"

export const formatDate = (date:any)=>{
  return  moment(date).format("DD, MMM YYYY")
}