import { PRIORITY } from './PRIORITY';
import { TYPE } from './TYPE';
import { STATUS } from './STATUS';

export class Bug{
  id:string;
  priority:PRIORITY;
  type:TYPE;
  status:STATUS;
  buildVersion:string;
  projectId:string;
  submitOnDate='';
  module:string;
  description='';
  title='';
  product:string;
  etaDate='';
}
