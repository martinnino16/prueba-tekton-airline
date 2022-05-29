import { ControlBase } from './control-base';

export class SelectControl extends ControlBase<string> {
  override controlType = 'select';
}
