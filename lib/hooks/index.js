import Subject from './subject';
import Val from './val';

const subjectInstance = new Subject();
const valInstance = new Val();

export const subject = subjectInstance.hook;
export const val = valInstance.hook;
