import {GlobalConstants} from "../common/constants/global-constants";

export function getImageCompletePath(path: string | null, imageSize: string): string{
  return GlobalConstants.TMDB_IMAGE_BASE_URL + getImageSize(imageSize) + path;
}

function getImageSize(imageSize: string){
  if (imageSize.includes("original")){
    return "/original/"
  }else{
    return "/w" + imageSize + "/"
  }
}
