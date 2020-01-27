import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <div className='btn-burger btn-draggable'>&#9776;</div>
));

export default DragHandle;
