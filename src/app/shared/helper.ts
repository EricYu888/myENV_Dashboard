import { KeyVal } from './action-do';
export class Helper {
  public static generateCheckListTemplate(arrays, proMappingName) {
    let tmpArray = []
    for (let element of arrays) {
      let kv = new KeyVal();
      kv.key = element.id;
      // console.log(kv.key);
      // console.log(element[proMappingName]);
      let tmp = {};
      tmp['name'] = element[proMappingName];
      tmp['val'] = element;
      kv.val = tmp;
      tmpArray.push(kv);
    }
    return tmpArray;
  }
}
